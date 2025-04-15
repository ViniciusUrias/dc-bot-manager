import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/servers")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Outlet />
		</>
	);
}
