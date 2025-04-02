// controllers.ts
import * as botManager from "@/discord/botManager";
import { Request, Response } from "express";

export const startBotHandler = async (req: Request, res: Response) => {
	try {
		const { botId } = req.params;
		const config = req.body;

		if (!config.token || !config.clientId) {
			return res.status(400).json({ error: "Invalid bot configuration" });
		}

		const client = await botManager.startBot({ ...config, id: botId });
		res.json({
			success: true,
			botId,
			status: "running",
			guilds: client.guilds.cache.size,
		});
	} catch (error) {
		res.status(500).json({
			error: "Failed to start bot",
			details: error.message,
		});
	}
};

export const stopBotHandler = async (req: Request, res: Response) => {
	try {
		const { botId } = req.params;
		const success = await botManager.stopBot(botId);

		if (!success) {
			return res.status(404).json({ error: "Bot not found or already stopped" });
		}

		res.json({ success: true, botId, status: "stopped" });
	} catch (error) {
		res.status(500).json({
			error: "Failed to stop bot",
			details: error.message,
		});
	}
};

export const getBotStatusHandler = async (req: Request, res: Response) => {
	try {
		const { botId } = req.params;
		const client = botManager.getBotClient(botId);

		res.json({
			botId,
			status: client ? "running" : "stopped",
			guilds: client?.guilds.cache.size || 0,
		});
	} catch (error) {
		res.status(500).json({
			error: "Failed to get bot status",
			details: error.message,
		});
	}
};
