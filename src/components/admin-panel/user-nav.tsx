"use client";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function UserNav() {
	const { setTheme, theme } = useTheme();
	return (
		<UserButton
			appearance={{
				baseTheme: theme === "dark" ? dark : undefined,
			}}
		>
			<UserButton.MenuItems>
				<UserButton.Action
					label={`Switch to ${theme === "dark" ? "lightmode" : "darkmode"}`}
					labelIcon={theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				/>
			</UserButton.MenuItems>
		</UserButton>
	);
}
