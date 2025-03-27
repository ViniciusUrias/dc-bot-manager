import { schemas } from "@/schemas";
import { hashPassword } from "@/utils/auth";
import { createRouteConfig } from "@/utils/route-config";
import { FastifyInstance } from "fastify";
import userIdRoutes from "./[userId]";

export default async function (app: FastifyInstance) {
	// Register nested routes
	app.post(
		"/",
		createRouteConfig({
			tags: ["Users"],
			summary: "User Create",
			security: [{ bearerAuth: [] }], // Requires authentication

			body: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email" },
					password: { type: "string", minLength: 8 },
				},
			},
		}),
		async (request, reply) => {
			const { email, password, name } = request.body as {
				email: string;
				password: string;
				name: string;
			};

			// Check if user already exists
			const existingUser = await app.prisma.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				return reply.code(409).send({
					statusCode: 409,
					error: "Conflict",
					message: "Email already in use",
				});
			}

			// Hash password
			const hashedPassword = await hashPassword(password);

			// Create user
			const user = await app.prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
				},
				select: {
					id: true,
					email: true,
					name: true,
					createdAt: true,
				},
			});
		}
	);
	app.get(
		"/me",
		createRouteConfig({
			tags: ["Users"],
			summary: "Get current user profile",
			security: [{ bearerAuth: [] }], // Requires authentication
			response: {
				200: {
					description: "Current user details",
					content: {
						"application/json": {
							schema: schemas.User,
						},
					},
				},
				401: { $ref: "Error#" },
			},
		}),
		async (request, reply) => {
			// request.user is available because of our auth plugin
			const userId = request.user?.id;

			const user = await app.prisma.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					email: true,
					name: true,
					createdAt: true,
				},
			});

			return user;
		}
	);
	app.register(userIdRoutes);
	// app.register(profileRoutes, { prefix: "/me" });
	// app.register(sessionsRoutes, { prefix: "/sessions" });
}
