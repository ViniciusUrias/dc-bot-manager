import * as botManager from "@/discord/botManager";
import * as commandManager from "@/discord/commandManager";
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
			const { command, name } = request.body;
			const { id } = request.user;
			const botInfo = await app.prisma.bot.findFirst({
				where: { id: botId },
				select: { token: true, server: { select: { serverid: true } } },
			});
			const client = await botManager.startBot(
				{
					clientId: botId,
					id: botId,
					name,
					serverId: botInfo.server.serverid,
					token: botInfo.token,
					userId: id,
				},
				{ presence: { status: "invisible" } }
			);
			try {
				const response = await commandManager.registerCommand({ botId, command, name, botInfo, userId: id });

				if (response) {
					const exists = await app.prisma.command.findFirst({ where: { name } });
					if (exists?.id) {
						return reply.status(409).send({ message: "A command with this name already exists!" });
					}
					await app.prisma.command.create({
						data: {
							name,
							enabled: true,
							description: response.description,
							response: "",
							botId,
						},
					});
				}
				await client.destroy();
				return { message: "Command created successfully", response };
			} catch (error) {
				console.log(error);
				await client.destroy();

				return { message: "Command error", error: error.message };
			}
			// Implement command creation logic
		}
	);

	app.delete(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Delete commands command",
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
			const bot = await app.prisma.bot.findFirst({ where: { id: botId }, select: { server: true, token: true } });
			const { id } = request.user;
			// await initiateConnection({ serverId, userId: id });
			try {
				const response = await commandManager.deleteCommands({
					serverId: bot.server.serverid,
					botId,
					userId: id,
					botToken: bot.token,
				});

				if (response) {
					await app.prisma.command.deleteMany({ where: { botId } });
				}
				return { message: "Commands disabled", response };
			} catch (error) {
				console.log(error);
				return { message: "Command error", error };
			}
			// Implement command creation logic
		}
	);

	// Register nested routes
	app.register(commandIdRoutes, { defaultRouteConfig });
}
