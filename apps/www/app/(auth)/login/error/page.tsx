"use client";

import Loading from "@repo/ui/blocks/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getMessage } from "@/lib/message.js";

function AuthErrorContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error") || "default";

	const { heading, message } = getMessage(error, "auth-error");

	return (
		<main className="min-h-[calc(100vh-88px)] flex-1 grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight text-balance sm:text-7xl">
					{heading}
				</h1>
				<p className="mt-6 font-medium text-pretty text-gray-500 sm:text-xl/8">
					{message}
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/api/auth/signin"
						className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Try signing in again
					</Link>
					<Link
						href="/"
						className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Go back home
					</Link>
				</div>
			</div>
		</main>
	);
}

/**
 * Custom NextAuth error page that matches the application's design system.
 *
 * Displays user-friendly error messages for various authentication failures
 * including configuration errors, access denied, and verification failures.
 */
export default function AuthErrorPage() {
	return (
		<Suspense fallback={<Loading />}>
			<AuthErrorContent />
		</Suspense>
	);
}
