import { FastifyInstance, FastifyPluginOptions } from "fastify";
import commandIdRoutes from "./[commandId]";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	// GET /bots/:botId/commands - List all commands
	app.get("/", async (request, reply) => {
		const { botId } = request.params as { botId: string };
		// Implement logic to list commands
		return { commands: [] };
	});

	// POST /bots/:botId/commands - Create new command
	app.post("/", async (request, reply) => {
		const { botId } = request.params as { botId: string };
		// Implement command creation logic
		return { message: "Command created successfully" };
	});

	// Register nested routes
	app.register(commandIdRoutes);
}
