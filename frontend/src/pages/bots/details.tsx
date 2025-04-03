import axiosInstance from "@/api/services/axios";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { FolderSync, LucidePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router";

import { z } from "zod";
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
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
export default function BotDetails() {
	const { botId, serverId } = useParams();
	const { data, refetch, isLoading } = useQuery({
		queryKey: ["bots", botId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/bots/${botId}`);
			setFile(response.data.icon);
			return response.data;
		},
	});

	const handleSync = async () => {
		const response = await axiosInstance.put(`/bots/${botId}/sync`);
		refetch();
	};
	const handleStartBot = async (bot) => {
		const response = await axiosInstance.post("/bots/start", {
			botId: bot.id,
			serverId,
		});
		refetch();
	};
	const handleStopBot = async (bot) => {
		const response = await axiosInstance.post("/bots/stop", {
			botId: bot.id,
			serverId,
		});
		refetch();
	};
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: data ?? {
			description: "",
			name: "",
			icon: "",
			tags: "",
		},
	});
	useEffect(() => {
		if (data) {
			setFile(data.icon);
			form.reset({ description: data?.description, name: data?.name, tags: data?.tags?.join(",") });
		}
	}, [data, form]);
	const [file, setFile] = useState();
	const transformFileToBase64 = async (ev) => {
		const base64 = await fileToBase64(ev.files[0]);
		setFile(base64 as string);
	};
	function fileToBase64(file: File): Promise<string | null> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		console.log(file);
		const response = await axiosInstance.put(`/bots/${botId}`, {
			...values,
			tags: values.tags.split(",").map((e) => e),
			icon: file,
			bot: { name: values.name, username: values.name },
		});
		await refetch();
	}
	console.log(form);
	if (isLoading) return "...";
	return (
		<div className="flex flex-col gap-4 p-4">
			<Form {...form}>
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Bot Details</CardTitle>
						<div className="flex  items-end gap-2">
							<h2 className=" font-semibold"> Name: {data?.name} |</h2>
							<p> Server: {data?.server?.name} |</p>
							<p> ID: {data?.id} |</p>
							<p> Prefix: {data?.prefix}</p>
						</div>

						<div className="flex items-center gap-2">
							{data.active ? (
								<Button className="w-fit" variant="destructive" onClick={() => handleStopBot(data)}>
									Stop bot
								</Button>
							) : (
								<Button className="w-fit" onClick={() => handleStartBot(data)}>
									Start bot
								</Button>
							)}
							<Button variant={"success"} onClick={handleSync}>
								<FolderSync /> Sync bot
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<div className={"flex flex-col  gap-6"}>
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

								<Button className="w-fit" type="submit">
									Save changes
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</Form>
			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Commands</h2>
				<NavLink to={`/home/servers/${serverId}/bots/${botId}/commands/new`}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</NavLink>
			</div>
			<ScrollArea className="w-full min-h-[100px] max-h-[75vh]  grid grid-cols-2 p-2 rounded-md border">
				{data?.commands?.map((bot) => {
					return (
						<>
							<NavLink
								key={bot.id}
								viewTransition
								className="   transition-all  focus:scale-105  focus:ring-2 "
								to={`/home/servers/${serverId}/bots/${bot.id}`}
							>
								<Card className={cn(`transition-transform`, bot.isRemoving ? "animate-fadeOut" : "animate-fadeIn")}>
									<CardHeader className="flex flex-row items-center justify-between ">
										<CardTitle aria-label={`Album title: ${bot.name}`}>{bot.name}</CardTitle>
									</CardHeader>
									<CardContent>
										<p aria-label={`Description of bot ${bot.name}`}>Prefix: '{bot?.prefix}'</p>
									</CardContent>
									<CardFooter>
										<p aria-label={`Categories of bot ${bot.name}`}>
											Category: <strong>landscape</strong>
										</p>
									</CardFooter>
								</Card>
							</NavLink>
						</>
					);
				})}
			</ScrollArea>
		</div>
	);
}
