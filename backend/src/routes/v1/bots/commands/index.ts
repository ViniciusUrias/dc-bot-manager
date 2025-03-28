import { createRouteConfig2 } from "@/utils/route-config";
import { FastifyInstance } from "fastify";
import commandIdRoutes from "./[commandId]";

export default async function (app: FastifyInstance, { defaultRouteConfig }) {
	// GET /bots/:botId/commands - List all commands
	app.get(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get commands by bot id",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
				},
				required: ["botId"],
			},
			querystring: {
				type: "object",
				properties: {
					serverId: { type: "string" },
					name: { type: "string" },
					prefix: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			// Implement logic to list commands
			return { commands: [] };
		}
	);

	// POST /bots/:botId/commands - Create new command
	app.post(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Create new command",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
				},
				required: ["botId"],
			},
			querystring: {
				type: "object",
				properties: {
					serverId: { type: "string" },
					name: { type: "string" },
					prefix: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			// Implement command creation logic
			return { message: "Command created successfully" };
		}
	);

	// Register nested routes
	app.register(commandIdRoutes, { defaultRouteConfig });
}
