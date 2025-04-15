import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-primary/80 ">
			<main className=" rounded-md flex flex-col max-h-full  overflow-auto mx-20  ">
				<Outlet />
			</main>
		</div>
	);
}
