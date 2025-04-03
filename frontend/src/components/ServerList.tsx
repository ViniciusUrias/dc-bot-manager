import axiosInstance from "@/api/services/axios";
import { cn } from "@/lib/utils";
import { Album, Albums } from "@/types/album";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
interface ServerListProps {
	servers: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (album: Album) => void;
}

export default function ServerList({ onDelete, onEdit }: ServerListProps) {
	const { data: servers, refetch } = useQuery({
		queryKey: ["servers"],
		queryFn: async () => {
			const response = await axiosInstance.get("/servers");
			return response.data;
		},
	});
	console.log(servers);
	if (!servers?.length) {
		return (
			<div>
				<span>You don't have any servers yet, try creating a new one</span>
				<NavLink viewTransition to="/home/servers/create">
					<Button>New server</Button>
				</NavLink>
			</div>
		);
	}
	const deleteServer = async (server) => {
		const response = await axiosInstance.delete(`/servers/${server.id}`);
		await refetch();
	};
	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-lg ">
			<div className="justify-self-end my-2">
				<NavLink viewTransition to="/home/servers/create">
					<Button>
						<Plus /> New server
					</Button>
				</NavLink>
			</div>
			<div className="masonry-grid flex gap-2 flex-col">
				{servers?.map((server) => {
					return (
						<NavLink
							key={server.id}
							viewTransition
							className="  z-[999999] transition-all  focus:scale-105  focus:ring-2 "
							to={`/home/servers/${server.id}`}
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
						</NavLink>
					);
				})}
			</div>
		</ScrollArea>
	);
}
