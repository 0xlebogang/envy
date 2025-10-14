"use client";

import Loading from "@repo/ui/blocks/Loading";
import { useSession } from "next-auth/react";
import Dashboard from "./dashboard";
import Landing from "./landing";

/**
 * The main entry point of the application.
 *
 * It conditionally renders different components based on the user's authentication status.
 */
export default function Index() {
	const session = useSession();

	switch (session.status) {
		case "loading":
			return <Loading />;

		case "authenticated":
			return <Dashboard />;

		case "unauthenticated":
			return <Landing />;
	}
}
