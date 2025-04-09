"use client";
import { useAuth } from "@/providers/auth-provider";

export default function UserPage() {
	const user = useAuth();

	return <div>oi, {user.user?.name}</div>;
}
