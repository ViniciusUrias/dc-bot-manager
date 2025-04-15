// bot-manager.ts
import { fastify } from "@/index";
import { RESTGetCurrentApplicationResult } from "discord-api-types/v10";
import { Client, ClientOptions, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import EventEmitter from "events";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
type BotConfig = {
	id: string;
	token: string;
	clientId: string;
	serverId: string;
	userId: string;
	name: string;
};

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

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

export const startBot = async (config: BotConfig, clientConfig?: Partial<ClientOptions>): Promise<Client> => {
	if (activeBots.has(config.id)) {
		return activeBots.get(config.id)!.client;
	}

	const client = new Client({
		...clientConfig,
		intents: [GatewayIntentBits.Guilds],
		// intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	});
	console.log("CONFIG", config);
	const response = await client.login(config.token);
	console.log("response", response);
	const rest = new REST().setToken(config.token);
	const botState: BotState = {
		client,
		config,
		commands: new Map(),
		rest,
	};
	await getSavedCommands(botState);
	activeBots.set(config.id, botState);

	client.on("ready", (client) => {
		console.log(`BOT IS UP WITH ${botState.commands.size} COMMANDS SET!`);
		setupCommandHandlers(client, config.id);
		ev.emit("botEntered", config);
	});

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

	client.on("messageCreate", async (ev) => {
		console.log("MESSAGE", ev);
		await ev.reply("TESTE");
	});
	console.log("CLIENT", client);
	const channel = client.channels.cache.get("1355197976242295017");
	if (channel.isTextBased()) {
		channel.isSendable() && channel.send(`Hi, ${client.user?.username} is online! `);
	}
	client.on("message", async (ev) => {
		console.log("MESSAGE", ev);
		await ev.reply("TESTE");
	});
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isCommand()) return;

		const botState = activeBots.get(botId);
		if (!botState) return;

		const command = botState.commands.get(interaction.commandName);

		if (!command) {
			await interaction.reply("Command not registered! Check your files");
			return;
		}

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

export const getSavedCommands = async (bot: BotState) => {
	const {
		config: { serverId, userId, clientId },
	} = bot;
	console.log("BOT GET SAVED COMMANDS", bot.config);
	console.log("FULL PATH", __dirname, "users", userId, "servers", serverId, "bots", clientId, "commands");
	const tempFilePath = path.join(__dirname, "users", userId, "servers", serverId, "bots", clientId, "commands");
	console.log("TEMP FILE PATH", tempFilePath);
	if (!fs.existsSync(tempFilePath)) {
		return { error: "No commands found" };
		// fs.mkdirSync(tempFilePath, { recursive: true });
	}
	fs.readdir(tempFilePath, async (err, files) => {
		if (err) throw err;

		for (const file of files) {
			const pathWithFile = path.join(tempFilePath, file);
			const fileUrl = pathToFileURL(pathWithFile).href;

			const commandImport = (await import(fileUrl)).default;
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

export const botLoginWithToken = async (token: string) => {
	const client = new Client({
		presence: { status: "invisible" },

		intents: [GatewayIntentBits.Guilds],
		// intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	});

	await client.login(token);
	const rest = new REST().setToken(token);

	return { client, rest };
};
export const updateBotInfo = async (data: BotInfoRequest, token: string) => {
	try {
		const { client, rest } = await botLoginWithToken(token);

		const updated = await rest.patch(Routes.currentApplication(), { body: data });
		await client.destroy();
		return updated;
	} catch (error) {
		throw new Error("Error updating bot");
	}
};
export const getBotData = async (token: string): Promise<RESTGetCurrentApplicationResult> => {
	try {
		const { client, rest } = await botLoginWithToken(token);

		const updated: RESTGetCurrentApplicationResult = await rest.get(Routes.currentApplication());
		await client.destroy();

		return updated;
	} catch (error) {
		throw new Error("Error updating bot");
	}
};
