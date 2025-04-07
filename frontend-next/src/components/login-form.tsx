"use client";

import { login } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(event.currentTarget);
		const result = await login(formData);

		if (result.success) {
			router.push("/home");
		} else {
			setError(result.error || "Login failed");
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" required />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" required />
			</div>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
