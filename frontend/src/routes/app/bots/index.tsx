import BotForm from "@/components/Bot/bot-form";
import { useGetV1Bots } from "@/gen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/bots/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isLoading } = useGetV1Bots();
	if (isLoading) return "...";
	return (
		<div>
			{JSON.stringify(data?.data, null, 2)}

			<BotForm />
		</div>
	);
}
