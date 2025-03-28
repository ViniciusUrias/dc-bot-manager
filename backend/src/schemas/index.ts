// src/schemas.ts
export const schemas = {
	User: {
		$id: "User",
		type: "object",
		properties: {
			id: { type: "string", format: "uuid" },
			email: { type: "string", format: "email" },
			name: { type: "string" },
			createdAt: { type: "string", format: "date-time" },
		},
	},
	Bot: {
		$id: "Bot",
		type: "object",
		properties: {
			id: { type: "string", format: "uuid" },
			name: { type: "string" },
			discordId: { type: "string" },
			prefix: { type: "string", default: "!" },
		},
	},
	Error: {
		$id: "Error",
		type: "object",
		properties: {
			statusCode: { type: "number" },
			error: { type: "string" },
			message: { type: "string" },
		},
	},
};

export const securitySchemes = {
	bearerAuth: {
		type: "http",
		scheme: "bearer",
		bearerFormat: "JWT",
		description: "Enter JWT token in format: Bearer <token>",
	},
};
