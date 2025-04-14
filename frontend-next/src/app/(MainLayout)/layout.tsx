import Header from "@/components/Header";

export default function MainLayout({ children }) {
	return (
		<div className="bg-primary-foreground h-screen w-screen overflow-y-auto">
			<Header />
			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">{children}</main>
		</div>
	);
}
