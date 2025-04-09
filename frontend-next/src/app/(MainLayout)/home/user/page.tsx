"use client";
import { authClient } from "@/lib/better-auth";

export default function UserPage() {
	const { data } = authClient.useSession();

	return <div>oi, {data?.user?.name}</div>;
}
