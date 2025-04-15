import { Routes } from "discord.js";
import fs from "fs-extra";
import path from "path";
import * as botManager from "./botManager";
const __dirname = import.meta.dirname;
export const registerCommand = async ({ botId, name, command, userId }) => {
	const { client, rest, config, commands } = botManager.getBotClient(botId);
	const { clientId, serverId } = config;
	console.log("registerCommand", { botId, name, command, userId, config });
	let tempFilePath = "";
	let pathWithFile = "";
	try {
		const newCommand = JSON.parse(command);

		tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", botId, "commands");

		console.log("tempFilePath", tempFilePath);
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
		client?.commands?.set(commandImport.data?.name, commandImport);
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
			`${commandName}.ts`
		);
		const commandImport = require(`${tempFilePath}?raw`);
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
		const oldFilePath = path.join(tempFilePath, `${oldName}.ts`);
		const newFilePath = path.join(tempFilePath, `${name}.ts`);
		console.log("tempFilePath", oldFilePath);
		if (fs.existsSync(oldFilePath)) {
			fs.rmSync(oldFilePath, { recursive: true });
		}
		fs.writeFileSync(newFilePath, newCommand, { encoding: "utf-8" });

		const commandImport = require(newFilePath).default;
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
