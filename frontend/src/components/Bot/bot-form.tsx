import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useBot } from "@/hooks/useBots";
import { Bot } from "@/types/prisma";
import { fileToBase64 } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useGetV1Servers } from "@/gen";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	serverId: z.string(),

	tags: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	icon: z
		.string()
		.min(2, {
			message: "Username must be at least 2 characters.",
		})
		.optional()
		.nullable(),
	description: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});
export default function BotForm({ bot }: { bot?: Bot }) {
	const [file, setFile] = useState("");
	const { updateBot, createBot } = useBot({ botId: bot?.id });
	const { data } = useGetV1Servers();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema, undefined, { raw: true }),
		defaultValues: {
			description: "",
			name: "",
			icon: "",
			tags: "",
			serverId: "",
		},
	});
	const transformFileToBase64 = async (ev) => {
		const base64 = await fileToBase64(ev.files[0]);
		setFile(base64 as string);
	};
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const body = {
			...values,
			tags: values.tags.split(",").map((e) => e),
			icon: file,
			// bot: { name: values.name, username: values.name },
		};
		if (bot) {
			await updateBot({ botId: bot.id, data: body });
		} else {
			await createBot({ data: body });
		}
	}
	useEffect(() => {
		if (bot) {
			setFile(bot?.icon ?? "");
			form.reset({ description: bot?.description, name: bot?.name, tags: bot?.tags?.join(",") });
		}
	}, [bot, form]);
	return (
		<Form {...form}>
			<Card>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<div className={"flex flex-col  gap-6"}>
							<FormField
								control={form.control}
								name="serverId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Server</FormLabel>

										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a server" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{data?.data?.map((e) => <SelectItem value={e.id}>{e.name}</SelectItem>)}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
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
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Cool bot" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-2">
								<FormField
									control={form.control}
									name="icon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="file"
													onChange={async (e) => {
														console.log(e);
														transformFileToBase64(e.target);
														field.onChange(e);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Avatar className="size-20 h-max ">
									<AvatarImage className="" src={file} alt="bot icon" />
									<AvatarFallback>BT</AvatarFallback>
								</Avatar>
							</div>

							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button className="w-fit self-end" type="submit">
								Save changes
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</Form>
	);
}
