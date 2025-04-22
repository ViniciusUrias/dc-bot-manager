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
		deleteBot,
		deleteCommands,
	} = useBot({ botId: bot.id });
	return (
		<div className="flex items-center gap-2">
			{bot.active ? (
				<Button className="w-fit" variant="destructive" onClick={() => stopBot({ data: { botId: bot.id } })}>
					Stop bot
				</Button>
			) : (
				<Button className="w-fit" variant="success" onClick={() => startBot({ data: { botId: bot.id } })}>
					Start bot
				</Button>
			)}
			<Button variant={"secondary"} onClick={handleSync}>
				<FolderSync /> Sync bot
			</Button>
			<Button variant="destructive" onClick={() => deleteCommands(data)}>
				Delete commands
			</Button>
		</div>
	);
}
