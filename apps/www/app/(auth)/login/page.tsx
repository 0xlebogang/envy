"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { BuiltInProviderType } from "next-auth/providers/index";
import {
	type ClientSafeProvider,
	getCsrfToken,
	getProviders,
	type LiteralUnion,
} from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { getMessage } from "@/lib/message";

function SignInContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const callbackUrl = searchParams.get("callbackUrl");

	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType>,
		ClientSafeProvider
	> | null>(null);
	const [csrfToken, setCsrfToken] = useState<string>("");

	useEffect(() => {
		const fetchProviders = async () => {
			const [providersData, tokenData] = await Promise.all([
				getProviders(),
				getCsrfToken(),
			]);
			setProviders(providersData);
			setCsrfToken(tokenData || "");
		};

		void fetchProviders();
	}, []);

	if (!providers) {
		return (
			<main className="min-h-screen flex-1 grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-gray-600">Loading...</p>
				</div>
			</main>
		);
	}

	const provider = providers?.zitadel;

	return (
		<main className="min-h-screen flex-1 grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center max-w-md w-full">
				<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
					Sign in
				</h1>
				<p
					className={`mt-6 text-lg font-medium text-pretty sm:text-xl/8 ${
						error ? "text-red-600" : "text-gray-500"
					}`}
				>
					{error
						? getMessage(error, "signin-error").message
						: "Continue to your account"}
				</p>

				{provider && (
					<div className="mt-10">
						<form
							action={provider.signinUrl}
							method="POST"
							className="space-y-4"
						>
							<input type="hidden" name="csrfToken" value={csrfToken} />
							<input
								type="hidden"
								name="callbackUrl"
								value={callbackUrl ?? undefined}
							/>
							<button
								type="submit"
								className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Sign In</title>
									<path
										fillRule="evenodd"
										d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
										clipRule="evenodd"
									/>
								</svg>
								Sign in with {provider.name}
							</button>
						</form>
					</div>
				)}
				<div className="mt-8">
					<Link
						href="/"
						className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
					>
						<svg
							aria-label="back"
							className="w-4 h-4 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<title>Back Arrow</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
						Back to home
					</Link>
				</div>
			</div>
		</main>
	);
}

/**
 * Custom NextAuth sign-in page that matches the application's design system.
 *
 * Provides a clean, branded sign-in experience specifically designed for
 * single-provider authentication with ZITADEL.
 */
export default function CustomSignInPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignInContent />
		</Suspense>
	);
}
