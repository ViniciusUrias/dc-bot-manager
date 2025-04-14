import axiosInstance from "@/api/services/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBot } from "@/hooks/useBots";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LucidePlus, X } from "lucide-react";
import { NavLink, useParams } from "react-router";

export default function ServerDetails() {
	const { serverId } = useParams();

	const { data, refetch } = useQuery({
		queryKey: ["servers", serverId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/servers/${serverId}`);
			return response.data;
		},
	});
	const { startBot, stopBot } = useBot({});

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Server Details</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Server Name: {data?.name}</h2>
				<p className="text-primary">Server Description: {data?.description}</p>
			</div>
			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Bots</h2>
				<NavLink to={`/home/servers/${serverId}/bots/new`}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</NavLink>
			</div>
			<ScrollArea className="w-full min-h-[100px] max-h-[75vh] flex flex-col p-2 gap-4 rounded-md border">
				{data?.bots?.map((bot) => {
					return (
						<Card className={cn(`transition-transform`, bot.isRemoving ? "animate-fadeOut" : "animate-fadeIn", "my-2")}>
							<CardHeader className="flex flex-row items-center justify-between ">
								<CardTitle aria-label={`Album title: ${bot.name}`}>{bot.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p aria-label={`Description of bot ${bot.name}`}>Description: '{bot?.description}'</p>
							</CardContent>
							<CardFooter className="flex items-center gap-4 justify-self-end">
								{bot.active ? (
									<Button
										variant="destructive"
										onClick={async () => {
											await stopBot(bot, false);
											await refetch();
										}}
									>
										Stop bot
									</Button>
								) : (
									<Button
										onClick={async () => {
											await startBot(bot, false);
											await refetch();
										}}
									>
										Start bot
									</Button>
								)}

								<NavLink
									key={bot.id}
									viewTransition
									className="  transition-all  focus:scale-105  focus:ring-2 "
									to={`/home/servers/${serverId}/bots/${bot.id}`}
								>
									<Button variant="outline">Details</Button>
								</NavLink>

								<Button
									variant={"destructive"}
									onClick={async () => {
										await axiosInstance.delete(`/bots/${bot.id}`);
										await refetch();
									}}
								>
									<X /> Delete bot
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</ScrollArea>
		</div>
	);
}
