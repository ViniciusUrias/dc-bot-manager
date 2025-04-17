import axiosInstance from "@/api/services/axios";
import { usePostV1Bots, usePutV1BotsBotid } from "@/gen";
import { Bot } from "@/types/prisma";
import { useQuery } from "@tanstack/react-query";

const useBot = ({ botId, serverId }: { botId?: string; serverId?: string }) => {
	const bot = useQuery({
		queryKey: ["bots", botId, serverId],
		experimental_prefetchInRender: true,
		enabled: !!botId,
		queryFn: async () => {
			const response = await axiosInstance.get<Bot>(`/bots/${botId}`);
			return response.data;
		},
	});
	const { mutateAsync: createBot } = usePostV1Bots();
	const { mutateAsync: updateBot } = usePutV1BotsBotid();
	const { refetch } = bot;
	const handleSync = async () => {
		await axiosInstance.put(`/bots/${botId}/sync`);
		refetch();
	};
	const startBot = async (bot: Bot, rf: boolean = true) => {
		await axiosInstance.post("/bots/start", {
			botId: bot.id,
		});
	};
	const stopBot = async (bot: Bot, rf: boolean = true) => {
		await axiosInstance.post("/bots/stop", {
			botId: bot.id,
		});
		if (rf) {
			refetch();
		}
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
