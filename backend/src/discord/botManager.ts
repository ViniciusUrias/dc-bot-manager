// bot-manager.ts
import { fastify } from "@/index";
import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import EventEmitter from "events";
import fs from "fs-extra";
import path from "path";
type BotConfig = {
	id: string;
	token: string;
	clientId: string;
	serverId: string;
	userId: string;
	name: string;
};

type CommandDefinition = {
	data: any;
	execute: (interaction: any) => Promise<void>;
};

type BotState = {
	client: Client;
	config: BotConfig;
	commands: Map<string, CommandDefinition>;
	rest: REST;
};
const ev = new EventEmitter();
ev.on("botEntered", (bot) => {
	console.log("NEW BOT ENTERED", bot);
});
ev.on("botLeaved", (bot) => {
	console.log("BOT LEAVED", bot);
});

const activeBots: Map<string, BotState> = new Map();

export const startBot = async (config: BotConfig): Promise<Client> => {
	if (activeBots.has(config.id)) {
		return activeBots.get(config.id)!.client;
	}

	const client = new Client({
		intents: [GatewayIntentBits.Guilds],
		// intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	});

	await client.login(config.token);
	const rest = new REST().setToken(config.token);
	const botState: BotState = {
		client,
		config,
		commands: new Map(),
		rest,
	};
	getSavedCommands(botState);
	activeBots.set(config.id, botState);

	client.on("ready", (client) => {
		console.log(`BOT IS UP ${client.commands} ready!`);
	});

	setupCommandHandlers(client, config.id);
	ev.emit("botEntered", config);
	return client;
};

export const stopBot = async (botId: string): Promise<boolean> => {
	const botState = activeBots.get(botId);
	if (!botState) return false;

	await botState.client.destroy();
	activeBots.delete(botId);
	return true;
};

export const registerCommands = (botId: string, commands: CommandDefinition[]) => {
	const botState = activeBots.get(botId);
	if (!botState) throw new Error(`Bot ${botId} not found`);

	commands.forEach((cmd) => {
		botState.commands.set(cmd.data.name, cmd);
	});
};

const setupCommandHandlers = (client: Client, botId: string) => {
	client.on("presenceUpdate", (presence) => {
		if (presence.status === "offline") {
			fastify.prisma.bot.update({ where: { id: botId }, data: { active: false } });
		}
		if (presence.status === "online") {
			fastify.prisma.bot.update({ where: { id: botId }, data: { active: true } });
		}
	});
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isCommand()) return;

		const botState = activeBots.get(botId);
		if (!botState) return;

		const command = botState.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing command ${interaction.commandName}:`, error);
			await interaction.reply({
				content: "There was an error executing this command!",
				ephemeral: true,
			});
		}
	});
};

export const getBotClient = (botId: string): BotState | undefined => {
	return activeBots.get(botId);
};

export const getActiveBots = (): Map<string, BotState> => {
	return new Map(activeBots);
};

export const getSavedCommands = (bot: BotState) => {
	const {
		config: { serverId, userId, clientId },
	} = bot;
	const tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", clientId, "commands");
	if (!fs.existsSync(tempFilePath)) {
		fs.mkdirSync(tempFilePath, { recursive: true });
	}
	fs.readdir(tempFilePath, (err, files) => {
		if (err) throw err;

		for (const file of files) {
			const commandImport = require(path.join(tempFilePath, file)).default;
			// fs.unlinkSync(pathWithFile);
			console.log("FILE", file);
			bot.commands.set(commandImport.data?.name, commandImport);
		}
	});
};

export type BotInfoRequest = {
	description?: string;
	/**
	 * data:image/png;base64,...
	 */
	icon?: string;
	name?: string;
	tags?: string[];
};
export const updateBotInfo = async (data: BotInfoRequest, token: string) => {
	try {
		const client = new Client({
			intents: [GatewayIntentBits.Guilds],
			// intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
		});

		await client.login(token);
		const rest = new REST().setToken(token);

		const updated = await rest.patch(Routes.currentApplication(), { body: data });
		return updated;
	} catch (error) {
		throw new Error("Error updating bot");
	}
};
