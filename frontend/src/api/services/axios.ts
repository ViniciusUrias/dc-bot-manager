import axios from "axios";
const baseurl = import.meta.env.BACKEND_URL || "localhost:3000/v1";
console.log(import.meta.env.BACKEND_URL);
console.log("baseurl", baseurl);
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

export default axiosInstance;
