import axiosInstance from "@/api/services/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMonaco } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { LucidePlus } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router";

export default function BotDetails() {
	const { botId, serverId } = useParams();
	const monaco = useMonaco();
	useEffect(() => {
		monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);

		if (monaco) {
			console.log("here is the monaco instance:", monaco);
		}
	}, [monaco]);

	const { data } = useQuery({
		queryKey: ["bots", botId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/bots/${botId}`);
			return response.data;
		},
	});
	const handleStartBot = async () => {
		const response = await axiosInstance.post("/bots/start", {
			serverId,
			botId,
		});
	};
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Bot details</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Bot Name: {data?.name}</h2>
				<p>Bot Server: {data?.server?.name}</p>
				<p>Bot ID: {data?.id}</p>
				<p>Bot Prefix: {data?.prefix}</p>
				<p>Bot Token: {data?.token}</p>
				<p>Bot Description: {data?.description}</p>
			</div>
			<Button onClick={handleStartBot}>Start</Button>
			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Commands</h2>
				<NavLink to={`/users/servers/${serverId}/bots/${botId}/commands/new`}>
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
								to={`/users/servers/${serverId}/bots/${bot.id}`}
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

			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">New command</h2>
			</div>
		</div>
	);
}
