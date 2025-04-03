import AuthLayout from "@/layouts/auth";
import MainLayout from "@/layouts/main";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import NewCommand from "@/pages/bots/commands/newCommand";
import BotDetails from "@/pages/bots/details";
import NewBot from "@/pages/bots/newbot";
import NotFound from "@/pages/errors/NotFound";
import HomePage from "@/pages/home";
import ServersPage from "@/pages/servers";
import ServerCreate from "@/pages/servers/create";
import ServerDetails from "@/pages/servers/details";
import { createBrowserRouter, RouterProvider } from "react-router";
const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthLayout />,
		ErrorBoundary: NotFound,
		children: [
			{ path: "sign-in", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
		],
	},
	{
		path: "/",
		element: <MainLayout />,
		ErrorBoundary: NotFound,

		children: [
			{
				path: "home",
				children: [
					{ index: true, element: <HomePage /> }, // Matches "/users"

					{
						path: "servers",
						children: [
							{ index: true, element: <ServersPage /> }, // Matches "/users/:userId/albums"
							{ path: "create", element: <ServerCreate /> }, // Matches "/users/:userId/albums"
							{
								path: ":serverId",
								element: <ServerDetails />,
							},
						],
					},
					{ path: "servers/:serverId/bots/:botId", element: <BotDetails /> },
					{ path: "servers/:serverId/bots/new", element: <NewBot /> },
					{ path: "servers/:serverId/bots/:botId/commands/new", element: <NewCommand /> },
				],
			},
		],
	},
]);
export default function Router() {
	return <RouterProvider router={router} />;
}
