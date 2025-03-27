// src/utils/route-config.ts

import { RouteShorthandOptions } from "fastify";

type RouteConfig = {
	tags: string[];
	summary: string;
	description?: string;
	body?: any;
	params?: any;
	querystring?: any;
	headers?: any;
	auth?: boolean;
	response?: Record<number, any>;
	security?: Array<Record<string, any[]>>;
};

export function createRouteConfig(config: RouteConfig): RouteShorthandOptions {
	return {
		schema: {
			...config,
			security: config.auth ? [{ bearerAuth: [] }] : config.security ? config.security : null,
			response: {
				...config.response,
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: { $ref: "Error#" },
						},
					},
				},
			},
		},
	};
}

// Pre-defined common responses
export const standardResponses = {
	400: {
		description: "Bad Request",
		content: {
			"application/json": {
				schema: { $ref: "Error#" },
			},
		},
	},
	401: {
		description: "Unauthorized",
		content: {
			"application/json": {
				schema: { $ref: "Error#" },
			},
		},
	},
	404: {
		description: "Not Found",
		content: {
			"application/json": {
				schema: { $ref: "Error#" },
			},
		},
	},
};
