import { createRouteConfig } from "@/utils/route-config";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
	// Get user by ID
	app.get("/", createRouteConfig({}), async (request, reply) => {
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
	});
	app.get(
		"/:userId",
		createRouteConfig({
			// ... keep your existing schema config
		}),
		async (request, reply) => {
			const { userId } = request.params as { userId: string };

			try {
				const user = await app.prisma.user.findUnique({
					where: { id: userId },
					select: {
						id: true,
						email: true,
						name: true,
						createdAt: true,
						updatedAt: true,
					},
				});

				if (!user) {
					return reply.code(404).send({
						statusCode: 404,
						error: "Not Found",
						message: "User not ssssssssfound",
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
		createRouteConfig({
			// ... keep your existing schema config
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
		createRouteConfig({
			// ... keep your existing schema config
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
