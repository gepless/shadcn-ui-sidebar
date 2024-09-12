import { Navbar } from "@/components/admin-panel/navbar";
import type { ContentLayoutProps } from "@/lib/definitions";

export function ContentLayout({
	title,
	subtitle,
	icon,
	children,
}: ContentLayoutProps) {
	return (
		<>
			<Navbar title={title} subtitle={subtitle} icon={icon} />
			<div className="container min-h-[calc(100vh_-_112px)] pt-8 pb-8 px-4 sm:px-8">
				{children}
			</div>
		</>
	);
}
