import { schemas } from "@/schemas";
import { FastifyInstance } from "fastify";
import { createRouteConfig, standardResponses } from "../../../utils/route-config";

export default async function (app: FastifyInstance) {
	// Get current user profile
	app.get(
		"/",
		createRouteConfig({
			tags: ["Users"],
			summary: "Get current user profile",
			response: {
				200: {
					description: "Current user details",
					content: {
						"application/json": {
							schema: schemas.User,
						},
					},
				},
				...standardResponses,
			},
			auth: true,
		}),
		async (request, reply) => {
			// Implementation
			const userId = request.user.id;
			const user = await app.prisma.user.findUnique({
				where: { id: userId },
				select: { id: true, email: true, name: true, createdAt: true },
			});
			return user;
		}
	);

	// Update current user profile
	app.patch(
		"/",
		createRouteConfig({
			tags: ["Users"],
			summary: "Update current user profile",
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					email: { type: "string", format: "email" },
					currentPassword: { type: "string" },
					newPassword: { type: "string", minLength: 8 },
				},
			},
			response: {
				200: {
					description: "Updated user profile",
					content: {
						"application/json": {
							schema: schemas.User,
						},
					},
				},
				...standardResponses,
			},
			auth: true,
		}),
		async (request, reply) => {
			// Implementation
			const userId = request.user.id;
			const { name, email, currentPassword, newPassword } = request.body as {
				name?: string;
				email?: string;
				currentPassword?: string;
				newPassword?: string;
			};

			const updateData: any = { name, email };

			if (newPassword) {
				// Verify current password and update to new password
				// Implementation depends on your auth system
			}

			const updatedUser = await app.prisma.user.update({
				where: { id: userId },
				data: updateData,
				select: { id: true, email: true, name: true, createdAt: true },
			});

			return updatedUser;
		}
	);
}
