import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBot } from "@/hooks/useBots";
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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			botId: "",
			name: "",
			botToken: "",
		},
	});
	const { createBot } = useBot({});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		await createBot({
			...values,
			serverId,
			prefix: "!",
			token: values.botToken,
		});
		navigate(-1);
	}
	return (
		<Form {...form}>
			<Card>
				<CardHeader>
					<BackButton />
					<CardTitle className="text-2xl">Bot creation</CardTitle>
					<CardDescription>
						Create your bot in{" "}
						<a className="text-accent-foreground" target="_blank" href={`https://discord.com/developers/applications`}>
							discord developers platform
						</a>{" "}
						and then insert the Application ID and Token
					</CardDescription>
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
										<FormLabel>{`Bot ID (General Information Tab > Application ID)`}</FormLabel>
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
										<FormLabel>{`Bot Token (Bot Tab > Generate Token)`}</FormLabel>
										<FormControl>
											<Input type="text" placeholder="****" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-fit" type="submit">
								Create
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</Form>
	);
}
