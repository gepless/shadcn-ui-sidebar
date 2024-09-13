"use client";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function CompanySwitcher() {
	const { theme } = useTheme();
	return (
		<OrganizationSwitcher
			hidePersonal
			appearance={{
				baseTheme: theme === "dark" ? dark : undefined,
			}}
		/>
	);
}
