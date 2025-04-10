import Header from "@/components/Header";
import { authClient } from "@/lib/auth";
import { Outlet } from "react-router";

export default function MainLayout() {
	const t = authClient.useSession();
	console.log(t);
	// if (!user) {
	// 	return <Navigate to="/auth/sign-in" replace />;
	// }
	return (
		<div className="bg-primary-foreground h-screen w-screen overflow-y-auto">
			<Header />
			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">
				<Outlet />
			</main>
		</div>
	);
}
