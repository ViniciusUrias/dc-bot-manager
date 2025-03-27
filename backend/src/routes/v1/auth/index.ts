import { FastifyInstance, FastifyPluginOptions } from "fastify";

import AuthController from "../../../controllers/authController";
import { createRouteConfig, standardResponses } from "../../../utils/route-config";

export default async function (app: FastifyInstance, _opts: FastifyPluginOptions) {
	app.post(
		"/login",
		createRouteConfig({
			tags: ["Authentication"],
			summary: "User login",
			body: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email" },
					password: { type: "string", minLength: 8 },
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
		AuthController.authenticate
	);
}
