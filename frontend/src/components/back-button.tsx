import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function BackButton({ label }: { label?: string }) {
	const navigate = useNavigate();
	return (
		<Button className="w-fit" onClick={() => navigate(-1)}>
			<ArrowLeft /> {label || "Back"}
		</Button>
	);
}
