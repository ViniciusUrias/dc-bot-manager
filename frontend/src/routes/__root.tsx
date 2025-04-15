import * as React from "react";
import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/auth/login">Start Over</Link>
			</div>
		);
	},
});

function RootComponent() {
	return (
		<React.Fragment>
			<Outlet />
		</React.Fragment>
	);
}
