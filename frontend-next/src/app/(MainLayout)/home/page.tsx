import { auth } from "@/auth";

export default async function HomePage() {
	const session = await auth();
	if (!session?.user) return null;
	console.log("SESSION", session);
	// const user = await verifySession();
	// const b = await fetch("http://localhost:3000/v1/auth/verify", { credentials: "include" });

	// if (!b) {
	// 	return "no user";
	// }
	return (
		<div>
			<span>
				{session.user.name}
				{session.user.id}
				{session.user.email}
			</span>
		</div>
	);
}
