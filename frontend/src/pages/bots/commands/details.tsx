import axiosInstance from "@/api/services/axios";
import BackButton from "@/components/back-button";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBot } from "@/hooks/useBots";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

export default function CommandDetails() {
	const { botId, serverId, commandName } = useParams();
	const { state } = useLocation();
	const navigate = useNavigate();
	const { bot } = useBot({ botId });
	const [code, setCode] = useState("");
	const [name, setName] = useState("");

	const { data, isLoading } = useQuery({
		queryKey: ["bots", botId, "commands", commandName],
		queryFn: async () => {
			const response = await axiosInstance.get(`/bots/${botId}/commands/${commandName}`);
			return response.data;
		},
	});
	useEffect(() => {
		if (data) {
			setCode(data.command);
			setName(commandName);
		}
	}, [data, commandName]);
	const handleTestCommand = async () => {
		console.log("JSSON", JSON.stringify(code));
		const response = await axiosInstance.put(`/bots/${botId}/commands/${commandName}`, {
			command: JSON.stringify(code),
			name,
			commandId: state?.command?.id,
		});
		navigate({ pathname: `/home/servers/${serverId}/bots/${botId}/commands/${name}` });
	};
	const handleDeleteCommands = async () => {
		console.log("JSSON", JSON.stringify(code));
		const response = await axiosInstance.put(`/bots/${botId}/commands`, {
			serverId,
		});
	};
	if (isLoading) return "...";
	return (
		<div className="flex  gap-4 p-4">
			<div className="flex flex-col gap-4 h-full">
				<BackButton />
				<h1 className="text-2xl font-bold">Command details</h1>
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Bot Name: {bot.data?.name}</h2>
					<p>Bot Server: {bot.data?.server?.name}</p>
				</div>
				<Input onChange={(e) => setName(e.target.value)} value={name} />
				<a
					className="text-blue-400 italic"
					target="_blank"
					href="https://discord.js.org/docs/packages/discord.js/14.18.0"
				>
					SEE: Discord api types
				</a>
				<div className="justify-self-end flex-1">
					<Button onClick={handleTestCommand}>Update</Button>
				</div>
				<div className="justify-self-end flex-1">
					<Button variant="destructive" onClick={handleDeleteCommands}>
						Delete all commands
					</Button>
				</div>
			</div>
			<div className="flex flex-1 flex-col">
				<p className="text-center">
					NOTE: you should always export a default object with <span className="italic font-semibold">data </span> and{" "}
					<span className="italic  font-semibold">async execute</span> props
				</p>
				<Editor onChange={(code) => setCode(code as string)} defaultValue={code} />
			</div>
		</div>
	);
}
