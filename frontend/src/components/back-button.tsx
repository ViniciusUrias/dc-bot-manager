import { ArrowLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function BackButton({ label }: { label?: string }) {
	const navigate = useRouter();
	return (
		<Button className="w-fit" variant={"outline"} onClick={() => navigate.history.back()}>
			<ArrowLeft /> {label || "Back"}
		</Button>
	);
}
