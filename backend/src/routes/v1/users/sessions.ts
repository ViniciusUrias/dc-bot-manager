import { FastifyInstance } from "fastify";
import { createRouteConfig, standardResponses } from "../../../utils/route-config";

export default async function (app: FastifyInstance) {
	// Get all active sessions
	app.get(
		"/",
		createRouteConfig({
			tags: ["Users"],
			summary: "Get all active sessions",
			response: {
				200: {
					description: "List of active sessions",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: { type: "string" },
										createdAt: { type: "string", format: "date-time" },
										lastUsed: { type: "string", format: "date-time" },
										ipAddress: { type: "string" },
										userAgent: { type: "string" },
									},
								},
							},
						},
					},
				},
				...standardResponses,
			},
			security: [{ bearerAuth: [] }],
		}),
		async (request, reply) => {
			// Implementation
			const userId = request.user.id;
			const sessions = await app.prisma.session.findMany({
				where: { userId },
				select: {
					id: true,
					createdAt: true,
					lastUsed: true,
					ipAddress: true,
					userAgent: true,
				},
			});
			return sessions;
		}
	);

	// Revoke a session
	app.delete(
		"/:sessionId",
		createRouteConfig({
			tags: ["Users"],
			summary: "Revoke a session",
			params: {
				type: "object",
				properties: {
					sessionId: { type: "string", format: "uuid" },
				},
			},
			response: {
				204: {
					description: "Session revoked successfully",
				},
				...standardResponses,
			},
			security: [{ bearerAuth: [] }],
		}),
		async (request, reply) => {
			// Implementation
			const { sessionId } = request.params as { sessionId: string };
			const userId = request.user.id;

			await app.prisma.session.deleteMany({
				where: { id: sessionId, userId },
			});

			reply.code(204).send();
		}
	);

	// Revoke all sessions except current
	app.delete(
		"/",
		createRouteConfig({
			tags: ["Users"],
			summary: "Revoke all sessions except current",
			response: {
				204: {
					description: "All other sessions revoked",
				},
				...standardResponses,
			},
			security: [{ bearerAuth: [] }],
		}),
		async (request, reply) => {
			// Implementation
			const userId = request.user.id;
			const currentSessionId = request.session.id;
			console.log("aasdasdsa");
			await app.prisma.session.deleteMany({
				where: { userId, NOT: { id: currentSessionId } },
			});

			reply.code(233).send();
		}
	);
}
