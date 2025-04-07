"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";

export async function login(formData: FormData) {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: username, password }),
			credentials: "include", // Importante para cookies
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		// O cookie é definido automaticamente pelo browser devido ao 'credentials: include'
		return { success: true };
	} catch (error) {
		console.error("Login error:", error);
		return { success: false, error: "Invalid credentials" };
	}
}

export async function logout() {
	try {
		await fetch(`${API_URL}/logout`, {
			method: "POST",
			credentials: "include",
		});
	} finally {
		cookies().delete("session_token");
		redirect("/login");
	}
}

export async function getSession() {
	const sessionToken = cookies().get("session_token")?.value;

	if (!sessionToken) return null;

	try {
		const response = await fetch(`${API_URL}/verify-token`, {
			headers: {
				Cookie: `session_token=${sessionToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Invalid session");
		}

		return await response.json();
	} catch (error) {
		console.error("Session validation error:", error);
		return null;
	}
}
