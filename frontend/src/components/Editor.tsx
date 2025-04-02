import axiosInstance from "@/api/services/axios";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { AutoTypings, JsDelivrSourceResolver, LocalStorageCache } from "monaco-editor-auto-typings";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const snippet = `import { SlashCommandBuilder } from "discord.js";

// creating a slash command to be used like /user
const command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      \`This command was run by \${interaction.user.username}, who joined on \${interaction.member.joinedAt}.\`
    );
  },
};

export default command;
`;

export default function EditorComponent() {
	const { botId, serverId } = useParams();
	const monaco = useMonaco();
	const editorRef = useRef(null);

	const [code, setCode] = useState(snippet);
	useEffect(() => {
		const configureEditor = async () => {
			monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);

			// monaco?.languages.typescript.typescriptDefaults.addExtraLib(
			// 	customLibTypes,
			// 	"file:///node_modules/@types/discord/index.d.ts"
			// );
			monaco?.languages.typescript.typescriptDefaults.setCompilerOptions({
				...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				jsx: "react" as any,
				lib: ["dom", "esnext"],
				moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
				allowSyntheticDefaultImports: true,
			});
			// monaco?.languages.typescript.javascriptDefaults.setCompilerOptions({
			// 	target: monaco.languages.typescript.ScriptTarget.ESNext,
			// 	allowNonTsExtensions: true,
			// 	typeRoots: ["node_modules/@types"],
			// 	moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			// });
			// monaco?.languages.typescript.typescriptDefaults.addExtraLib(
			// 	"declare module 'test/file2' { export interface Test {} }",
			// 	"file:///node_modules/@types/test/file2.d.ts"
			// );
		};
		configureEditor();
		if (monaco) {
			console.log("here is the monaco instance:", monaco);
			const ed = monaco?.editor.create(document.querySelector("#editor")!, {
				model: monaco?.editor.createModel(snippet, "typescript"),
				theme: "vs-dark",
				language: "typescript",
			});
			monaco?.editor.getEditors();
			const cache = new LocalStorageCache();
			AutoTypings.create(monaco?.editor.getEditors()[0]!, {
				sourceCache: cache, // Cache loaded sources in localStorage. May be omitted
				// Other options...
				monaco: monaco,
				preloadPackages: true,
				versions: { "discord.js": "^14.18.0" },
				sourceResolver: new JsDelivrSourceResolver(),
			});
		}
	}, [monaco]);

	const { data } = useQuery({
		queryKey: ["bots", botId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/bots/${botId}`);
			return response.data;
		},
	});
	console.log(code);
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">New bot command</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Bot Name: {data?.name}</h2>
				<p>Bot Server: {data?.server?.name}</p>
			</div>

			<div className="flex justify-between gap-2 items-center">
				<h2 className="text-xl font-semibold">New command</h2>
			</div>
			<a
				className="text-blue-400 italic"
				target="_blank"
				href="https://discord.js.org/docs/packages/discord.js/14.18.0"
			>
				SEE: Discord api types
			</a>
			<Editor
				onMount={(r, f) => (editorRef.current = r)}
				onChange={setCode}
				value={code}
				theme="vs-dark"
				height="50vh"
				defaultLanguage="typescript"
			/>
		</div>
	);
}
