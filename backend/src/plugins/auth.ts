import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

declare module "fastify" {
	interface FastifyRequest {
		user: {
			userId: string;
		};
	}
}

const authPlugin: FastifyPluginAsync = async (app) => {
	app.decorate("authenticate", async (request: any, reply: any) => {
		try {
			const token = request.cookies.authToken || request.headers.authorization?.split(" ")[1];
			console.log("AUTHENTICATE BEARER", request.headers.authorization);
			console.log("AUTHENTICATE COOKIE", request.cookies.authToken);
			if (!token) {
				throw new Error("No token provided");
			}

			const decoded = app.jwt.verify(token);
			request.user = decoded;
		} catch (err) {
			reply.status(401).send({ message: "Unauthorized", err: err.message });
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
