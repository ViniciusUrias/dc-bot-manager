import ENDPOINTS from "@/api/endpoints";
import axiosInstance from "../axios";

export const handleAuthenticate = async (body) => {
	try {
		const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, body);
		return response.data;
	} catch (error) {
		throw new Error("Something went wrong while fetching users");
	}
};
export const registerAccount = async (body) => {
	try {
		const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, body);
		return response.data;
	} catch (error) {
		throw new Error("Something went wrong while fetching users");
	}
};
