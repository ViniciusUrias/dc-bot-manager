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
			const { serverId, command, name } = request.body;
			const { id } = request.user;
			// await initiateConnection({ serverId, userId: id });
			try {
				const response = await commandManager.registerCommand({ botId, command, name });
				// const response = await createCommandByBotId({ command, serverId, botId, userId: id, name });

				if (response) {
					const exists = await app.prisma.command.findFirst({ where: { name } });
					if (exists?.id) {
						return reply.status(409).send({ message: "A command with this name already exists!" });
					}
					await app.prisma.command.create({
						data: {
							name,
							enabled: true,
							description: "",
							response: "",
							botId,
						},
					});
				}
				return { message: "Command created successfully", response };
			} catch (error) {
				console.log(error);
				return { message: "Command error", error };
			}
			// Implement command creation logic
		}
	);

	app.put(
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
			const { serverId } = request.body;

			const { id } = request.user;
			// await initiateConnection({ serverId, userId: id });
			try {
				const response = await commandManager.deleteCommands({ serverId, botId, userId: id });

				if (response) {
					await app.prisma.command.updateMany({ where: { botId }, data: { enabled: false } });
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
