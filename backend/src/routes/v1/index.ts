import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UserRouter from "./users";
import ServerRouter from "./servers";
import BotRouter from "./bots";
export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	// app.register(authRoutes);
	app.register(UserRouter, { prefix: "/users" });
	app.register(ServerRouter, { prefix: "/servers" });
	app.register(BotRouter, { prefix: "/bots" });
	// app.register(configRoutes);
	// app.register(analyticsRoutes);
}
