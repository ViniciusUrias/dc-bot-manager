import Header from "@/components/header";
import { authClient } from "@/lib/auth";
import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout() {
	const t = authClient.useSession();
	console.log(t);
	// if (!user) {
	// 	return <Navigate to="/auth/sign-in" replace />;
	// }
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<Header />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
// export default function MainLayout() {
// 	const t = authClient.useSession();
// 	console.log(t);
// 	// if (!user) {
// 	// 	return <Navigate to="/auth/sign-in" replace />;
// 	// }
// 	return (
// 		<div className="bg-primary-foreground h-screen w-screen overflow-y-auto">
// 			<Header />
// 			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">
// 				<Outlet />
// 			</main>
// 		</div>
// 	);
// }
