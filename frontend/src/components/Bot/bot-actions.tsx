import { useBot } from "@/hooks/useBots";
import { Bot } from "@/types/prisma";
import { FolderSync } from "lucide-react";
import { Button } from "../ui/button";

export default function BotActions({ bot }: { bot: Bot }) {
	const {
		bot: { data },
		handleSync,
		startBot,
		stopBot,
	} = useBot({ botId: bot.id });
	return (
		<div className="flex items-center gap-2">
			{bot.active ? (
				<Button className="w-fit" variant="destructive" onClick={() => stopBot(data!)}>
					Stop bot
				</Button>
			) : (
				<Button className="w-fit" onClick={() => startBot(data!)}>
					Start bot
				</Button>
			)}
			<Button variant={"success"} onClick={handleSync}>
				<FolderSync /> Sync bot
			</Button>
		</div>
	);
}
