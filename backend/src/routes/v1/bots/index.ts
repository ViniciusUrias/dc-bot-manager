import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import botIdRoutes from "./[botId]";
import commandsRoutes from "./commands";
import { Bot, BotPartialSchema, BotPartialWithRelationsSchema } from "@/types";
import { z } from "zod";
// import eventsRoutes from './events';

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	// GET /bots - List all bots

	const { defaultRouteConfig } = createRoutePlugin({
		..._opts,
		defaultRouteConfig: {
			tags: ["Bots"],
			summary: "Bots routes",
			auth: true,
		},
	});
	app.get(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get all bot",
			schema: {
				tags: ["Bots"],
				response: { 200: z.array(BotPartialWithRelationsSchema) },
			},
		}),
		async (request, reply) => {
			const bots = await app.prisma.bot.findMany({
				select: {
					token: true,
					configurations: true,
					events: true,
					name: true,
					id: true,
					active: true,
					icon: true,
					commands: true,
					prefix: true,
					createdAt: true,
					updatedAt: true,
					owner: { omit: { createdAt: true, updatedAt: true } },
					server: { select: { name: true, id: true } },
				},
			});
			return reply.status(200).send(bots);
		}
	);

	// POST /bots - Create new bot
	app.post(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Create bot",
			schema: {
				tags: ["Bots"],
				body: BotPartialSchema,
			},
		}),
		async (request, reply) => {
			app.log.info(request.body);
			// Implement bot creation logic
			const { serverId, name, prefix, botId, token, description, icon } = request.body as Bot;
			const body = {
				serverId,
				name,
				prefix,
				token,
				icon,
				ownerId: request.user.id,
				description,
			};

			try {
				const bot = await app.prisma.bot.create({
					// data: { name, token, serverId: serverId, description, ownerId: request.user.id },
					data: body,
					select: { name: true },
				});

				return reply.status(201).send({ message: "Bot created successfully", bot });
			} catch (error) {
				reply.send(error);
			}
		}
	);

	// Register nested routes
	app.register(botIdRoutes, { defaultRouteConfig });
	app.register(commandsRoutes, { prefix: "/:botId/commands", defaultRouteConfig });
	//   app.register(eventsRoutes, { prefix: '/:botId/events' });
}
