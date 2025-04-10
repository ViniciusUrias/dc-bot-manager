"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { updateServer } from "../actions";

export default function ServerDetails({ server }) {
	const handleStartBot = async (bot) => {
		// const response = await axiosInstance.post("/bots/start", {
		// 	botId: bot.id,
		// 	serverId,
		// });
		// refetch();
	};
	const handleStopBot = async (bot) => {
		// const response = await axiosInstance.post("/bots/stop", {
		// 	botId: bot.id,
		// 	serverId,
		// });
		// refetch();
	};
	const handleDeleteCommands = async (botId) => {
		// const response = await axiosInstance.delete(`/bots/${botId}/commands`);
	};
	const handleUpdateServer = async (botId) => {
		// const response = await axiosInstance.delete(`/bots/${botId}/commands`);
	};
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Server Details</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Server Name: {server?.name}</h2>
				<p className="text-foreground">Server ID: {server?.id}</p>
				<p className="text-foreground">Server discord ID: {server?.serverid}</p>
				<p className="text-primary-foreground">Server Description: {server?.description}</p>
			</div>
			<form action={updateServer}>
				<div className="space-y-2">
					<Label htmlFor="email">Name</Label>
					<Input defaultValue={server.name} id="name" name="name" type="name" required minLength={5} maxLength={100} />
				</div>
				<input type="hidden" value={server.id} name="id" />
				<Button className="w-fit" type="submit">
					Update Server
				</Button>
			</form>

			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Bots</h2>
				<Link href={`/home/servers/${server.id}/bots/new`}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</Link>
			</div>

			<ScrollArea className="w-full min-h-[100px] max-h-[75vh] flex flex-col p-2 gap-4 rounded-md border">
				{server?.bots?.map((bot) => {
					return (
						<Card
							key={bot.id}
							className={cn(`transition-transform`, bot.isRemoving ? "animate-fadeOut" : "animate-fadeIn", "my-2")}
						>
							<CardHeader className="flex flex-row items-center justify-between ">
								<CardTitle aria-label={`Album title: ${bot.name}`}>{bot.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p aria-label={`Description of bot ${bot.name}`}>Prefix: '{bot?.prefix}'</p>
							</CardContent>
							<CardFooter className="flex items-center gap-4 justify-self-end">
								{bot.active ? (
									<Button variant="destructive" onClick={() => handleStopBot(bot)}>
										Stop bot
									</Button>
								) : (
									<Button onClick={() => handleStartBot(bot)}>Start bot</Button>
								)}
								<Link
									key={bot.id}
									className="  transition-all  focus:scale-105  focus:ring-2 "
									href={`/home/servers/${serverId.id}/bots/${bot.id}`}
								>
									<Button variant="outline">Details</Button>
								</Link>
								<Button variant="destructive" onClick={() => handleDeleteCommands(bot.id)}>
									Delete commands
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</ScrollArea>
		</div>
	);
}
