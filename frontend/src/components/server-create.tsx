import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@tanstack/react-router";
import { usePostV1Servers } from "@/gen";

const formSchema = z.object({
	id: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export default function ServerCreate() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: "",
			name: "",
			description: "",
		},
	});
	const { mutateAsync } = usePostV1Servers();
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		const response = await mutateAsync({
			data: { name: values.name, serverid: values.id, description: values.description },
		});

		router.history.back();
	}
	return (
		<Form {...form}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">New server</CardTitle>
					<CardDescription>
						Enter custom server name and get the id from your discord (right click your server, and click 'COPY SERVER
						ID')
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
										<FormLabel>Server name</FormLabel>
										<FormControl>
											<Input placeholder="My cool server" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Server ID</FormLabel>
										<FormControl>
											<Input placeholder="ID" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Server description</FormLabel>
										<FormControl>
											<Input placeholder="Used for playing valorant" {...field} />
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
