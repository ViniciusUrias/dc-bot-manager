import * as botManager from "@/discord/botManager";
import { createRouteConfig2 } from "@/utils/route-config";
import { type Bot } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance, { defaultRouteConfig }) {
	// GET /bots/:id - Get bot details
	app.post(
		"/start",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Initiate bot",
			body: {
				type: "object",
				required: ["botId"],
				properties: {
					serverid: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.body;
			const { id } = request.user;
			const bot = await app.prisma.bot.findFirst({ where: { id: botId } });
			const server = await app.prisma.server.findFirst({ where: { id: bot.serverId } });
			const client = await botManager.startBot({
				clientId: botId,
				id: botId,
				name: bot.name,
				serverId: server.serverid,
				token: bot.token,
				userId: id,
			});
			await app.prisma.bot.update({ where: { id: botId }, data: { active: true } });
			return reply.code(200).send({ message: "Bot initiated successfully", activeBots: botManager.getActiveBots() });
		}
	);
	app.post(
		"/stop",
		createRouteConfig2(defaultRouteConfig, {
			summary: "stop bot",
			body: {
				type: "object",
				required: ["botId"],
				properties: {
					serverid: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { name, serverId, botId } = request.body;
			const { id } = request.user;

			// const { client, rest } = await initiateBotConnection({ serverId, userId: id, botInfo: bot });
			const client = await botManager.stopBot(botId);
			await app.prisma.bot.update({ where: { id: botId }, data: { active: false } });

			return reply.code(200).send({ message: "Bot stopped successfully", activeBots: botManager.getActiveBots() });
		}
	);

	app.get(
		"/:botId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get by id",

			params: {
				type: "object",
				properties: {
					botId: {
						type: "string",
						description: "bot id",
					},
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			// Implement logic to get bot details
			const bot = await app.prisma.bot.findUnique({
				where: { id: botId },
				include: { configurations: true, commands: true, events: true, server: true },
			});
			return bot;
		}
	);

	// PUT /bots/:id - Update bot
	app.put(
		"/:botId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Update bot",
			params: {
				type: "object",
				properties: {
					botId: {
						type: "string",
					},
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			const userId = request.user.id;
			const bot = await app.prisma.bot.findFirst({
				where: { id: botId, ownerId: userId },
				select: { token: true },
			});
			const { icon, name, description } = request.body;
			try {
				const res = await botManager.updateBotInfo(request.body, bot.token);
				if (res) {
					await app.prisma.bot.update({
						where: { id: botId, ownerId: userId },
						data: {
							icon,
							name,
							description,
						},
					});
				}
				return res;
			} catch (error) {
				reply.send({ message: error?.message });
			}
			// Implement update logic
		}
	);
	app.put(
		"/:botId/sync",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Sync bot info with discord api",
			params: {
				type: "object",
				properties: {
					botId: {
						type: "string",
					},
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			const userId = request.user.id;
			const bot = await app.prisma.bot.findFirst({
				where: { id: botId, ownerId: userId },
				select: { token: true },
			});

			try {
				const { description, name, tags, id } = await botManager.getBotData(bot.token);
				const body: Partial<Bot> = {
					description,
					name,
					tags,
				};
				if (id) {
					await app.prisma.bot.update({
						where: { id: botId, ownerId: userId },
						data: body,
					});
				}
				return reply.send({ message: "Bot sync with success", body });
			} catch (error) {
				reply.send({ message: error?.message });
			}
			// Implement update logic
		}
	);

	// DELETE /bots/:id - Delete bot
	app.delete(
		"/:botId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Delete bot",
			params: {
				type: "object",
				properties: {
					botId: {
						type: "string",
					},
				},
			},
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };
			await app.prisma.bot.delete({ where: { id: botId } });
			// Implement delete logic
			return { message: "Bot deleted successfully" };
		}
	);
}
