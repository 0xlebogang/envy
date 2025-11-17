import { create } from "zustand";
import { persist } from "zustand/middleware";

// Placeholder user
interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
}

interface AuthActions {
	login: (user: User) => void;
	logout: () => void;
	setLoading: (isLoading: boolean) => void;

	// TODO: Add better-auth integration methods
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			// Initial state
			isAuthenticated: false,
			user: null,
			isLoading: false,

			// Actions
			login: (user: User) => {
				set({ isAuthenticated: true, user, isLoading: false });
			},

			logout: () => {
				set({ isAuthenticated: false, user: null, isLoading: false });
			},

			setLoading: (loading: boolean) => {
				set({ isLoading: loading });
			},

			// TODO: Implement better-auth integration methods
		}),
		{
			name: "auth",
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user,
			}),
		},
	),
);

export default useAuthStore;
