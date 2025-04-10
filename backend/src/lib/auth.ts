import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import prisma from "../../prisma/prisma";
export const auth = betterAuth({
	plugins: [bearer()],
	trustedOrigins: ["http://localhost:5174", "http://localhost:5173"],
	onAPIError: {
		onError(error, ctx) {
			console.log("ERROR", error);
			console.log("ctx", ctx);
		},
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: { enabled: true },
	socialProviders: { discord: { clientId: "1356982011390201986", clientSecret: "fKco8Y4MbPgofjpjvh1sJ4BKfsNA8VVl" } },
});
