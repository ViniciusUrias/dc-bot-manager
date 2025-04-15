import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/services/axios";
import { useBot } from "@/hooks/useBots";
import { Button } from "@/components/ui/button";
import { LucidePlus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const getQueryOptions = (serverId: string) =>
	queryOptions({
		queryKey: ["servers", serverId],
		queryFn: async () => (await axiosInstance.get(`/servers/${serverId}`)).data,
	});
export const Route = createFileRoute("/app/servers/$serverId/")({
	component: RouteComponent,
	loader: async ({ context: { queryClient }, params }) => {
		return queryClient.ensureQueryData(getQueryOptions(params.serverId));
	},
});

function RouteComponent() {
	const serverId = Route.useParams().serverId;
	const { data, refetch } = useSuspenseQuery(getQueryOptions(serverId));
	const { startBot, stopBot } = useBot({});
	console.log(data);

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Server Details</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Server Name: {data?.name}</h2>
				<p className="text-primary">Server Description: {data?.description}</p>
			</div>
			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">Bots</h2>
				<Link to={"/app/servers/$serverId/bots/new"} params={{ serverId: serverId }}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</Link>
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

								<Link
									key={bot.id}
									viewTransition
									className="  transition-all  focus:scale-105  focus:ring-2 "
									to={"/app/servers/$serverId/bots/$botId"}
									params={{ botId: bot.id, serverId }}
								>
									<Button variant="outline">Details</Button>
								</Link>

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
