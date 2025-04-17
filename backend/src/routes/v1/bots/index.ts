import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import botIdRoutes from "./[botId]";
import commandsRoutes from "./commands";
import { Bot } from "@/types";
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
				// body: BotSchema,
			},
		}),
		async (request, reply) => {
			app.log.info(request.user);
			// Implement bot creation logic
			const { serverId, name, prefix, botId, token, description } = request.body as Bot;
			const body = {
				serverId,
				name,
				prefix,
				token,
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
