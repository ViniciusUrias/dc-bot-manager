// Importing required modules
import router from "@/routes";
import { schemas } from "@/schemas";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import Fastify from "fastify";
import pino from "pino";
import authPlugin from "./plugins/auth";
import prisma from "./prisma/prisma";
dotenv.config(); // Load environment variables from .env file

const main = async () => {
	const logger = pino({ transport: { target: "pino-pretty" } });

	const fastify = Fastify({
		loggerInstance: logger,
	});
	fastify.addSchema(schemas.User);

	fastify.addSchema(schemas.Bot);
	fastify.addSchema(schemas.Error);
	fastify.decorate("prisma", prisma);
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
				schemas: {
					User: schemas.User,
					Bot: schemas.Bot,
					Error: schemas.Error,
				},
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
	const port = process.env.PORT || 3000;
	fastify.register(router, {
		prefix: "/v1",
	});
	fastify.register(cors);
	// app.use(router);
	fastify.get("/teste", async (request, reply) => {});
	await fastify.ready();
	fastify.swagger();
	fastify.listen({ port }, function (err, address) {
		console.log("Server listening on port 3000");
		console.log(`Documentation available at http://localhost:3000/docs`);
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
