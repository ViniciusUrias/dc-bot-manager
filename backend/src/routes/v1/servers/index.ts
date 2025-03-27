import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import serverIdRoutes from "./[id]";

export default async function (app: FastifyInstance, opts: FastifyPluginOptions) {
	const { defaultRouteConfig } = createRoutePlugin({
		...opts,
		defaultRouteConfig: {
			tags: ["Servers"],
			summary: "Server routes",
			auth: true,
		},
	});
	app.get("/", createRouteConfig2(defaultRouteConfig, { summary: "Get all servers" }), async (request, reply) => {
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
	app.post(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			summary: "Create server",

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
			return server;
		}
	);

	app.register(serverIdRoutes, { defaultConfig: defaultRouteConfig });
}
