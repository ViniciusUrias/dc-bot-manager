import { createRouteConfig2, createRoutePlugin } from "@/utils/route-config";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import serverIdRoutes from "./[id]";
import { z } from "zod";
import { Server, ServerSchema, ServerWithPartialRelationsSchema } from "@/types";

export default async function (app: FastifyInstance, opts: FastifyPluginOptions) {
	const { defaultRouteConfig } = createRoutePlugin({
		...opts,
		defaultRouteConfig: {
			tags: ["Servers"],
			summary: "Server routes",
			auth: true,
		},
	});

	app.get(
		"/",
		createRouteConfig2(defaultRouteConfig, {
			schema: {
				tags: ["Servers"],
				response: { 200: z.array(ServerWithPartialRelationsSchema) },
			},
		}),
		async (request, reply) => {
			const { id } = request.user;
			try {
				const servers = await app.prisma.server.findMany({
					where: { ownerId: id },
					select: {
						name: true,
						description: true,
						id: true,
						serverid: true,
						createdAt: true,
						updatedAt: true,
						bots: true,
						ownerId: true,
					},
				});

				return reply.status(200).send(servers);
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
	app.post(
		"/",

		createRouteConfig2(defaultRouteConfig, {
			summary: "Create server",
			schema: {
				tags: ["Servers"],
				body: ServerSchema.partial(),
				response: {
					201: ServerSchema,
					409: z.object({
						error: z.string(),
						message: z.string(),
					}),
				},
			},
		}),
		async (request, reply) => {
			const { name, serverid, description } = request.body as Server;
			const { id } = request.user;
			const exists = await app.prisma.server.findUnique({
				where: { name, ownerId: id },
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
					serverid,
					name,
					description,
				},
				select: {
					description: true,
					id: true,
					serverid: true,
					ownerId: true,
					name: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			return reply.status(201).send(server);
		}
	);

	app.register(serverIdRoutes, { defaultConfig: defaultRouteConfig });
}
