import { User as PrismaUser } from "@prisma/client";
import {
	FastifyBaseLogger,
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

// Define the user type that will be returned by your API
export type User = Pick<PrismaUser, "id" | "email" | "name" | "createdAt" | "updatedAt">;
export type FastifyTypedWithZodInstance = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	FastifyBaseLogger,
	ZodTypeProvider
>;
// Extend Fastify types to include Prisma
declare module "fastify" {
	interface FastifyInstance extends FastifyTypedWithZodInstance {
		prisma: import("@prisma/client").PrismaClient;
	}
}
