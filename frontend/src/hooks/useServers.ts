import axiosInstance from "@/api/services/axios";
import { Server } from "@/types/prisma";
import { useQuery } from "@tanstack/react-query";

const useServers = ({ serverId }: { serverId?: string }) => {
	const servers = useQuery({
		queryKey: ["servers"],
		queryFn: async () => {
			const response = await axiosInstance.get<Server[]>("/servers");
			return response.data;
		},
	});
	const { refetch } = servers;
	const deleteServer = async (server: Server) => {
		await axiosInstance.delete(`/servers/${server.id}`);
		await refetch();
	};
	const createServer = async (server: Server) => {
		await axiosInstance.post(`/servers`);
		await refetch();
	};
	const editServer = async (server: Server) => {
		await axiosInstance.put(`/servers/${server.id}`, server);
		await refetch();
	};

	return { servers, deleteServer, createServer, editServer };
};

export { useServers };
