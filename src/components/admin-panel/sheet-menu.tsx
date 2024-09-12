import gelogo from "@/app/GE_T-optimized.svg";
import { Menu } from "@/components/admin-panel/menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<HamburgerMenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
				<SheetHeader>
					<div className="flex justify-center items-center pb-2 pt-1">
						<Link href="/dashboard" className="flex items-center gap-2">
							<Image
								src={gelogo}
								width={32}
								height={32}
								alt="Green Energy Leaf Logo"
							/>
							<SheetTitle className="font-bold text-lg">
								Green Energy
							</SheetTitle>
						</Link>
					</div>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
