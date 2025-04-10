import axiosInstance from "@/api/services/axios";
import { User } from "@/types/user";
import { StateCreator } from "zustand";

export interface AuthState {
	user: User | null;
	signIn: ({ username, password }: { username: string; password: string }) => void;
	signOut: () => void;
	setUser: (user: any) => void;
}

export const createAuthStore: StateCreator<AuthState> = (set) => ({
	user: null,
	setUser: (user) => set({ user }),
	signIn: async (data) => {
		localStorage.setItem("bearer", data.token);
		const response = await axiosInstance.get("/users/me");
		return set(() => ({
			user: { ...response.data },
		}));
	},

	signOut: () => set({ user: null }),
});
