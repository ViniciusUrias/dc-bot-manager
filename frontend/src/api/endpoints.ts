const ENDPOINTS = {
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
	},
	USERS: {
		GET: "/users",
		POST: "/users",
		PUT: "/users/:id",
		DELETE: "/users/:id",
	},
} as const;

export default ENDPOINTS;
