import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: string;
		};
	}
}

const authPlugin: FastifyPluginAsync = async (app) => {
	// Decorate Fastify with authenticate function
	app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
		const authHeader = request.headers.authorization;
		console.log(request.headers);
		if (!authHeader) {
			return reply.code(401).send({
				statusCode: 401,
				error: "Unauthorized",
				message: "No authorization header provided",
			});
		}

		if (!authHeader.startsWith("Bearer ")) {
			return reply.code(401).send({
				statusCode: 401,
				error: "Unauthorized",
				message: 'Authorization header must start with "Bearer "',
			});
		}

		const token = authHeader.substring(7); // Remove 'Bearer ' prefix

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
			request.user = { id: decoded.userId };
		} catch (error) {
			return reply.code(401).send({
				statusCode: 401,
				error: "Unauthorized",
				message: "Invalid or expired token",
			});
		}
	});

	// Add hook to automatically protect routes with security schema
	app.addHook("onRoute", (routeOptions) => {
		if (routeOptions.schema?.security) {
			const currentPreHandler = routeOptions.preHandler || [];
			const newPreHandler = Array.isArray(currentPreHandler)
				? [...currentPreHandler, app.authenticate]
				: [currentPreHandler, app.authenticate];

			routeOptions.preHandler = newPreHandler;
		}
	});
};

export default fp(authPlugin, {
	name: "authenticate-plugin",
});
