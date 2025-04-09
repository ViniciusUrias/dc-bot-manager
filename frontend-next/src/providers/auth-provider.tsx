// src/context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
type User = {
	id: string;
	email: string;
	name?: string;
} | null;

type AuthContextType = {
	user: User;
	isLoading: boolean;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser?: User }) {
	const [user, setUser] = useState<User>(initialUser || null);
	const [isLoading, setIsLoading] = useState(!initialUser);
	const router = useRouter();

	// Hydrate client-side with server-side data
	useEffect(() => {
		if (user?.id) return;
		if (initialUser) {
			setUser(initialUser);
			setIsLoading(false);
		} else {
			// If no initial user, check session
			checkSession();
		}
	}, [initialUser, user]);

	const checkSession = async () => {
		try {
			const response = await getSession();
			console.log("RESPONSE", response);
			const userData = response;
			setUser(userData);
		} catch (error) {
			console.error("Session check failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			setUser(null);
			router.push("/login");
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>;
}
