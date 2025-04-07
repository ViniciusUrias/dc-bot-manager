import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
	const sessionToken = await cookies();
	const token = sessionToken.get("session_token")?.value;
	console.log("TOKEN", token);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
		headers: { Cookie: `session_token=${token}` },
	});

	if (!response?.ok) {
		redirect("/login");
	}
	const user = await response.json();
	return { isAuth: true, user };
});
