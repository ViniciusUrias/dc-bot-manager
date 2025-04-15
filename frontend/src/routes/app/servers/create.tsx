import { createFileRoute } from "@tanstack/react-router";
import ServerCreate from "@/components/server-create";

export const Route = createFileRoute("/app/servers/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ServerCreate />;
}
