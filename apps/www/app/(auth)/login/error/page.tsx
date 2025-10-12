"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getMessage } from "@/lib/message.js";

function AuthErrorContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error") || "default";

	const { heading, message } = getMessage(error, "auth-error");

	return (
		<main className="min-h-screen flex-1 grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
					<svg
						className="h-8 w-8 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
					>
						<title>Back</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
				</div>
				<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
					{heading}
				</h1>
				<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
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
		<Suspense fallback={<div>Loading...</div>}>
			<AuthErrorContent />
		</Suspense>
	);
}
