import { verifySession } from "@/lib/dal";
export default async function HomePage() {
	const user = await verifySession();
	console.log("USER", user);
	if (!user) {
		return "no user";
	}
	return (
		<div>
			<span>{JSON.stringify(user, null, 2)}</span>
		</div>
	);
}
