import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Create a new router instance
const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: { queryClient: queryClient },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="@user-theme-pref">
			<div id="live-region" aria-live="polite" className="sr-only"></div>

			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<TanStackRouterDevtools router={router} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
