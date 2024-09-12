import type { LucideIcon } from "lucide-react";

export type Submenu = {
	id: number;
	href: string;
	label: string;
	active: boolean;
};

export type Menu = {
	id: number;
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus: Submenu[];
};

export type MenuGroup = {
	groupLabel: string;
	menus: Menu[];
};

export type Unit = {
	imei: string;
	info?: Info;
};

export type Info = {
	name: string;
	panel_size: number;
	battery_type: number;
	battery_voltage: number;
	vehicle: LucideIcon;
};

export interface CollapseMenuButtonProps {
	icon: LucideIcon;
	label: string;
	active: boolean;
	submenus: Submenu[];
	isOpen: boolean | undefined;
}

export interface useSidebarToggleStore {
	isOpen: boolean;
	setIsOpen: () => void;
}

export interface SidebarToggleProps {
	isOpen: boolean | undefined;
	setIsOpen?: () => void;
}

export interface ContentLayoutProps extends NavbarProps {
	children: React.ReactNode;
}

export interface NavbarProps {
	title: string;
	subtitle: string;
	icon: LucideIcon;
}

export interface MenuProps {
	isOpen: boolean | undefined;
}
