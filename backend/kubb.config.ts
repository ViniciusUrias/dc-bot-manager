import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
export default defineConfig(() => {
	return {
		root: ".",
		input: {
			path: "./swagger.yaml",
		},
		output: {
			path: "./src/gen",
		},
		plugins: [
			pluginOas(),
			pluginTs(),
			pluginZod({
				group: { type: "tag", name: ({ group }) => `${group?.toLowerCase()}-schemas` },
			}),
		],
	};
});
