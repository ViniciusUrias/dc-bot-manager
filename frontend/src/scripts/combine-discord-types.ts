// scripts/combine-discord-types.ts
import fs from "fs";
import path from "path";

const discordTypesDir = path.join(__dirname, "../backend/node_modules/discord.js/types");
const outputFile = path.join(__dirname, "../frontend/public/discord-types.d.ts");

const header = `// Combined Discord.js Type Definitions
declare module 'discord.js' {
`;

const footer = `}
`;

let combinedContent = header;

// Read and append all type files
fs.readdirSync(discordTypesDir).forEach((file) => {
	if (file.endsWith(".d.ts")) {
		const filePath = path.join(discordTypesDir, file);
		const content = fs.readFileSync(filePath, "utf-8");
		// Remove existing declare module wrappers
		const cleanedContent = content.replace(/declare module 'discord\.js' \{\n/, "").replace(/\}\n$/, "");
		combinedContent += cleanedContent;
	}
});

combinedContent += footer;

fs.writeFileSync(outputFile, combinedContent, "utf-8");
console.log("Combined type definitions created at:", outputFile);
