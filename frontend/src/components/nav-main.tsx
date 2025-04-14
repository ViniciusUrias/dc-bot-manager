import { type Icon } from "@tabler/icons-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation, useMatch } from "react-router";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
}) {
	const location = useLocation();
	const match = useMatch({ path: location.pathname, end: true, caseSensitive: true });
	console.log(match);
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Servers</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								variant={match?.pathname === item.url ? "outline" : "default"}
								className={match?.pathname === item.url ? "bg-primary" : ""}
								asChild
								tooltip={item.title}
							>
								<NavLink to={item.url} viewTransition>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
