import BackButton from "@/components/back-button";
import BotActions from "@/components/Bot/bot-actions";
import BotForm from "@/components/Bot/bot-form";
import BotHeader from "@/components/Bot/bot-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBot } from "@/hooks/useBots";
import { cn } from "@/lib/utils";
import { Check, LucidePlus, X } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";

import { z } from "zod";
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	tags: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	icon: z
		.string()
		.min(2, {
			message: "Username must be at least 2 characters.",
		})
		.optional()
		.nullable(),
	description: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});
export default function BotDetails() {
	const { botId, serverId } = useParams();
	const nav = useNavigate();

	const {
		bot: { data, isLoading },
		deleteCommands,
	} = useBot({ botId });

	if (isLoading) return "...";
	return (
		<div className="flex flex-col gap-4 p-4">
			<Card>
				<CardHeader>
					<BackButton />
					<BotHeader bot={data!} />
				</CardHeader>
				<CardContent>
					<div className="my-2">
						<BotActions bot={data!} />
					</div>
					<BotForm bot={data!} />
				</CardContent>
			</Card>

			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold flex-1">Commands</h2>
				<Button variant="outline" onClick={() => deleteCommands(data!)}>
					<X className="h-6 w-6 text-destructive" />
					Delete all
				</Button>
				<NavLink to={`/home/servers/${serverId}/bots/${botId}/commands/new`}>
					<Button variant="outline">
						<LucidePlus className="h-6 w-6 text-primary" />
						New
					</Button>
				</NavLink>
			</div>
			<div className="w-full min-h-[100px] max-h-[75vh]  grid grid-cols-2 p-2 gap-2 rounded-md border">
				{data?.commands?.map((command) => {
					return (
						<NavLink
							key={command.id}
							viewTransition
							className="transition-all  focus:scale-105  focus:ring-2 "
							to={`/home/servers/${serverId}/bots/${botId}/commands/${command.name}`}
							state={{ command }}
						>
							<Card className={cn(`transition-transform`)}>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle aria-label={`Album title: ${command.name}`}>{command.name}</CardTitle>
								</CardHeader>
								<CardContent className="flex items-center gap-2">
									<span>Enabled:</span>
									<span>{command?.enabled ? <Check /> : <X />}</span>
								</CardContent>
							</Card>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}
