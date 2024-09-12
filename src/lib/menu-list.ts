import { Car, Headset, LayoutGrid } from "lucide-react";
import type { MenuGroup } from "./definitions";

export function getMenuList(pathname: string): MenuGroup[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					id: 1,
					href: "/dashboard",
					label: "Dashboard",
					active: pathname.includes("/dashboard"),
					icon: LayoutGrid,
					submenus: [],
				},
				{
					id: 2,
					href: "/fleet",
					label: "Fleet",
					active: pathname.includes("/fleet"),
					icon: Car,
					submenus: [],
				},
				{
					id: 3,
					href: "/support",
					label: "Support",
					active: pathname.includes("/support"),
					icon: Headset,
					submenus: [],
				},
			],
		},
	];
}
