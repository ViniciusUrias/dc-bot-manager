// src/utils/route-config.ts

import {
	ContextConfigDefault,
	FastifyBaseLogger,
	FastifyPluginOptions,
	FastifySchema,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
	RouteGenericInterface,
	RouteShorthandOptions,
} from "fastify";
import { fastify } from "..";
import { ZodTypeProvider } from "fastify-type-provider-zod";

type RouteConfig = {
	tags?: string[];
	summary?: string;
	description?: string;
	body?: any;
	params?: any;
	querystring?: any;
	headers?: any;
	auth?: boolean;
	response?: Record<number, any>;
	security?: Array<Record<string, any[]>>;
};

type TypedRouteConfig = RouteShorthandOptions<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault,
	FastifySchema,
	ZodTypeProvider,
	FastifyBaseLogger
> & {
	auth?: boolean;
	tags?: string[];
	summary?: string;
	description?: string;
};

export function createRouteConfig2(defaultOptions: TypedRouteConfig, routeSpecificOptions?: TypedRouteConfig) {
	const hasAuth = defaultOptions.auth || routeSpecificOptions?.auth;
	return {
		preValidation: hasAuth ? [fastify.authenticate] : null,
		schema: {
			// Merge default and route-specific options

			...defaultOptions.schema,
			...routeSpecificOptions.schema,
			// Security is handled separately if auth is true
			...(defaultOptions.auth || routeSpecificOptions?.auth ? { security: [{ bearerAuth: [] }] } : {}),
		},
		// You can add other Fastify route options here if needed
		config: {
			// Custom properties can go here
			auth: defaultOptions.auth || routeSpecificOptions?.auth || false,
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

export function createRoutePlugin(pluginOptions: FastifyPluginOptions & { defaultRouteConfig?: RouteConfig }) {
	return {
		defaultRouteConfig: pluginOptions.defaultRouteConfig || {},
		// You can add other plugin-level utilities here
	};
}
