import { createRouteConfig } from "@/utils/route-config";
import { FastifyInstance } from "fastify";
import serverIdRoutes from "./[id]";

export default async function (app: FastifyInstance) {
	// Register nested routes
	app.post(
		"/",
		createRouteConfig({
			tags: ["Servers"],
			summary: "Create server",
			security: [{ bearerAuth: [] }], // Requires authentication

			body: {
				type: "object",
				required: ["name"],
				properties: {
					name: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { name } = request.body as {
				name: string;
			};
			const { id } = request.user;
			const exists = await app.prisma.server.findUnique({
				where: { name },
			});

			if (exists) {
				return reply.code(409).send({
					statusCode: 409,
					error: "Conflict",
					message: "Server with this name already exists",
				});
			}

			const server = await app.prisma.server.create({
				data: {
					ownerId: id,

					name,
				},
				select: {
					id: true,
					name: true,
					owner: true,
					createdAt: true,
				},
			});
		}
	);

	app.register(serverIdRoutes);
	// app.register(profileRoutes, { prefix: "/me" });
	// app.register(sessionsRoutes, { prefix: "/sessions" });
}
