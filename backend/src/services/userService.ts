import prisma from "../prisma/prisma";

const getAll = async () => {
	const response = await prisma.users.findMany();
	if (!response) {
		throw new Error("An error occurred while fetching collections");
	}
	return response;
};
const getById = async (id: string) => {
	const user = await prisma.users.findFirst({
		where: {
			id: parseInt(id),
		},
	});
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};

const create = async (data) => {
	const response = await prisma.users.create({
		data,
	});
	return response;
};
const update = async (id, data) => {
	const response = await prisma.users.update({
		where: { id },
		data,
	});
	return response;
};
const exclude = async (id) => {
	const response = await prisma.users.delete({
		where: { id },
	});
	return response;
};

const UsersService = {
	getAll,
	getById,
	create,
	update,
	delete: exclude,
};
export default UsersService;
