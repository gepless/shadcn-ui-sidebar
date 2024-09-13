"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
	const { theme } = useTheme();
	return (
		<div className="flex flex-col w-full min-h-screen justify-center">
			<SignUp
				appearance={{
					baseTheme: theme === "dark" ? dark : undefined,
				}}
			/>
		</div>
	);
}
