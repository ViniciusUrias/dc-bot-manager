import axiosInstance from "@/api/services/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LucidePlus } from "lucide-react";
import { NavLink, useParams } from "react-router";

export default function ServerDetails() {
	const { serverId } = useParams();

	const { data } = useQuery({
		queryKey: ["servers", serverId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/servers/${serverId}`);
			return response.data;
		},
	});
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Server Details</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Server Name: {data?.name}</h2>
				<p className="text-foreground">Server ID: {data?.id}</p>
				<p className="text-primary-foreground">Server Description: {data?.description}</p>
			</div>
			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Bots</h2>
				<NavLink to={`/users/servers/${serverId}/bots/new`}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</NavLink>
			</div>
			<ScrollArea className="w-full min-h-[100px] max-h-[75vh]  grid grid-cols-2 p-2 rounded-md border">
				{data?.bots?.map((bot) => {
					return (
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
					);
				})}
			</ScrollArea>
		</div>
	);
}
