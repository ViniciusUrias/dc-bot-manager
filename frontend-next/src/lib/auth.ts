"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";

export async function login(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
		// no credentials: include as we are in server actions
	});
	if (!response?.ok) {
		return { success: false, error: "Invalid credentials" };
	}
	const body = await response.json();
	console.log("JSON", body);
	const authCookie = response.headers.get("set-cookie");
	console.log("AUTH COOKIE", authCookie);
	if (authCookie) {
		const token = authCookie.split(";")[0].split("=")[1];
		console.log("TOKEN", token);
		(await cookies()).set("authToken", body.token, {
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});
	}
	redirect("/home");
}

export async function logout() {
	try {
		await fetch(`${API_URL}/logout`, {
			method: "POST",
			credentials: "include",
		});
	} finally {
		(await cookies()).delete("authToken");
		redirect("/login");
	}
}

export async function getSession() {
	const ck = await cookies();
	const sessionToken = ck.get("authToken")?.value;
	if (!sessionToken) return null;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
			headers: {
				Cookie: `authToken=${sessionToken}`,
				Authorization: `Bearer ${sessionToken}`,
			},
		});
		if (!response?.ok) {
			return { error: true, message: "Invalid credentials or token" };
		}
		const user = await response.json();
		return user as {
			id: string;
			email: string;
			name?: string;
		};
	} catch (error) {
		console.error("Session validation error:", error);
		return { error: true, message: error.message };
	}
}
