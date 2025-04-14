import axiosInstance from "@/api/services/axios";
import { Bot } from "@/types/prisma";
import { useQuery } from "@tanstack/react-query";

const useBot = ({ botId }: { botId?: string }) => {
	const bot = useQuery({
		queryKey: ["bots", botId],
		experimental_prefetchInRender: true,
		enabled: !!botId,
		queryFn: async () => {
			const response = await axiosInstance.get<Bot>(`/bots/${botId}`);
			return response.data;
		},
	});
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
	const createBot = async (bot: Bot) => {
		await axiosInstance.post(`/bots`, bot);
		await refetch();
	};
	const editBot = async (botId: string, body: Partial<Bot>) => {
		await axiosInstance.put(`/bots/${botId}`, body);
		await refetch();
	};

	return { bot, deleteBot, deleteCommands, createBot, editBot, startBot, stopBot, handleSync };
};

export { useBot };
