import { createHash } from "@/utils/auth";
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
			const user = await app.prisma.server.findMany({
				where: { ownerId: userId },
				select: {
					name: true,
					id: true,
					serverid: true,
					createdAt: true,
					updatedAt: true,
					bots: true,
				},
			});

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
				required: ["name", "serverid"],
				properties: {
					name: { type: "string" },
					serverid: { type: "string" },
				},
			},
		}),
		async (request, reply) => {
			const { name, serverid } = request.body as { name: string; serverid: string };
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
			const crpytd = await createHash(serverid);
			const server = await app.prisma.server.create({
				data: {
					ownerId: id,
					serverid: crpytd,
					name,
				},
				select: {
					id: true,
					serverid: true,
					name: true,
					createdAt: true,
				},
			});
			return server;
		}
	);

	app.register(serverIdRoutes, { defaultConfig: defaultRouteConfig });
}
