import { FastifyInstance } from "fastify";
import { createRouteConfig2 } from "../../../utils/route-config";

export default async function (app: FastifyInstance, { defaultRouteConfig }) {
	app.get(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get all users",
		}),
		async (request, reply) => {
			const { userId } = request.params as { userId: string };

			try {
				const user = await app.prisma.user.findMany();

				if (!user) {
					return reply.code(404).send({
						statusCode: 404,
						error: "Not SSS",
						message: "User not ssss",
					});
				}

				return user;
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
	app.get(
		"/:userId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Get by id",
			params: {
				type: "object",
				properties: {
					userId: {
						type: "string",
						description: "user id",
					},
				},
			},
			querystring: {
				type: "object",
				properties: {
					servers: {
						type: "boolean",
						description: "Include servers",
					},
					bots: {
						type: "boolean",
						description: "Include bots in the response",
					},
				},
			},
		}),
		async (request, reply) => {
			const { userId } = request.params as { userId: string };
			const { bots, servers } = request.query as { servers: boolean; bots: boolean };

			try {
				if (bots && !servers) {
					return reply.code(400).send({
						statusCode: 400,
						error: "Bad Request",
						message: "Bots cannot be included without servers",
					});
				}
				const user = await app.prisma.user.findUnique({
					where: { id: userId },
					select: {
						id: true,
						email: true,
						name: true,
						createdAt: true,
						updatedAt: true,

						servers: servers ? { include: { Bot: bots } } : false,
					},
				});

				if (!user) {
					return reply.code(404).send({
						statusCode: 404,
						error: "Not Found",
						message: "User not found",
					});
				}

				return user;
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

	// Update user
	app.put(
		"/:userId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Update user",
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					email: { type: "string", format: "email" },
				},
				required: [],
			},
		}),
		async (request, reply) => {
			const { userId } = request.params as { userId: string };
			const { name, email } = request.body as { name?: string; email?: string };

			try {
				const updatedUser = await app.prisma.user.update({
					where: { id: userId },
					data: {
						...(name && { name }), // Only update if provided
						...(email && { email }), // Only update if provided
					},
					select: {
						id: true,
						email: true,
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
		"/:userId",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Delete user",
			params: {
				type: "object",
				properties: {
					userId: {
						type: "string",
						description: "user id",
					},
				},
			},
		}),
		async (request, reply) => {
			const { userId } = request.params as { userId: string };

			try {
				await app.prisma.user.delete({
					where: { id: userId },
				});
				return reply.code(204).send();
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
