import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { useDeleteV1ServersServerid, useGetV1Servers } from "@/gen";

export default function ServerList() {
	const { data, isFetching } = useGetV1Servers();

	const { mutateAsync: deleteServer } = useDeleteV1ServersServerid();
	if (isFetching) {
		return (
			<>
				<Skeleton className="w-[10%] h-10 self-end justify-self-end" />
				<Skeleton className="w-full h-50" />
				<Skeleton className="w-full h-50" />
				<Skeleton className="w-full h-50" />
			</>
		);
	}

	if (!data?.data?.length) {
		return (
			<div>
				<span>You don't have any servers yet, try creating a new one</span>
				<Link viewTransition to="/app/servers/create">
					<Button>New server</Button>
				</Link>
			</div>
		);
	}

	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-lg ">
			<div className="justify-self-end mb-4">
				<Link viewTransition to="/app/servers/create">
					<Button>
						<Plus /> New server
					</Button>
				</Link>
			</div>
			<div className="masonry-grid flex gap-4 flex-col">
				{data?.data?.map((server) => {
					return (
						<Link
							key={server.id}
							viewTransition
							className="   transition-all  "
							to="/app/servers/$serverId"
							params={{ serverId: server.id }}
							state={{ server }}
						>
							<Card className={cn(`transition-transform`)}>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle aria-label={`Album title: ${server.name}`}>{server.name}</CardTitle>
									<div className="flex items-center gap-2 justify-self-end">
										<Button
											role="button"
											id={`exclude-server-${server.name}-button`}
											aria-label={`Exclude server: ${server.name}`}
											onClick={async (e) => {
												console.log(e);
												e.preventDefault();
												e.stopPropagation();
												deleteServer({ serverId: server.id });
												const liveRegion = document.getElementById("live-region");
												if (liveRegion) {
													liveRegion.textContent = `Album ${server.name} has been excluded.`;
												}
											}}
											size="icon"
											variant="ghost"
										>
											<Trash2 />
											<span className="sr-only">Exclude server: {server.name}</span>
										</Button>
										<Button
											role="button"
											id={`edit-server-${server.name}-button`}
											aria-label={`Edit server: ${server.name}`}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												// editServer(server);
											}}
											size="icon"
											variant="ghost"
										>
											<Pencil />
											<span className="sr-only">Edit server: {server.name}</span>
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<p aria-label={`Description of server ${server.name}`}>Active bots: {server?.bots?.length}</p>
								</CardContent>
								<CardFooter>
									<p aria-label={`Categories of server ${server.name}`}>{server.description}</p>
								</CardFooter>
							</Card>
						</Link>
					);
				})}
			</div>
		</ScrollArea>
	);
}
