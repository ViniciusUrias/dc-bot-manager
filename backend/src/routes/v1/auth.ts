import { FastifyInstance, FastifyPluginOptions } from "fastify";
import AuthController from "../../controllers/authController";

export default async function AuthRouter(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	fastify.post("/login", AuthController.authenticate);
}
