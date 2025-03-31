// src/utils/auth.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // Token expires in 7 days
console.log("JWT SECRET", JWT_SECRET);
export async function createHash(password: string): Promise<string> {
	return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
	return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(userId: string): string {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string } {
	return jwt.verify(token, JWT_SECRET) as { userId: string };
}
