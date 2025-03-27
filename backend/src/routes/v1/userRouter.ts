// Importing the Express module
import { getAllUsers, getUserById } from "../../controllers/userController";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

// Fastify plugin (equivalent to Express Router)
export default async function UserRouter(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	// Root route
	fastify.get("/", getAllUsers);
	fastify.get("/:id", getUserById);
}
