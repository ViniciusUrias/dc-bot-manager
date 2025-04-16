import axiosInstance from "@/api/services/axios";
import { Server } from "@/types/prisma";

const useServers = ({ serverId }: { serverId?: string }) => {
	const deleteServer = async (server: Server) => {
		await axiosInstance.delete(`/servers/${server.id}`);
	};
	const createServer = async (server: Server) => {
		await axiosInstance.post(`/servers`);
	};
	const editServer = async (server: Server) => {
		await axiosInstance.put(`/servers/${server.id}`, server);
	};

	return { deleteServer, createServer, editServer };
};

export { useServers };
