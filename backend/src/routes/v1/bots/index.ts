import { FastifyInstance, FastifyPluginOptions } from "fastify";
import botIdRoutes from "./[botId]";
import commandsRoutes from "./commands";
// import eventsRoutes from './events';

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	// GET /bots - List all bots
	app.get("/", async (request, reply) => {
		// Implement logic to list bots
		return { bots: [] };
	});

	// POST /bots - Create new bot
	app.post("/", async (request, reply) => {
		// Implement bot creation logic
		return { message: "Bot created successfully" };
	});

	// Register nested routes
	app.register(botIdRoutes);
	app.register(commandsRoutes, { prefix: "/:botId/commands" });
	//   app.register(eventsRoutes, { prefix: '/:botId/events' });
}
