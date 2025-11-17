import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeRendererState {
	showPublicSite: boolean;
}

interface HomeRendererActions {
	setPublicSite: (isPublic: boolean) => void;
}

type HomeRendererStore = HomeRendererState & HomeRendererActions;

const useHomeRendererStore = create<HomeRendererStore>()(
	persist(
		(set, get) => ({
			// Initial state
			// Check auth status and render appropriate default homepage
			showPublicSite: false,

			// Actions
			setPublicSite: (isPublic: boolean) => {
				set({ showPublicSite: isPublic });
			},
		}),
		{
			name: "home-view",
			partialize: (state) => ({
				publicSite: state.showPublicSite,
			}),
		},
	),
);

export default useHomeRendererStore;
