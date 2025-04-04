import * as commands from "@/discord/commandManager";
import { createRouteConfig2 } from "@/utils/route-config";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance, { defaultRouteConfig }) {
	// GET /bots/:botId/commands/:commandId - Get command details
	app.get(
		"/:commandName",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get command details",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandName: { type: "string" },
				},
				required: ["botId", "commandName"],
			},
		}),
		async (request, reply) => {
			const { botId, commandName } = request.params as { botId: string; commandName: string };
			// Implement logic to get command details
			const bot = await app.prisma.bot.findFirst({ where: { id: botId }, select: { server: true } });
			const file = await commands.getCommand({
				botId,
				commandName,
				serverId: bot.server.serverid,
				userId: request.user.id,
			});
			return { command: file };
		}
	);
	app.put(
		"/:commandName",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Update command details",
			params: {
				type: "object",
				properties: {
					botId: { type: "string" },
					commandName: { type: "string" },
				},
				required: ["botId", "commandName"],
			},
		}),
		async (request, reply) => {
			const { botId, commandName } = request.params as { botId: string; commandName: string };
			// Implement logic to get command details
			const bot = await app.prisma.bot.findFirst({ where: { id: botId }, select: { server: true, token: true } });
			const file = await commands.updateCommand({
				botToken: bot.token,
				botId,
				oldName: commandName,
				command: request.body.command,
				name: request.body.name,
				serverId: bot.server.serverid,
				userId: request.user.id,
			});
			if (file) {
				await app.prisma.command.update({
					where: { id: request.body.commandId },
					data: { name: request.body.name },
				});
			}
			return { command: file };
		}
	);

	// PUT /bots/:botId/commands/:commandId - Update command

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
