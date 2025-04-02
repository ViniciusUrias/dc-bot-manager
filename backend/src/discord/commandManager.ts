import { Routes } from "discord.js";
import fs from "fs-extra";
import path from "path";
import * as botManager from "./botManager";
export const registerCommand = async ({ botId, name, command }) => {
	const { client, rest, config, commands } = botManager.getBotClient(botId);
	const { clientId, userId, serverId } = config;
	let tempFilePath = "";
	let pathWithFile = "";
	try {
		const newCommand = JSON.parse(command);

		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");

		if (!fs.existsSync(tempFilePath)) {
			fs.mkdirSync(tempFilePath, { recursive: true });
		}
		pathWithFile = path.join(tempFilePath, `${name}.ts`);
		fs.writeFileSync(pathWithFile, newCommand, { encoding: "utf-8" });

		const commandImport = require(pathWithFile).default;
		if (!commandImport) {
			throw new Error("error writing file");
		}
		if (!commandImport?.data?.name || typeof commandImport.execute !== "function") {
			fs.unlinkSync(pathWithFile);

			throw new Error("Invalid command structure");
		}
		client.commands.set(commandImport.data?.name, commandImport);
		commands.set(commandImport.data?.name, commandImport);
		const commandData = commandImport.data.toJSON();

		// Register command with timeout

		const response = await Promise.race([
			rest.post(Routes.applicationGuildCommands(clientId, serverId), { body: commandData }),
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

export const deleteCommands = async ({ botId, serverId, userId }) => {
	let tempFilePath = "";
	try {
		const { client, rest, config, commands } = botManager.getBotClient(botId);
		const { clientId, userId, serverId } = config;
		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");
		fs.readdir(tempFilePath, (err, files) => {
			if (err) throw err;

			for (const file of files) {
				fs.unlink(path.join(tempFilePath, file), (err) => {
					if (err) throw err;
				});
			}
		});
		client?.commands?.clear();
		commands?.clear();

		const response = await rest.put(Routes.applicationGuildCommands(clientId, serverId), { body: [] });

		return response;
	} catch (error) {
		throw error;
	}
};
