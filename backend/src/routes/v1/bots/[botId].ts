import { createRouteConfig } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	// GET /bots/:id - Get bot details
	app.get(
		"/:botId",
		createRouteConfig({
			tags: ["Bots"],
			summary: "Get by id",
			auth: true, // Requires authentication
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
				include: { configurations: true, commands: true, events: true },
			});
			return { bot };
		}
	);

	// PUT /bots/:id - Update bot
	app.put("/:botId", async (request, reply) => {
		const { botId } = request.params as { botId: string };
		// Implement update logic
		return { message: "Bot updated successfully" };
	});

	// DELETE /bots/:id - Delete bot
	app.delete("/:botId", async (request, reply) => {
		const { botId } = request.params as { botId: string };
		// Implement delete logic
		return { message: "Bot deleted successfully" };
	});

	// POST /bots/:id/activate - Activate bot
	app.post(
		"/:botId/activate",
		createRouteConfig({
			tags: ["Bots"],
			summary: "Activate bot",
			auth: true, // Requires authentication
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };

			await app.prisma.bot.update({
				data: { active: true },
				where: { id: botId },
			});
			// Implement activation logic
			return { message: "Bot activated successfully" };
		}
	);

	// POST /bots/:id/deactivate - Deactivate bot
	app.post(
		"/:botId/deactivate",
		createRouteConfig({
			tags: ["Bots"],
			summary: "Deactivate bot",
			auth: true, // Requires authentication
		}),
		async (request, reply) => {
			const { botId } = request.params as { botId: string };

			await app.prisma.bot.update({
				data: { active: false },
				where: { id: botId },
			});
			return { message: "Bot deactivated successfully" };
		}
	);
}
