import { useServers } from "@/hooks/useServers";
import { cn } from "@/lib/utils";
import { Album, Albums } from "@/types/album";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
interface ServerListProps {
	servers: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (album: Album) => void;
}

export default function ServerList() {
	const {
		servers: { data, isFetching },
		deleteServer,
	} = useServers({});

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

	if (!data?.length) {
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
				{data?.map((server) => {
					return (
						<Link
							key={server.id}
							viewTransition
							className="   transition-all  "
							to="/app/servers/$serverId"
							params={{ serverId: server.id }}
							state={{ server }}
						>
							<Card className={cn(`transition-transform`, server.isRemoving ? "animate-fadeOut" : "animate-fadeIn")}>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle aria-label={`Album title: ${server.name}`}>{server.name}</CardTitle>
									<div className="flex items-center gap-2 justify-self-end">
										<Button
											role="button"
											id={`exclude-server-${server.title}-button`}
											aria-label={`Exclude server: ${server.title}`}
											onClick={async (e) => {
												console.log(e);
												e.preventDefault();
												e.stopPropagation();
												deleteServer(server);
												const liveRegion = document.getElementById("live-region");
												if (liveRegion) {
													liveRegion.textContent = `Album ${server.title} has been excluded.`;
												}
											}}
											size="icon"
											variant="ghost"
										>
											<Trash2 />
											<span className="sr-only">Exclude server: {server.title}</span>
										</Button>
										<Button
											role="button"
											id={`edit-server-${server.title}-button`}
											aria-label={`Edit server: ${server.title}`}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												// editServer(server);
											}}
											size="icon"
											variant="ghost"
										>
											<Pencil />
											<span className="sr-only">Edit server: {server.title}</span>
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
