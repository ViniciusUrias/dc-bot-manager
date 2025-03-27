import { FastifyReply, FastifyRequest } from "fastify";
import UsersService from "../services/userService";
export const getAllUsers = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const users = await UsersService.getAll();
		console.log("users", users);
		res.send(users);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "An error occurred while fetching users" });
	}
};

export const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const user = await UsersService.getById(id);

		res.send(user);
	} catch (error) {
		return res.status(404).send({ error: "User not found" });
	}
};
