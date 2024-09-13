import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import type { NavbarProps } from "@/lib/definitions";
import { CompanySwitcher } from "./company-switcher";
import { UserNav } from "./user-nav";

export function Navbar({ title, subtitle, icon: Icon }: NavbarProps) {
	return (
		<header className="sticky top-3 pl-1 z-10 w-full bg-neutral-200 dark:bg-neutral-800">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex flex-auto gap-2">
					<SheetMenu />
					<Icon />
					<div>
						<h2 className="text-xs">{subtitle}</h2>
						<h1 className="font-bold">{title}</h1>
					</div>
				</div>
				<div className="flex flex-auto items-center">
					<CompanySwitcher />
				</div>
				<div className="flex flex-auto items-center justify-end">
					<UserNav />
				</div>
			</div>
		</header>
	);
}
