"use client";

import LoginLoading from "@repo/ui/blocks/LoadingScreen";
import { useSession } from "next-auth/react";
import Dashboard from "./dashboard";
import Landing from "./landing";

export default function Index() {
	const session = useSession();

	switch (session.status) {
		case "loading":
			return <LoginLoading />;

		case "authenticated":
			return <Dashboard />;

		case "unauthenticated":
			return <Landing />;
	}
}
