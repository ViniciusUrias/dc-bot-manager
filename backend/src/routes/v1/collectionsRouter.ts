// Importing the Express module
import express from "express";
import * as CollectionController from "../../controllers/collectionController";

// Initializing the router for the 'example' resource
const collectionsRouter = express.Router();

collectionsRouter.get("/", CollectionController.getCollections);
collectionsRouter.get("/:teamId", CollectionController.getCollectionsByTeamId);
collectionsRouter.post("/", CollectionController.createCollection);
collectionsRouter.put("/", CollectionController.updateCollection);
collectionsRouter.delete("/", CollectionController.deleteCollection);

export default collectionsRouter;
