// Importing required modules
import dotenv from "dotenv";
import prisma from "./prisma/prisma";
import router from "./routes/index";

import cors from "@fastify/cors";
import Fastify from "fastify";
dotenv.config(); // Load environment variables from .env file

const fastify = Fastify({
	logger: true,
});
const port = process.env.PORT || 3000;
fastify.register(router, { prefix: "/v1", logLevel: "info" });
fastify.register(cors);
// app.use(router);
fastify.get("/teste", async (request, reply) => {});
fastify.listen({ port }, function (err, address) {
	console.log("fastifty lustening at 3001");
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
