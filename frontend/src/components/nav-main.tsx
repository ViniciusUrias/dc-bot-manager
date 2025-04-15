import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, RegisteredRouter, useLocation, ValidateLinkOptionsArray } from "@tanstack/react-router";
import React from "react";
export interface MenuProps<
	TRouter extends RegisteredRouter = RegisteredRouter,
	TItems extends ReadonlyArray<{ icon?: React.ReactNode; title: string }> = ReadonlyArray<{
		icon?: React.ReactNode;
		title: string;
	}>,
> {
	items: ValidateLinkOptionsArray<TRouter, TItems>;
}
export function NavMain({ items }: MenuProps) {
	const location = useLocation();
	// const match = useMatch({ from: location.pathname, end: true, caseSensitive: true });
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Servers</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								// variant={match?.pathname === item.to ? "outline" : "default"}
								// className={match?.pathname === item.to ? "bg-primary" : ""}
								asChild
								tooltip={item.title}
							>
								<Link to={item.to} viewTransition>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
