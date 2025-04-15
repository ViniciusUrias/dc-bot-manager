import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { authClient } from "@/lib/auth";
import { Checkbox } from "./ui/checkbox";
const formSchema = z.object({
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	rememberMe: z.boolean().default(false).optional(),
});
export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "teste@teste.com",
			password: "12345678",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		const { email, password, rememberMe } = values;

		try {
			await authClient.signIn.email(
				{
					email,
					password,
					callbackURL: "/",
					rememberMe,
				},
				{
					onSuccess(context) {
						const authToken = context.response.headers.get("set-auth-token");
						if (authToken) {
							localStorage.setItem("bearer", authToken);
						}
					},
					onError(context) {
						console.log(context);
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	}
	const signInWithDiscord = async () => {
		const { data } = await authClient.signIn.social({
			provider: "discord",
			callbackURL: "http://localhost:5173/home",
			fetchOptions: {
				onSuccess(context) {
					console.log("SUCCESS", context);
				},
			},
		});
	};
	return (
		<Form {...form}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your username and password below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<div className={"flex flex-col gap-6"}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="user" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="****" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rememberMe"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start ">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormLabel>Remember me</FormLabel>

										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</CardContent>
				<div className="mt-2  flex flex-col items-center justify-between">
					<span className="font-medium text-muted-foreground">Don't have an account?</span>
					<NavLink className="mt-0 w-fit" to="/register">
						<Button variant="link">Register now</Button>
					</NavLink>
					<em className="text-muted-foreground">or</em>
					<Button disabled variant="outline" className="w-fit mt-2" onClick={signInWithDiscord}>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
						</svg>
						Sign in with discord (disabled for now)
					</Button>
				</div>
			</Card>
		</Form>
	);
}
