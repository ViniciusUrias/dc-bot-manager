import { createHash } from "@/utils/auth";
import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance } from "fastify";
import userIdRoutes from "./[userId]";

export default async function (app: FastifyInstance, opts) {
	// Register nested routes
	const { defaultRouteConfig } = createRoutePlugin({
		...opts,
		defaultRouteConfig: {
			tags: ["Users"],
			summary: "User routes",
			auth: true,
		},
	});
	app.post(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "User Create",
		}),
		async (request, reply) => {
			console.log("REQUEST BODY", request.body);
			if (typeof request.body === "string") {
				request.body = JSON.parse(request.body);
			}
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
			const hashedPassword = await createHash(password);

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

	app.register(userIdRoutes, { defaultRouteConfig });
	// app.register(profileRoutes, { prefix: "/me" });
	// app.register(sessionsRoutes, { prefix: "/sessions" });
}
