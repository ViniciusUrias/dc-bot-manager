"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirectTo: "/home",
			});

			if (result?.error) {
				setError(result.error);
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
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
				</div>
			</CardContent>
		</Card>
	);
}
