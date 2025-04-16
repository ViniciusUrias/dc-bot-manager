import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: () => {
		redirect({ to: "/auth/login", throw: true });
	},
});

function RouteComponent() {
	return <div>Hello "/"!</div>;
}
