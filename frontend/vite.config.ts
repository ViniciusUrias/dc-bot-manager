import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite({ target: "react", autoCodeSplitting: true }), react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@backend-types": path.resolve(__dirname, "../backend/node_modules/discord.js"),
			path: "rollup-plugin-node-polyfills/polyfills/path",
		},
	},
});
