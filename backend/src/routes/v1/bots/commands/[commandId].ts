import { createRouteConfig2 } from "@/utils/route-config";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance, { defaultRouteConfig }) {
	// GET /bots/:botId/commands/:commandId - Get command details
	app.get(
		"/:commandId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get command details",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandId: { type: "string" },
				},
				required: ["botId", "commandId"],
			},
		}),
		async (request, reply) => {
			const { botId, commandId } = request.params as { botId: string; commandId: string };
			// Implement logic to get command details
			return { command: { id: commandId } };
		}
	);

	// PUT /bots/:botId/commands/:commandId - Update command
	app.put(
		"/:commandId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Update command ",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandId: { type: "string" },
				},
				required: ["botId", "commandId"],
			},
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					description: { type: "string" },
					enabled: { type: "boolean" },
				},
				required: ["name", "description", "enabled"],
			},
		}),
		async (request, reply) => {
			const { botId, commandId } = request.params as { botId: string; commandId: string };
			// Implement update logic
			return { message: "Command updated successfully" };
		}
	);

	// DELETE /bots/:botId/commands/:commandId - Delete command
	app.delete(
		"/:commandId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Delete command",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandId: { type: "string" },
				},
				required: ["botId", "commandId"],
			},
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					description: { type: "string" },
					enabled: { type: "boolean" },
				},
				required: ["name", "description", "enabled"],
			},
		}),
		async (request, reply) => {
			const { botId, commandId } = request.params as { botId: string; commandId: string };
			// Implement delete logic
			return { message: "Command deleted successfully" };
		}
	);

	// POST /bots/:botId/commands/:commandId/toggle - Toggle command
	app.post(
		"/:commandId/toggle",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Toggle command ",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandId: { type: "string" },
				},
				required: ["botId", "commandId"],
			},
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					description: { type: "string" },
					enabled: { type: "boolean" },
				},
				required: ["name", "description", "enabled"],
			},
		}),
		async (request, reply) => {
			const { botId, commandId } = request.params as { botId: string; commandId: string };
			// Implement toggle logic
			return { message: "Command toggled successfully" };
		}
	);
}
