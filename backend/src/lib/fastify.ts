import { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastifyMtp from "@fastify/multipart";
import FastifyBetterAuth from "fastify-better-auth";
import { auth } from "@/lib/auth";

export async function configureFastify(fastify: FastifyInstance) {
	fastify.register(fastifyMtp, { attachFieldsToBody: "keyValues" });

	fastify.register(fastifyJwt, {
		secret: process.env.JWT_SECRET,
	});
	fastify.register(fastifyCookie, {
		secret: process.env.COOKIE_SECRET,
		hook: "onRequest",
	});
	await fastify.register(FastifyBetterAuth, { auth });
}
