import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="bg-primary/80 ">
			<main className=" rounded-md flex flex-col max-h-full  overflow-auto mx-20  ">
				<Outlet />
			</main>
		</div>
	);
}
