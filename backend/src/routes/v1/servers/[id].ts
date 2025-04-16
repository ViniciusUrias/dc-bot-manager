import { ServerSchema } from "@/generated";
import { createRouteConfig2 } from "@/utils/route-config";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export default async function (app: FastifyInstance, opts) {
	app.get(
		"/:serverId",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Get server by id",
			schema: {
				tags: ["Servers"],
				description: "Get server by id",
				params: z.object({
					serverId: z.string(),
				}),
				response: { 200: ServerSchema, 404: z.object({ message: z.string(), error: z.string() }) },
			},
		}),
		async (request, reply) => {
			const { serverId } = request.params as { serverId: string };

			try {
				const server = await app.prisma.server.findUnique({
					where: { id: serverId },
					select: {
						bots: true,
						serverid: true,
						id: true,
						name: true,
						createdAt: true,
						description: true,
						ownerId: true,
						updatedAt: true,
					},
				});

				if (!server) {
					return reply.code(404).send({
						statusCode: 404,
						error: "Not Found",
						message: "Server not found",
					});
				}

				return reply.status(200).send(server);
			} catch (error) {
				app.log.error(error);
				return reply.code(500).send({
					statusCode: 500,
					error: "Internal Server Error",
					message: "Something went wrong",
				});
			}
		}
	);

	app.put(
		"/:serverId",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Update server",
			schema: {
				tags: ["Servers"],
				body: z.object({
					name: z.string(),
					description: z.string().nullable().optional(),
				}),
			},
		}),
		async (request, reply) => {
			const { serverId } = request.params as { serverId: string };
			const { name, email } = request.body as { name?: string; email?: string };
			console.log("REQUEST BODY", request.body);
			try {
				const updatedUser = await app.prisma.server.update({
					where: { id: serverId },
					data: {
						...(name && { name }), // Only update if provided
						...(email && { email }), // Only update if provided
					},
					select: {
						id: true,
						name: true,
						createdAt: true,
						updatedAt: true,
					},
				});

				return updatedUser;
			} catch (error) {
				if (error.code === "P2025") {
					// Prisma not found error code
					return reply.code(404).send({
						statusCode: 404,
						error: "Not Found",
						message: "User not found",
					});
				}

				app.log.error(error);
				return reply.code(500).send({
					statusCode: 500,
					error: "Internal Server Error",
					message: "Failed to update user",
				});
			}
		}
	);

	// Delete user
	app.delete(
		"/:serverId",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Delete server",
			schema: {
				params: z.object({ serverId: z.string() }),
				tags: ["Servers"],
				response: {
					204: z.object({ messsage: z.string() }),
				},
			},
		}),
		async (request, reply) => {
			const { serverId } = request.params as { serverId: string };

			try {
				await app.prisma.server.delete({
					where: { id: serverId },
				});
				return reply.code(204).send("Server deleted");
			} catch (error) {
				if (error.code === "P2025") {
					// Prisma not found error code
					return reply.code(404).send({
						statusCode: 404,
						error: "Not Found",
						message: "User not found",
					});
				}

				app.log.error(error);
				return reply.code(500).send({
					statusCode: 500,
					error: "Internal Server Error",
					message: "Failed to delete user",
				});
			}
		}
	);
}
