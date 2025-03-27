import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRoutes from "./auth";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	app.register(authRoutes);
	// app.register(botRoutes);
	// app.register(configRoutes);
	// app.register(analyticsRoutes);
}
