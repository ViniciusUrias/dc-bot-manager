import { FastifyInstance, FastifyPluginOptions } from "fastify";
import V1Router from "./v1";

// Fastify plugin (equivalent to Express Router)
export default async function Router(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	// Sub-routes (prefix them manually or use `fastify.register`)
	fastify.register(V1Router);
}

// const router = Router();

// /**
//  * @desc   Root route of the API
//  * @route  GET /
//  * @access Public
//  * @returns A JSON message confirming that the API route was hit
//  */
// router.get("/", (req, res) => {
// 	res.status(200).json({
// 		message: "You hit the API route",
// 	});
// });

// /**
//  * @desc   Version 1 API routes
//  * @route  /v1
//  * @access Public
//  * @remarks Additional versions like /v2 can be added as needed
//  */
// router.use("/v1", v1);

// export default router;
