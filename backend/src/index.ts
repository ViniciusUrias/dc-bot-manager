// Importing required modules
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import Fastify from "fastify";
import prisma from "./prisma/prisma";
import router from "./routes/index";
import { schemas, securitySchemes } from "./schemas";

dotenv.config(); // Load environment variables from .env file

const fastify = Fastify({
	logger: true,
});
fastify.addSchema(schemas.User);
fastify.addSchema(schemas.Bot);
fastify.addSchema(schemas.Error);
fastify.register(fastifySwagger, {
	openapi: {
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
			...securitySchemes,
		},
		refResolver: {
			buildLocalReference(json, baseUri, fragment, i) {
				return json.$id || `def-${i}`;
			},
		},
	},
	hideUntagged: true,
});
fastify.register(fastifySwaggerUi, {
	routePrefix: "/docs",
	uiConfig: {
		docExpansion: "list",
		deepLinking: false,
	},
});
const port = process.env.PORT || 3000;
fastify.register(router, { prefix: "/v1", logLevel: "info" });
fastify.register(cors);
// app.use(router);
fastify.get("/teste", async (request, reply) => {});
fastify.listen({ port }, function (err, address) {
	console.log("Server listening on port 3000");
	console.log(`Documentation available at http://localhost:3000/docs`);
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});

// Graceful shutdown
process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit(0);
});
