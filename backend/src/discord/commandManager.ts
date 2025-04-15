import { Routes } from "discord.js";
import fs from "fs-extra";
import path from "path";
import * as botManager from "./botManager";
import { fileURLToPath, pathToFileURL } from "url";
const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

export const registerCommand = async ({ botId, name, command, userId }) => {
	const { client, rest, config, commands } = botManager.getBotClient(botId);
	const { clientId, serverId } = config;

	let tempFilePath = "";
	let pathWithFile = "";

	try {
		// Ensure the command is properly formatted as a string
		const commandContent = typeof command === "string" ? JSON.parse(command) : command;

		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");

		if (!fs.existsSync(tempFilePath)) {
			fs.mkdirSync(tempFilePath, { recursive: true });
		}

		pathWithFile = path.join(tempFilePath, `${name}.js`);

		// Write the file with proper ES Module syntax if it's not already present
		if (!fs.existsSync(pathWithFile) || true) {
			// Always overwrite for this example
			fs.writeFileSync(pathWithFile, commandContent, { encoding: "utf-8" });
			console.log("File content:", fs.readFileSync(pathWithFile, "utf-8"));
		}

		// Convert path to file URL and import
		const fileUrl = pathToFileURL(pathWithFile).href;
		const commandModule = await import(fileUrl);

		if (!commandModule || !commandModule.default) {
			console.error("Module contents:", commandModule);
			throw new Error("Command file doesn't have a default export");
		}
		const commandImport = commandModule.default;

		if (!commandImport) {
			throw new Error("Command file doesn't have a default export");
		}

		if (!commandImport?.data?.name || typeof commandImport.execute !== "function") {
			throw new Error("Invalid command structure - missing data.name or execute function");
		}

		// Register the command
		client?.commands?.set(commandImport.data.name, commandImport);
		commands.set(commandImport.data.name, commandImport);

		const commandData = commandImport.data.toJSON();
		const response = await rest.post(Routes.applicationGuildCommands(clientId, serverId), { body: commandData });

		return response;
	} catch (error) {
		if (pathWithFile && fs.existsSync(pathWithFile)) {
			// fs.unlinkSync(pathWithFile);
		}
		console.error("Command creation failed:", error);
		throw error;
	}
};

export const deleteCommands = async ({ botId, serverId, userId, botToken }) => {
	let tempFilePath = "";
	try {
		const { client, rest } = await botManager.botLoginWithToken(botToken);

		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");
		if (!fs.existsSync(tempFilePath)) {
			const response = await rest.put(Routes.applicationGuildCommands(client.application.id, serverId), { body: [] });

			return { message: "No commands to delete" };
		}
		fs.readdir(tempFilePath, (err, files) => {
			if (err) throw err;

			for (const file of files) {
				fs.unlink(path.join(tempFilePath, file), (err) => {
					if (err) throw err;
				});
			}
		});
		client?.commands?.clear();

		const response = await rest.put(Routes.applicationGuildCommands(client.application.id, serverId), { body: [] });

		return response;
	} catch (error) {
		throw error;
	}
};
export const getCommand = async ({ botId, commandName, serverId, userId }) => {
	let tempFilePath = "";
	try {
		let file = "";
		tempFilePath = path.join(
			__dirname,
			"users",
			userId,
			"servers",
			serverId,
			"bots",
			botId,
			"commands",
			`${commandName}.js`
		);
		const fileUrl = pathToFileURL(tempFilePath).href;

		const commandImport = await import(fileUrl);
		console.log("commandImport", commandImport.default);
		file = fs.readFileSync(tempFilePath, "utf-8");
		// file = commandImport;
		return file;
	} catch (error) {
		throw error;
	}
};

export const updateCommand = async ({ botId, oldName, name, command, userId, serverId, botToken }) => {
	const { client, rest } = await botManager.botLoginWithToken(botToken);

	let tempFilePath = "";
	let pathWithFile = "";
	try {
		const newCommand = JSON.parse(command);

		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");
		const oldFilePath = path.join(tempFilePath, `${oldName}.js`);
		const newFilePath = path.join(tempFilePath, `${name}.js`);
		console.log("tempFilePath", oldFilePath);
		if (fs.existsSync(oldFilePath)) {
			fs.rmSync(oldFilePath, { recursive: true });
		}
		fs.writeFileSync(newFilePath, newCommand, { encoding: "utf-8" });

		const commandImport = (await import(newFilePath)).default;
		if (!commandImport) {
			throw new Error("error writing file");
		}
		if (!commandImport?.data?.name || typeof commandImport.execute !== "function") {
			fs.unlinkSync(newFilePath);

			throw new Error("Invalid command structure");
		}
		client?.commands?.set(commandImport.data?.name, commandImport);
		const commandData = commandImport.data.toJSON();

		// Register command with timeout

		const response = await Promise.race([
			rest.post(Routes.applicationGuildCommands(botId, serverId), { body: commandData }),
			new Promise((_, reject) => setTimeout(() => reject(new Error("Command registration timeout")), 5000)),
		]);
		return response;
	} catch (error) {
		// Clean up temp file if still exists
		if (pathWithFile && fs.existsSync(pathWithFile)) {
			fs.unlinkSync(pathWithFile);
		}
		console.error("Command creation failed:", error);
		throw error;
	}
};
