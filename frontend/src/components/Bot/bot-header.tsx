import { Bot } from "@/types/prisma";

export default function BotHeader({ bot }: { bot: Bot }) {
	return (
		<div className="flex  items-end gap-2">
			<h2 className=" font-semibold"> Name: {bot?.name} |</h2>
			<p> Server: {bot?.server?.name} |</p>
			<p> ID: {bot?.id} |</p>
			<p> Prefix: {bot?.prefix}</p>
		</div>
	);
}
