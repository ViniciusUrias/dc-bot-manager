// Importing required modules

import router from "@/routes";
import { schemas } from "@/schemas";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import Fastify, { FastifyInstance } from "fastify";
import pino from "pino";
import authPlugin from "./plugins/auth";

import prisma from "../prisma/prisma";
import { configureFastify } from "./lib/fastify";

dotenv.config();
let fastify: FastifyInstance | null = null;

const main = async () => {
	const logger = pino({ transport: { target: "pino-pretty" } });

	fastify = Fastify({
		loggerInstance: logger,
		bodyLimit: 1000000000,
	});
	fastify.decorate("prisma", prisma);

	fastify.addSchema(schemas.User);
	fastify.addSchema(schemas.Bot);
	fastify.addSchema(schemas.Error);

	await configureFastify(fastify);
	fastify.register(authPlugin);
	fastify.addHook("onClose", async (instance) => {
		await instance.prisma.$disconnect();
	});
	fastify.addHook("preHandler", function (req, reply, done) {
		if (req.body) {
			req.log.info({ body: req.body }, "parsed body");
		}
		done();
	});
	await fastify.register(fastifySwagger, {
		openapi: {
			openapi: "3.0.0",

			info: {
				title: "Discord Bot Builder API",
				description: "API for building and managing Discord bots",
				version: "1.0.0",
			},
			servers: [
				{
					url: "http://localhost:3000",
					description: "Development server",
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
						description: "Enter JWT token in format: Bearer <token>",
					},
				},
			},

			refResolver: {
				buildLocalReference(json, baseUri, fragment, i) {
					return json.$id || `def-${i}`;
				},
			},
		},
		hideUntagged: false,
	});
	await fastify.register(fastifySwaggerUi, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "list",
			deepLinking: false,
		},
		uiHooks: {
			onRequest: (request, reply, next) => next(),
			preHandler: (request, reply, next) => next(),
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
	});
	fastify.register(router, {
		prefix: "/v1",
	});
	fastify.register(cors, {
		origin: ["http://localhost:5174", "http://localhost:5173", "https://dc-bot-manager.vercel.app/"],
		credentials: true,
		methods: ["GET", "PUT", "POST", "DELETE"],
	});
	fastify.get("/test", (req, res) => {
		res.send("connected");
	});
	fastify.setErrorHandler((error, request, reply) => {
		fastify.log.error(error);
		reply.status(500).send({ error: "Internal Server Error" });
	});
	fastify.get("/health", async () => {
		try {
			await prisma.$queryRaw`SELECT 1`;
			return { status: "ok", db: "connected" };
		} catch (err) {
			throw new Error("Database not connected");
		}
	});
	await fastify.ready();
	fastify.swagger();
	const port = process.env.PORT || 3000;
	// or 0.0.0.0 for running in docker
	const host = process.env.NODE_ENV === "production" ? process.env.BASE_URL : "localhost";

	fastify.listen({ port, host }, function (err, address) {
		console.log("Server listening on port 3000");
		console.log(`Test at http://localhost:3000/test`);
		console.log(`Documentation available at http://localhost:3000/docs`);

		console.log(`Server listening on ${address}`);
		console.log(`Test endpoint: ${address}/test`);
		console.log(`Docs: ${address}/docs`);
		console.log(`Health check: ${address}/health`);
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});
};

main();

// Graceful shutdown
process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit(0);
});

export { fastify };
