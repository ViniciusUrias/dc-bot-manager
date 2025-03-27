// @ts-nocheck
import { Request, Response } from "express";
import CollectionService from "../services/collectionService";
export const getCollections = async (req: Request, res: Response) => {
	try {
		const users = await CollectionService.getAll();
		console.log("users", users);
		res.json(users);
	} catch (error) {
		res.status(500).json({ error });
	}
};
function buildTreeWithEndpoints(data) {
	// Create a map for quick lookup by id
	const idMap = data.reduce((map, item) => {
		map[item.id] = { ...item, children: [...item.endpoints] }; // Initialize children with endpoints
		delete map[item.id].endpoints; // Remove endpoints key
		return map;
	}, {});

	const tree = [];

	data.forEach((item) => {
		if (item.fatherId === null) {
			// Top-level node (no parent)
			tree.push(idMap[item.id]);
		} else {
			// Add to the children of its parent
			const parent = idMap[item.fatherId];
			if (parent) {
				parent.children.push(idMap[item.id]);
			}
		}
	});

	return tree;
}
export const getCollectionsByTeamId = async (req, res) => {
	try {
		const { teamId } = req.params;
		const collections = await CollectionService.getById(teamId);

		res.json(buildTreeWithEndpoints(collections));
	} catch (error) {
		res.status(500).json({ error });
	}
};
export const createCollection = async (req, res) => {
	try {
		const response = await CollectionService.create(req.body);
		return res.json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};
export const updateCollection = async (req, res) => {
	try {
		const response = await CollectionService.update(req.body.id, req.body);
		return res.json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};
export const deleteCollection = async (req, res) => {
	try {
		const response = await CollectionService.delete(req.body.id);
		return res.json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};
