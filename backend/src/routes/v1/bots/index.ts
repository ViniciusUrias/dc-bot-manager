import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import botIdRoutes from "./[botId]";
import commandsRoutes from "./commands";
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
		}),
		async (request, reply) => {
			// Implement logic to list bots
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
					owner: { omit: { password: true, createdAt: true, updatedAt: true } },
					server: { select: { name: true, id: true } },
				},
			});
			return { bots };
		}
	);

	// POST /bots - Create new bot
	app.post(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Create bot",

			body: {
				type: "object",
				required: ["serverId", "name", "prefix"],
				properties: {
					name: { type: "string" },
					serverId: { type: "string" },
					prefix: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			// Implement bot creation logic
			const { serverId, name, prefix } = request.body;
			const bot = await app.prisma.bot.create({
				data: { ...request.body, ownerId: request.user.id },
				select: { id: true, name: true, prefix: true, ownerId: true, serverId: true, createdAt: true },
			});

			return { message: "Bot created successfully" };
		}
	);

	// Register nested routes
	app.register(botIdRoutes, { defaultRouteConfig });
	app.register(commandsRoutes, { prefix: "/:botId/commands", defaultRouteConfig });
	//   app.register(eventsRoutes, { prefix: '/:botId/events' });
}
