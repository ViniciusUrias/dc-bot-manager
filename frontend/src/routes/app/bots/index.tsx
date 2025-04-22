import BotForm from "@/components/Bot/bot-form";
import { DataTable } from "@/components/Bot/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useGetV1Bots } from "@/gen";
import { Bot } from "@/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useBot } from "@/hooks/useBots";
export const Route = createFileRoute("/app/bots/")({
	component: RouteComponent,
});

const ChangeRunningSwitch = ({ row }: { row: Row<Bot> }) => {
	const { startBot, stopBot } = useBot({});

	const isActive = row.original.active;
	return (
		<Switch
			onCheckedChange={() =>
				isActive ? stopBot({ data: { botId: row.original.id } }) : startBot({ data: { botId: row.original.id } })
			}
			checked={isActive}
			id="active"
		/>
	);
};
const columns: ColumnDef<Bot>[] = [
	{
		accessorKey: "name",
		header: "Name",
		id: "name",
	},
	{
		accessorKey: "server.name",
		header: "Server",
	},
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({ getValue, row }) => {
			return (
				<Avatar>
					<AvatarFallback>{row.getValue("name")?.slice(0, 2).toUpperCase()}</AvatarFallback>
					<AvatarImage src={getValue() as string} />
				</Avatar>
			);
		},
	},
	{
		accessorKey: "active",
		header: "Running",

		cell: ({ row }) => {
			return <ChangeRunningSwitch row={row} />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const bot = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(bot.token)}>Copy token</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link viewTransition to="/app/bots/$botId/details" params={{ botId: bot.id }}>
								Details
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Commands</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
function RouteComponent() {
	const { data, isLoading } = useGetV1Bots();
	const [open, setOpen] = useState(false);
	if (isLoading) return "...";
	return (
		<div className="flex flex-col gap-2">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="m-2 justify-self-end self-end">
						<Plus /> New bot
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Bot creation</DialogTitle>
						<DialogDescription>Create a new bot for your server</DialogDescription>
						<BotForm
							onFormSubmit={(values) => {
								setOpen(false);
							}}
						/>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<DataTable data={data?.data} columns={columns} />
		</div>
	);
}
