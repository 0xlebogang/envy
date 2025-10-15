"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProtectedLayout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const session = useSession();

	if (session.status === "authenticated") {
		return <>{children}</>;
	} else if (session.status === "unauthenticated") {
		redirect("/login");
	}
}
