import Link from "next/link";

import gelogo from "@/app/GE_T-optimized.png";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Sidebar() {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<aside
			className={cn(
				"fixed top-0 left-0 z-20 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
				sidebar?.isOpen ? "w-80" : "w-[7rem]",
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			<div className="relative flex flex-col px-3 py-4 overflow-y-auto bg-background m-4 rounded-2xl">
				<div
					className={cn(
						"flex justify-center mt-2",
						sidebar?.isOpen ? "translate-x-0" : "translate-x-1",
					)}
				>
					<Link href="/dashboard" className="flex items-center gap-2">
						<Image
							src={gelogo}
							width={32}
							height={32}
							alt="Green Energy Leaf Logo"
						/>
						<h1
							className={cn(
								"text-xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
								sidebar?.isOpen
									? "translate-x-0 opacity-100"
									: "-translate-x-96 opacity-0 hidden",
							)}
						>
							Green Energy
						</h1>
					</Link>
				</div>
				<Menu isOpen={sidebar?.isOpen} />
			</div>
		</aside>
	);
}
