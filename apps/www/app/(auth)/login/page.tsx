"use client";

import LoginLoading from "@repo/ui/blocks/LoadingScreen";
import { Button } from "@repo/ui/components/button";
import { LogIn, MoveLeft } from "lucide-react";
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
		return <LoginLoading />;
	}

	const provider = providers?.zitadel;

	return (
		<main className="min-h-screen flex-1 grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center max-w-md w-full">
				<h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
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
							<Button type="submit" size="lg">
								<LogIn className="w-5 h-5" />
								Sign in with {provider.name}
							</Button>
						</form>
					</div>
				)}
				<div className="mt-4">
					<Link
						href="/"
						className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
					>
						<MoveLeft className="mr-2" />
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
		<Suspense fallback={<LoginLoading />}>
			<SignInContent />
		</Suspense>
	);
}
