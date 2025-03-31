import { initiateConnection } from "@/discord";
import { createRouteConfig2 } from "@/utils/route-config";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance, opts) {
	app.post(
		"/configure",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Initiate server",
			body: {
				type: "object",
				required: ["serverid"],
				properties: {
					serverid: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { name, serverid } = request.body as { name: string; serverid: string };
			const { id } = request.user;
			await initiateConnection({ serverId: serverid, userId: id });
			return reply.code(200).send({ message: "Server initiated successfully" });
		}
	);
	app.get(
		"/:serverId",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Get server by id",
			params: {
				type: "object",
				properties: {
					serverId: { type: "string" },
				},
				required: ["serverId"],
			},
		}),
		async (request, reply) => {
			const { serverId } = request.params as { serverId: string };

			try {
				const user = await app.prisma.server.findUnique({
					where: { id: serverId },
					select: {
						id: true,
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

	app.put(
		"/:serverId",
		createRouteConfig2(opts.defaultConfig, {
			summary: "Update server",
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
			const { serverId } = request.params as { serverId: string };
			const { name, email } = request.body as { name?: string; email?: string };

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
			params: {
				type: "object",
				properties: {
					serverId: { type: "string" },
				},
				required: ["serverId"],
			},
			response: {
				204: {
					description: "No Content",
				},
			},
		}),
		async (request, reply) => {
			const { serverId } = request.params as { serverId: string };

			try {
				await app.prisma.server.delete({
					where: { id: serverId },
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
