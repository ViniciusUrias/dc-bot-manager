import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { fromNodeHeaders } from "better-auth/node";
import { type Session } from "better-auth";
declare module "fastify" {
	interface FastifyInstance {
		prisma: import("@prisma/client").PrismaClient;
	}
	interface FastifyRequest {
		user: Partial<Session>;
	}
}

const authPlugin: FastifyPluginAsync = async (app) => {
	app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
		const session = await app.auth.api.getSession({ headers: fromNodeHeaders(request.headers) });
		app.log.info("HEADERS", request.headers);
		app.log.info("SESSION", session);
		if (!session) {
			return reply.status(401).send({ message: "Unauthorized" });
		}
		request.user = session.user;
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
