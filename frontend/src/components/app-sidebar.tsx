import * as React from "react";
import {
	IconBrandDiscordFilled,
	IconFileWord,
	IconHelp,
	IconHome,
	IconReport,
	IconSearch,
	IconServer,
	IconSettings,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { RegisteredRouter, ValidateFromPath, ValidateLinkOptionsArray } from "@tanstack/react-router";
import { Server } from "lucide-react";
export interface MenuProps<
	TRouter extends RegisteredRouter = RegisteredRouter,
	TItems extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
	TFrom extends string = string,
> {
	from: ValidateFromPath<TRouter, TFrom>;
	items: ValidateLinkOptionsArray<TRouter, TItems, TFrom>;
}
const data = {
	navMain: [
		{
			title: "Home",
			url: "/home",
			icon: IconHome,
		},
		{
			title: "Servers",
			url: "/home/servers",
			icon: IconServer,
		},
	],

	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: IconSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: IconSearch,
		},
	],
	bots: [
		{
			name: "List",
			url: "/app/bots",
			icon: IconBrandDiscordFilled,
		},
		{
			name: "Reports",
			url: "#",
			icon: IconReport,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: IconFileWord,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
							<a href="#">
								<IconBrandDiscordFilled className="!size-5" />
								<span className="text-base font-semibold">DCB Manager</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain
					items={[
						{ to: "/app", icon: IconHome, title: "Home" },
						{ title: "Servers", to: "/app/servers", icon: Server },
					]}
				/>
				<NavDocuments items={[{ to: "/app/bots", icon: IconBrandDiscordFilled, title: "List" }]} />
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
