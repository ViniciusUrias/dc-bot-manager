import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../../prisma/prisma";
export const auth = betterAuth({
	trustedOrigins: ["http://localhost:5174"],
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
	socialProviders: { discord: { clientId: "1356982011390201986", clientSecret: "DyekPEYmUcsIXIcGMyNtA0PcMFGgrES5" } },
});
