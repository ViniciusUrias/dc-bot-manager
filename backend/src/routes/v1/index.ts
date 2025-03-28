import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRoutes from "./auth";
import botRoutes from "./bots";
import ServerRouter from "./servers";
import UserRouter from "./users";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	app.register(authRoutes);
	app.register(UserRouter, { prefix: "/users" });
	app.register(ServerRouter, { prefix: "/servers" });
	app.register(botRoutes, { prefix: "/bots" });
	// app.register(configRoutes);
	// app.register(analyticsRoutes);
}
