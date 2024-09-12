"use client";

import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { MenuProps } from "@/lib/definitions";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";

export function Menu({ isOpen }: MenuProps) {
	const pathname = usePathname();
	const menuList = getMenuList(pathname);
	const { user } = useUser();

	return (
		<ScrollArea className="[&>div>div[style]]:!block">
			<nav className="mt-8 w-full">
				<ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px-2rem)] lg:min-h-[calc(100vh-32px-40px-32px-2rem)] items-start space-y-1 px-2">
					{menuList.map(({ groupLabel, menus }) => (
						<li
							className={cn("w-full", groupLabel ? "pt-5" : "")}
							key={groupLabel}
						>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
									{groupLabel}
								</p>
							) : !isOpen && isOpen !== undefined && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="w-full flex justify-center items-center">
												<Ellipsis className="h-5 w-5" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className="pb-2" />
							)}
							{menus.map(({ href, label, icon: Icon, active, submenus }) =>
								submenus.length === 0 ? (
									<div className="w-full" key={label}>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={active ? "default" : "ghost"}
														className="w-full justify-start h-10 mb-2 hover:bg-primary"
														asChild
													>
														<Link href={href}>
															<span className={isOpen ? "mr-4" : ""}>
																<Icon size={18} />
															</span>
															<p
																className={cn(
																	"",
																	isOpen
																		? "translate-x-0 opacity-100"
																		: "-translate-x-96 opacity-0",
																)}
															>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{!isOpen && (
													<TooltipContent side="right">{label}</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									<div className="w-full" key={label}>
										<CollapseMenuButton
											icon={Icon}
											label={label}
											active={active}
											submenus={submenus}
											isOpen={isOpen}
										/>
									</div>
								),
							)}
						</li>
					))}
					<li className="w-full grow flex items-end">
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger>
									<div className="flex pb-1">
										<UserButton showName={isOpen} />
									</div>
								</TooltipTrigger>
								{!isOpen && (
									<TooltipContent side="right" className="text-center">
										<p>{user?.fullName}</p>
										<p>{user?.primaryEmailAddress?.emailAddress}</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	);
}
