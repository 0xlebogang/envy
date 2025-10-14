"use client";

import Navbar from "@repo/ui/blocks/Navbar";
import { useSession } from "next-auth/react";

/**
 * A wrapper around the `Navbar` component that checks the user's session status
 * and passes the `isAuthenticated` prop accordingly.
 */
export default function NavbarSessionChecker() {
	const session = useSession();
	return <Navbar isAuthenticated={session.status === "authenticated"} />;
}
