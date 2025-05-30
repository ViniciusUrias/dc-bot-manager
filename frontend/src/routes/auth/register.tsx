import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "@/components/register-form";

export const Route = createFileRoute("/auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<RegisterForm />
			</div>
		</div>
	);
}
