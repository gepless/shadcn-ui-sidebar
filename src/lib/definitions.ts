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
	info?: UnitInfo;
};

export type UnitInfo = {
	name: string;
	panel_size: number;
	battery_type: 0 | 1 | 2 | 3 | 4;
	battery_voltage: number;
	vehicle: {
		make: string;
		model: string;
		year: number;
		type?: string;
	};
};

export type UnitEvent = {
	timestamp: string;
	battery_amps: number;
	battery_volt: number;
	panel_amps: number;
	panel_volt: number;
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
