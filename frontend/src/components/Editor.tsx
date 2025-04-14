import { Editor, OnMount } from "@monaco-editor/react";
import { AutoTypings, JsDelivrSourceResolver, LocalStorageCache } from "monaco-editor-auto-typings";
import { useEffect, useRef, useState } from "react";
console.log("ajuste");
const snippet = `import { SlashCommandBuilder, CommandInteraction, Collection } from "discord.js";
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

export default function EditorComponent({
	onChange,
	defaultValue,
	...rest
}: {
	onChange: (code: string) => void;
	defaultValue?: string;
}) {
	const editorRef = useRef(null);
	const [code, setCode] = useState(defaultValue ?? snippet);
	useEffect(() => {
		setCode(defaultValue ?? snippet);
	}, [defaultValue]);
	const cache = new LocalStorageCache();
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
			sourceCache: cache,
			// Other options...
			monaco: monaco,
			preloadPackages: true,
			versions: { "discord.js": "^14.18.0" },
			sourceResolver: new JsDelivrSourceResolver(),
			fileRecursionDepth: 5,
			shareCache: true,
			packageRecursionDepth: 2,
		});
	};
	return (
		<Editor
			{...rest}
			className="h-full w-full"
			onMount={handleEditorMount}
			onChange={(code) => {
				setCode(code as string);
				onChange(code as string);
			}}
			value={code}
			height="70dvh"
			theme="vs-dark"
			defaultLanguage="typescript"
		/>
	);
}
