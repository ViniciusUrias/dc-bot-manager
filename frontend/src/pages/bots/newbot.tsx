import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axiosInstance from "@/api/services/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSelector } from "@/store";
import { useNavigate, useParams } from "react-router";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	botId: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	botToken: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});
export default function NewBot() {
	const navigate = useNavigate();
	const { serverId } = useParams();
	const signIn = useSelector((s) => s.signIn);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			botId: "",
			name: "",
			botToken: "MTM1Njk4MjAxMTM5MDIwMTk4Ng.GdYRLj.r_PRVtCKLxw5atAwCYuvSNgaUN8VOKH4oY7okM",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		const response = await axiosInstance.post(`/bots`, {
			...values,

			serverId,
			prefix: "!",
			token: values.botToken,
		});
	}
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bot name</FormLabel>
										<FormControl>
											<Input placeholder="name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="botId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bot ID (eg. Application ID)</FormLabel>
										<FormControl>
											<Input type="text" placeholder="****" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="botToken"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bot Token</FormLabel>
										<FormControl>
											<Input type="text" placeholder="****" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</Form>
	);
}
