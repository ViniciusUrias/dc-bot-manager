import axiosInstance from "@/api/services/axios";
import {
	getV1BotsQueryKey,
	useGetV1BotsBotid,
	usePostV1Bots,
	usePostV1BotsStart,
	usePostV1BotsStop,
	usePutV1BotsBotid,
} from "@/gen";
import { Bot } from "@/types/prisma";
import { useQueryClient } from "@tanstack/react-query";

const useBot = ({ botId, serverId }: { botId?: string; serverId?: string }) => {
	const client = useQueryClient();
	const bot = useGetV1BotsBotid(botId, { query: { enabled: !!botId } });

	const { mutateAsync: createBot } = usePostV1Bots({
		mutation: {
			onSuccess() {
				client.invalidateQueries({ queryKey: getV1BotsQueryKey() });
			},
		},
	});
	const { mutateAsync: startBot } = usePostV1BotsStart({
		mutation: {
			onSuccess() {
				client.invalidateQueries({ queryKey: getV1BotsQueryKey() });
			},
		},
	});
	const { mutateAsync: stopBot } = usePostV1BotsStop({
		mutation: {
			onSuccess() {
				client.invalidateQueries({ queryKey: getV1BotsQueryKey() });
			},
		},
	});
	const { mutateAsync: updateBot } = usePutV1BotsBotid();
	const { refetch } = bot;
	const handleSync = async () => {
		await axiosInstance.put(`/bots/${botId}/sync`);
		refetch();
	};

	const deleteBot = async (bot: Bot) => {
		await axiosInstance.delete(`/bots/${bot.id}`);
		await refetch();
	};
	const deleteCommands = async (bot: Bot) => {
		await axiosInstance.delete(`/bots/${bot.id}/commands`);
	};

	return { bot, deleteBot, deleteCommands, createBot, updateBot, startBot, stopBot, handleSync };
};

export { useBot };
