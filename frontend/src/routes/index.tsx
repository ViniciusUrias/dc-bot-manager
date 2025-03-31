import AuthLayout from "@/layouts/auth";
import MainLayout from "@/layouts/main";
import LoginPage from "@/pages/auth/login";
import NotFound from "@/pages/errors/NotFound";
import HomePage from "@/pages/home";
import { createBrowserRouter, RouterProvider } from "react-router";
const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthLayout />,
		ErrorBoundary: NotFound,
		children: [{ path: "sign-in", element: <LoginPage /> }],
	},
	{
		path: "/",
		element: <MainLayout />,
		ErrorBoundary: NotFound,

		children: [
			{
				path: "users",
				children: [
					{ index: true, element: <HomePage /> }, // Matches "/users"

					{
						path: ":userId/albums",
						children: [
							{ index: true, element: <HomePage /> }, // Matches "/users/:userId/albums"
							{ path: ":albumId/photos", element: <HomePage /> }, // Matches "/users/:userId/albums/:albumId/photos"
						],
					},
				],
			},
		],
	},
]);
export default function Router() {
	return <RouterProvider router={router} />;
}
