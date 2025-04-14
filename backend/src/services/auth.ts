import bc from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (email: string, password: string) => {
	// Check if the user exists

	const user = await prisma.users.findUnique({ where: { email } });
	if (!user) {
		throw new Error("Invalid email or password");
	}

	// Verify the password
	const isPasswordValid = await bc.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Invalid password");
	}

	// Generate JWT
	const token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: "1h" });
	return token;
};

const AuthService = { login };

export default AuthService;
