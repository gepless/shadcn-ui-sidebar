import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SidebarToggleProps } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
	return (
		<div className="invisible lg:visible absolute top-10 right-0 z-20">
			<Button
				onClick={() => setIsOpen?.()}
				className="rounded-full w-8 h-8"
				variant="outline"
				size="icon"
			>
				<ChevronLeft
					className={cn(
						"h-4 w-4 transition-transform ease-in-out duration-700",
						isOpen === false ? "rotate-180" : "rotate-0",
					)}
				/>
			</Button>
		</div>
	);
}
