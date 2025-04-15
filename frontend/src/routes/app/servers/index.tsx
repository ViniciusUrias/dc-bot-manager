import ServerList from "@/components/server-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/servers/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<ServerList />
		</div>
	);
}
