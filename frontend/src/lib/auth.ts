import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	/** the base url of the server (optional if you're using the same domain) */

	baseURL: "http://localhost:3000",
	fetchOptions: {
		auth: {
			type: "Bearer",
			token: () => localStorage.getItem("bearer") || "", // get the token from localStorage
		},
		onSuccess: (ctx) => {
			const authToken = ctx.response.headers.get("set-auth-token"); // get the token from the response headers
			// Store the token securely (e.g., in localStorage)
			console.log("TOKEN", authToken);
			if (authToken) {
				localStorage.setItem("bearer", authToken);
			}
		},
	},
});
