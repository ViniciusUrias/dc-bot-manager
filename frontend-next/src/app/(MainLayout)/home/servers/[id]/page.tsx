import { getServersById } from "../actions";
import ServerDetails from "../_components/server-data";

export const dynamic = "force-dynamic"; // Fully dynamic (no SSG)

// OR return empty paths (Next.js will fall back to runtime)
export async function generateStaticParams() {
	return []; // Disables SSG for this route
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await getServersById(id);

	return (
		<div>
			<ServerDetails server={data} />
		</div>
	);
}
