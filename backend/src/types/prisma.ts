import { User as PrismaUser } from "../prisma/generated";

// Define the user type that will be returned by your API
export type User = Pick<PrismaUser, "id" | "email" | "name" | "createdAt" | "updatedAt">;

// Extend Fastify types to include Prisma
declare module "fastify" {
	interface FastifyInstance {
		prisma: import("../prisma/generated").PrismaClient;
	}
}
