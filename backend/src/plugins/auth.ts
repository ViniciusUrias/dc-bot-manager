// src/plugins/auth.ts
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { verifyToken } from "../utils/auth";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: string;
		};
	}
}

const authPlugin: FastifyPluginAsync = async (app) => {
	app.decorateRequest("user", null);

	app.addHook("onRequest", async (request, reply) => {
		const authHeader = request.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			// No token provided, but we don't throw error here
			// Some routes might be public
			return;
		}

		const token = authHeader.substring(7); // Remove 'Bearer ' prefix

		try {
			const { userId } = verifyToken(token);
			request.user = { id: userId };
		} catch (error) {
			reply.code(401).send({
				statusCode: 401,
				error: "Unauthorized",
				message: "Invalid or expired token",
			});
		}
	});
};

export default fp(authPlugin);
