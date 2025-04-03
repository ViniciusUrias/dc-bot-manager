import { comparePasswords, createHash, generateToken } from "@/utils/auth";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createRouteConfig, standardResponses } from "../../../utils/route-config";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	app.post(
		"/auth/login",
		createRouteConfig({
			tags: ["Authentication"],
			summary: "User login",
			body: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email", default: "alice@prisma.io" },
					password: { type: "string", minLength: 4, default: "12345678" },
				},
			},
			response: {
				200: {
					description: "Login successful",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									token: { type: "string" },
									user: { $ref: "User#" },
								},
							},
						},
					},
				},
				...standardResponses,
			},
		}),
		async (request, reply) => {
			const { email, password } = request.body as {
				email: string;
				password: string;
			};

			// Find user by email
			const user = await app.prisma.user.findUnique({
				where: { email },
				select: {
					id: true,
					email: true,
					name: true,
					password: true,
					createdAt: true,
				},
			});

			if (!user) {
				return reply.code(401).send({
					statusCode: 401,
					error: "Unauthorized",
					message: "Invalid email or password",
				});
			}

			// Compare passwords
			const passwordMatch = await comparePasswords(password, user.password);
			if (!passwordMatch) {
				return reply.code(401).send({
					statusCode: 401,
					error: "Unauthorized",
					message: "Invalid email or password",
				});
			}
			console.log("USER", user);
			// Generate JWT token
			const token = generateToken(user.id);

			// Return user data without password
			const { password: _, ...userWithoutPassword } = user;

			return {
				token,
				user: userWithoutPassword,
			};
		}
	);
	app.post(
		"/auth/register",
		createRouteConfig({
			tags: ["Authentication"],
			summary: "New register",
			body: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email", default: "alice@prisma.io" },
					password: { type: "string", minLength: 4, default: "12345678" },
				},
			},
			response: {
				200: {
					description: "User created",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									token: { type: "string" },
									user: { $ref: "User#" },
								},
							},
						},
					},
				},
				...standardResponses,
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
			return reply.status(201).send("User created!");
		}
	);
}
