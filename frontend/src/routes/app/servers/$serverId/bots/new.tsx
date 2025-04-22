import BotForm from "@/components/Bot/bot-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/servers/$serverId/bots/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BotForm />;
}
