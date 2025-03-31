import axiosInstance from "@/api/services/axios";
import { cn } from "@/lib/utils";
import { Album, Albums } from "@/types/album";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
interface AlbumListProps {
	servers: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (album: Album) => void;
}
interface AlbumWithState extends Album {
	isRemoving?: boolean;
}
export default function AlbumList({ onDelete, onEdit }: AlbumListProps) {
	const { data: servers } = useQuery({
		queryKey: ["servers"],
		queryFn: async () => {
			const response = await axiosInstance.get("/servers");
			return response.data;
		},
	});
	console.log(servers);

	const [visibleAlbums, setVisibleAlbums] = React.useState<AlbumWithState[]>(
		servers?.map((album) => ({ ...album, isRemoving: false }))
	);
	useEffect(() => {
		setVisibleAlbums(servers);
	}, [servers]);

	const handleDelete = (albumId: number) => {
		if (onDelete) {
			setVisibleAlbums((prev) => prev.map((album) => (album.id === albumId ? { ...album, isRemoving: true } : album)));
			setTimeout(() => {
				setVisibleAlbums((prev) => prev.filter((album) => album.id !== albumId));
				onDelete(albumId);
			}, 300);
		}
	};

	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-lg ">
			<div className="masonry-grid flex gap-2 flex-col">
				{visibleAlbums?.map((server) => {
					return (
						<NavLink
							key={server.id}
							viewTransition
							className="  z-[999999] transition-all  focus:scale-105  focus:ring-2 "
							to={`/users/servers/${server.id}`}
						>
							<Card className={cn(`transition-transform`, server.isRemoving ? "animate-fadeOut" : "animate-fadeIn")}>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle aria-label={`Album title: ${server.name}`}>{server.name}</CardTitle>
									{onDelete || onEdit ? (
										<div className="flex items-center gap-2">
											{onDelete && (
												<Button
													role="button"
													id={`exclude-server-${server.title}-button`}
													aria-label={`Exclude server: ${server.title}`}
													onClick={async (e) => {
														console.log(e);
														e.preventDefault();
														e.stopPropagation();
														handleDelete(server.id);
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
											)}

											{onEdit && (
												<Button
													role="button"
													id={`edit-server-${server.title}-button`}
													aria-label={`Edit server: ${server.title}`}
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														onEdit(server);
													}}
													size="icon"
													variant="ghost"
												>
													<Pencil />
													<span className="sr-only">Edit server: {server.title}</span>
												</Button>
											)}
										</div>
									) : null}
								</CardHeader>
								<CardContent>
									<p aria-label={`Description of server ${server.name}`}>Active bots: {server?.bots?.length}</p>
								</CardContent>
								<CardFooter>
									<p aria-label={`Categories of server ${server.name}`}>
										Category: <strong>landscape</strong>
									</p>
								</CardFooter>
							</Card>
						</NavLink>
					);
				})}
			</div>
		</ScrollArea>
	);
}
