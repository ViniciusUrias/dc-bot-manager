import { Album, Albums } from "@/types/album";
import { Plus } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import Link from "next/link";
import { getServers } from "@/app/(MainLayout)/home/servers/actions";
import ServerCard from "./server-card";
interface ServerListProps {
	servers: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (album: Album) => void;
}

export default async function ServerList() {
	const data = await getServers();

	if (!data?.length) {
		return (
			<div>
				<span>You don't have any servers yet, try creating a new one</span>
				<Link href="/home/servers/create">
					<Button>New server</Button>
				</Link>
			</div>
		);
	}

	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-lg ">
			<div className="justify-self-end my-2">
				<Link href="/home/servers/create">
					<Button>
						<Plus /> New server
					</Button>
				</Link>
			</div>
			<div className="masonry-grid flex gap-2 flex-col">
				{data?.map((server) => {
					return <ServerCard key={server.id} server={server} />;
				})}
			</div>
		</ScrollArea>
	);
}
