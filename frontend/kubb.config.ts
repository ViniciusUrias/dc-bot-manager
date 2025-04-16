import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
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
			clean: true,
		},
		plugins: [
			pluginOas(),
			pluginTs({
				group: {
					type: "tag",
					name: ({ group }) => `${group.toLowerCase()}`,
				},
				output: { barrelType: "named", path: "types" },
				transformers: {
					name(name, type) {
						const newName = `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
						if (type === "file") {
							return newName.replace("V1", "");
						}
						return newName;
					},
				},
			}),
			pluginZod({
				group: { type: "tag", name: ({ group }) => `${group?.toLowerCase()}` },
				transformers: {
					name: (name, type) => {
						if (type === "file") {
							return name.replace("V1", "");
						}
						return name;
					},
				},
			}),
			pluginReactQuery({
				output: {
					path: "./hooks",
				},
				group: {
					type: "tag",
					name: ({ group }) => `${group.toLowerCase()}`,
				},
				transformers: {
					name(name, type) {
						if (type === "file") {
							return name.replace("V1", "");
						}
						return name;
					},
				},
				client: {
					importPath: "../../../api/services/axios.ts",
					dataReturnType: "full",
				},
				mutation: {
					methods: ["post", "put", "delete"],
				},
				exclude: [
					{
						type: "tag",
						pattern: "undefined",
					},
				],
				query: {
					methods: ["get"],
					importPath: "@tanstack/react-query",
				},
				suspense: false,
			}),
		],
	};
});
