import axiosInstance from "@/api/services/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { AutoTypings, JsDelivrSourceResolver, LocalStorageCache } from "monaco-editor-auto-typings";
import { useRef, useState } from "react";
import { useParams } from "react-router";

const snippet = `import { SlashCommandBuilder, CommandInteraction, Command } from "discord.js";
declare module "discord.js" {
	interface Client {
		commands: Collection<string, any>;
	}
}
// creating a slash command to be used like /user
export default {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Provides information about the user."),
  async execute(interaction: CommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      \`This command was run by \${interaction.client?.commands?.values()}, who joined on \${interaction.member.joinedAt}.\`
    );
  },
};


`;

export default function NewCommand() {
	const { botId, serverId } = useParams();
	const monaco = useMonaco();
	const editorRef = useRef(null);

	const [code, setCode] = useState(snippet);

	const handleEditorMount: OnMount = (monacoEditor, monaco) => {
		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.ES2016,
			allowNonTsExtensions: true,
			moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			allowSyntheticDefaultImports: true,

			module: monaco.languages.typescript.ModuleKind.CommonJS,
			noEmit: true,
			typeRoots: ["node_modules/@types"],
		});
		editorRef.current = monacoEditor;
		monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: false,
			noSyntaxValidation: true,
		});
		AutoTypings.create(monacoEditor!, {
			sourceCache: new LocalStorageCache(), // Cache loaded sources in localStorage. May be omitted
			// Other options...
			monaco: monaco,
			preloadPackages: true,
			versions: { "discord.js": "^14.18.0" },
			sourceResolver: new JsDelivrSourceResolver(),
		});
	};
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
			serverId,
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
	return (
		<div className="flex  gap-4 p-4">
			<div className="flex flex-col gap-4 h-full">
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
				<Editor
					className="h-full w-full"
					onMount={handleEditorMount}
					onChange={(code) => setCode(code as string)}
					value={code}
					height="70dvh"
					theme="vs-dark"
					defaultLanguage="typescript"
				/>
			</div>
		</div>
	);
}
