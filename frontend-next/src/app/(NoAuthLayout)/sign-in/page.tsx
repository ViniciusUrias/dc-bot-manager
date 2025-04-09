"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/better-auth";
export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const pw = formData.get("password");
		try {
			// const result = await authClient.signIn.email({ email, password: pw, callbackURL: "/home" });
			// const result = await login(formData);
			// const response = await fetch("http://localhost:3000/v1/users", {
			// 	method: "POST",

			// 	body: JSON.stringify({
			// 		email: "test@example.com",
			// 		password: "password1234",
			// 		name: "test",
			// 	}),
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNDMxYzU5OS1kZDMxLTQ4MDktYjM0MC05YWMxZWQwNTM0NzAiLCJpYXQiOjE3NDQyMDAwNjIsImV4cCI6MTc0NDgwNDg2Mn0.fjSA2PC0NtEWRxLwaX3FCuTrVi7qVQP2TBqbv18iQsM`,
			// 	},
			// });
			const { data, error } = await authClient.signIn.email(
				{
					email: "test@example.com",
					password: "password1234",
					callbackURL: "/home/user",
				},
				{
					onError(context) {
						console.log(context);
					},
				}
			);
			// const { data, error } = await authClient.signUp.email(
			// 	{
			// 		email: "test@example.com",
			// 		password: "password1234",
			// 		name: "test",
			// 	},
			// 	{
			// 		onError(context) {
			// 			console.log(context);
			// 		},
			// 	}
			// );

			if (error) {
				setError(error.message);
			}
		} catch (err) {
			console.log(err);
			setError("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const signInWithDiscord = async () => {
		const data = await authClient.signIn.social({
			provider: "discord",
			callbackURL: "http://localhost:5174/home/user",
		});
	};
	return (
		<Card className="w-1/2 md:w-1/3">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your username and password below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-2">
					<div className={"flex flex-col gap-6"}>
						<div className="space-y-2">
							<Label htmlFor="email">E-mail</Label>
							<Input id="email" name="email" type="email" required minLength={5} maxLength={100} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								placeholder="********"
								required
								minLength={4}
								type="password"
								maxLength={100}
							/>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" disabled={isLoading}>
							{isLoading ? <Loader className="animate-spin" /> : "Submit"}
						</Button>
					</div>
				</form>
				<div className="mt-2 justify-end justify-self-end">
					<Link className="mt-2" href="/register">
						<Button variant="ghost">Register now</Button>
					</Link>

					<Button onClick={signInWithDiscord}>Sign in with discord</Button>
				</div>
			</CardContent>
		</Card>
	);
}
