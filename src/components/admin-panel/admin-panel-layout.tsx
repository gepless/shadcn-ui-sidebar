"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export default function AdminPanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<div className="bg-neutral-200 dark:bg-neutral-800">
			<Sidebar />
			<main
				className={cn(
					"min-h-screen transition-[margin-left] ease-in-out duration-300",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
				)}
			>
				{children}
			</main>
		</div>
	);
}
