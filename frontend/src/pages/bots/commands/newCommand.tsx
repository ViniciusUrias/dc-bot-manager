import axiosInstance from "@/api/services/axios";
import BackButton from "@/components/back-button";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";

export default function NewCommand() {
	const { botId, serverId } = useParams();

	const { data } = useQuery({
		queryKey: ["bots", botId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/bots/${botId}`);
			return response.data;
		},
	});
	const [name, setName] = useState("");
	const handleTestCommand = async () => {
		console.log("JSSON", JSON.stringify(code));
		const response = await axiosInstance.post(`/bots/${botId}/commands`, {
			serverId: data.server?.serverid,
			command: JSON.stringify(code),
			name,
		});
	};
	const handleDeleteCommands = async () => {
		console.log("JSSON", JSON.stringify(code));
		const response = await axiosInstance.put(`/bots/${botId}/commands`, {
			serverId,
		});
	};
	const [code, setCode] = useState("");
	return (
		<div className="flex  gap-4 p-4">
			<div className="flex flex-col gap-4 h-full">
				<BackButton />
				<h1 className="text-2xl font-bold">New bot command</h1>
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Bot Name: {data?.name}</h2>
					<p>Bot Server: {data?.server?.name}</p>
				</div>
				<Input onChange={(e) => setName(e.target.value)} />
				<a
					className="text-blue-400 italic"
					target="_blank"
					href="https://discord.js.org/docs/packages/discord.js/14.18.0"
				>
					SEE: Discord api types
				</a>
				<div className="justify-self-end flex-1">
					<Button onClick={handleTestCommand}>Test command</Button>
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
				<Editor onChange={(code) => setCode(code as string)} />
			</div>
		</div>
	);
}
