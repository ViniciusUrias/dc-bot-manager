import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
	const sessionToken = await cookies();
	const token = sessionToken.get("authToken")?.value;
	if (!token) return null;
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
		headers: {
			Cookie: `authToken=${token}`,
			// Authorization: `Bearer ${sessionToken}`,
		},
	});

	if (!response?.ok) {
		redirect("/login");
	}
	const user = await response.json();
	return user;
});
