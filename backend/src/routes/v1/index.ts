// // Importing the Express module
// import express from "express";
// import authRouter from "./auth";
// import collectionsRouter from "./collectionsRouter";
// import userRouter from "./userRouter";
// const router = express.Router();

// router.get("/", (req, res) => {
// 	res.status(200).json({ message: "You hit the API v1 route" });
// });

// router.use("/auth", authRouter);
// router.use("/users", userRouter);
// router.use("/collections", collectionsRouter);

// export default router;

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRouter from "./auth";
import userRouter from "./userRouter";

// Fastify plugin (equivalent to Express Router)
export default async function v1Router(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	// Root route
	fastify.get("/", async (request, reply) => {
		return { message: "You hit the API v1 route" };
	});

	// Sub-routes (prefix them manually or use `fastify.register`)
	fastify.register(authRouter, { prefix: "/auth" });
	fastify.register(userRouter, { prefix: "/users" });
	// fastify.register(collectionsRouter, { prefix: "/collections" });
}
