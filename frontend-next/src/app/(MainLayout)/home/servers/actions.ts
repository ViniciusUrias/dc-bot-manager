"use server";
import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";
export async function getServers() {
	try {
		const response = await apiClient("/servers", { next: { tags: ["servers"] } });
		const body = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: "Invalid credentials",
				message: body.message,
			};
		}

		return body;
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}

export async function getServersById(id: string) {
	try {
		const response = await apiClient(`/servers/${id}`, { next: { tags: ["servers", id] } });
		const body = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: "Invalid credentials",
				message: body.message,
			};
		}

		return body;
	} catch (error) {
		return { success: false, error: "Network error", message: error.message };
	}
}
export async function updateServer(formData: FormData) {
	const id = formData.get("id") as string;
	try {
		const response = await apiClient(`/servers/${id}`, {
			method: "PUT",
			body: formData,
			next: { tags: ["servers", id] },
		});
		const res = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: "Invalid credentials",
				message: res.message,
			};
		}
		revalidatePath("/servers");

		return res;
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}
export async function createBot(formData: FormData) {
	const data = Object.fromEntries(formData);
	// data.tags = data.tags.split(",").map((e) => e);
	// data.icon = avatarUrl;
	console.log(data);

	try {
		const response = await apiClient("/bots", { method: "POST", body: formData });

		// await apiClient(`/servers/${id}`, {
		// 	method: "PUT",
		// 	body: formData,
		// 	next: { tags: ["servers", id] },
		// });
		const res = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: "Invalid credentials",
				message: res.message,
			};
		}
		revalidatePath("/servers");

		return res;
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}
