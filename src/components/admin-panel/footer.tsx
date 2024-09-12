import Link from "next/link";

export function Footer() {
	return (
		<div className="z-20 w-full">
			<div className="mx-4 md:mx-8 flex h-14 justify-center">
				<p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
					&copy; 2024{" "}
					<Link
						href="https://greenenergy.pro"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium underline underline-offset-4"
					>
						Green Energy
					</Link>
					. All rights reserved.{" "}
					<Link
						href="https://greenenergy.pro/privacy"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium underline underline-offset-4"
					>
						Privacy Policy
					</Link>
				</p>
			</div>
		</div>
	);
}
