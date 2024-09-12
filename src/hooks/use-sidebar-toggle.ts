import type { useSidebarToggleStore } from "@/lib/definitions";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSidebarToggle = create(
	persist<useSidebarToggleStore>(
		(set, get) => ({
			isOpen: true,
			setIsOpen: () => {
				set({ isOpen: !get().isOpen });
			},
		}),
		{
			name: "sidebarOpen",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
