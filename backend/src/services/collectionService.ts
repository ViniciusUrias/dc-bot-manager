import prisma from "../../prisma/prisma";

const getAll = async () => {
	const response = await prisma.collections.findMany();
	if (!response) {
		throw new Error("An error occurred while fetching collections");
	}
	return response;
};
const getById = async (id: string) => {
	const collections = await prisma.collections.findMany({
		include: {
			endpoints: true,
		},
		where: {
			teamId: parseInt(id),
		},
	});
	if (!collections) {
		throw new Error("An error occurred while fetching collections");
	}
	return collections;
};

const create = async (data) => {
	const response = await prisma.collections.create({
		data,
	});
	return response;
};
const update = async (id, data) => {
	const response = await prisma.collections.update({
		where: { id },
		data,
	});
	return response;
};
const exclude = async (id) => {
	const response = await prisma.collections.delete({
		where: { id },
	});
	return response;
};

const CollectionService = {
	getAll,
	getById,
	create,
	update,
	delete: exclude,
};
export default CollectionService;
