import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export const Route = createFileRoute("/app")({
	component: RouteComponent,
});

function RouteComponent() {
	const t = authClient.useSession();
	console.log(t);

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
