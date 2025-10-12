import { useSession } from "next-auth/react";
import type { ProviderProps } from "./types";

export default function navMenus({ children }: ProviderProps) {
	const session = useSession();

	switch (session.status) {
		// Handle loading states
		case "loading":
			return (
				<div className="h-screen w-full flex flex-col items-center justify-center">
					<h1>Loading...</h1>
				</div>
			);

		// Handle unauthenticated states
		case "unauthenticated":
			return <>{children}</>;

		// Handle authenticated states
		case "authenticated":
			return (
				<div className="h-screen w-full flex flex-col items-center justify-center">
					<h1>Signed in as {session.data.user?.name}</h1>
				</div>
			);
		default:
			throw new Error("Unknown session status");
	}
}
