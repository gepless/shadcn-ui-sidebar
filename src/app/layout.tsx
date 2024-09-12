import { StackProvider, StackTheme } from "@stackframe/stack";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { stackServerApp } from "../stack";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
	title: "Green Energy Fleet",
	description:
		"A dashboard for managing a fleet of vehicles equipped with solarpanel sets from Green Energy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={GeistSans.className}>
				<StackProvider app={stackServerApp}>
					<StackTheme>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							{children}
						</ThemeProvider>
					</StackTheme>
				</StackProvider>
			</body>
		</html>
	);
}
