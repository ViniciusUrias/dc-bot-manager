import axios from "axios";
const baseurl = import.meta.env.VITE_BACKEND_URL || "localhost:3000";

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
declare const AXIOS_BASE: string;
declare const AXIOS_HEADERS: string;
export type RequestConfig<TData = unknown> = {
	url?: string;
	method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
	params?: unknown;
	data?: TData;
	responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";
	signal?: AbortSignal;
	headers?: AxiosRequestConfig["headers"];
};
/**
 * Subset of AxiosResponse
 */
export type ResponseConfig<TData = unknown> = {
	data: TData;
	status: number;
	statusText: string;
	headers?: AxiosResponse["headers"];
};
const axiosInstance = axios.create({
	baseURL: baseurl,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use((req) => {
	const token = localStorage.getItem("bearer");
	if (token) {
		req.headers["Authorization"] = `Bearer ${token}`;
	}

	return req;
});
export const client = async <TData, TError = unknown, TVariables = unknown>(
	config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
	const promise = axiosInstance
		.request<TVariables, ResponseConfig<TData>>({ ...config })
		.catch((e: AxiosError<TError>) => {
			throw e;
		});

	return promise;
};
export default axiosInstance;
