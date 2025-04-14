"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

export default function ServerCard({ server }) {
	if (!server) return null;
	return (
		<Link key={server.id} href={`/home/servers/${server.id}`}>
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
								// deleteServer(server);
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
}
