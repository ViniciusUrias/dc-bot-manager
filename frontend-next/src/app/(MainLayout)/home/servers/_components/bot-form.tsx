"use client";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Server } from "@/types/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BotForm({ server }: { server: Server }) {
	const [avatarUrl, setAvatarUrl] = useState<string>("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) {
					setAvatarUrl(event.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const createBot2 = async (e: FormEvent<HTMLFormElement>) => {
		const form = new FormData(e.currentTarget);
		const data = Object.entries(form);
		console.log(form);
		// data.tags = data.tags.split(",").map((e) => e);
		// data.icon = avatarUrl;
		// data.icon = undefined;
		console.log(data);
		// await createBot(formData);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createBot2(e);
			}}
			className="space-y-4"
			autoComplete=""
		>
			<div className="space-y-2">
				<Label htmlFor="botId">{`Bot ID (General Information Tab > Application ID)`}</Label>
				<Input id="botId" name="botId" required placeholder="****" />
			</div>

			<div className="space-y-2">
				<Label htmlFor="token">{`Bot Token (Bot Tab > Generate Token)`}</Label>
				<Input id="token" name="token" required placeholder="****" />
			</div>

			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" required />
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Input id="description" name="description" required />
			</div>
			<div className="space-y-2">
				<Label htmlFor="tags">Tags</Label>
				<Input defaultValue={server.name} id="tags" name="tags" />
			</div>
			<div className="flex items-center gap-2">
				<div className="space-y-2">
					<Label htmlFor="icon">Icon</Label>
					<Input id="icon" name="icon" type="file" accept="image/*" onChange={handleImageChange} />
				</div>
				<Avatar className="size-20 h-auto">
					<AvatarImage src={avatarUrl} alt="bot icon" />
					<AvatarFallback>BT</AvatarFallback>
				</Avatar>
			</div>

			<input type="hidden" value={avatarUrl} name="avatarUrl" />
			<input type="hidden" value={server.serverid} name="serverId" />
			<input type="hidden" value={"!"} name="prefix" />
			<Button className="w-fit" type="submit">
				Create
			</Button>
		</form>
	);
}
