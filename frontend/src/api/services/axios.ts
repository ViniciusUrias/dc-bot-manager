import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/v1",
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

export default axiosInstance;
