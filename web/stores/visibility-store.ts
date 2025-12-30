import { APP_ROUTES } from "@/lib/constants";
import { create } from "zustand";

export type VisibilityState = {
	isVisible: boolean;
	toggleVisibility: (path: string) => void;
};

export const useVisibilityStore = create<VisibilityState>((set) => ({
	isVisible: true,
	toggleVisibility: (path: string) => {
		const shouldBeVisible = !APP_ROUTES.includes(path);
		set({ isVisible: shouldBeVisible });
	},
}));
