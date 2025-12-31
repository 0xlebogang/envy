import { type NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/dashboard"],
};

export async function proxy(request: NextRequest) {
	if (!isAuthenticated(request.cookies)) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_API_URL || ""}/auth/login`,
		);
	}

	return NextResponse.next();
}

export function isAuthenticated(cookies: NextRequest["cookies"]) {
	const token = cookies.get(
		process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "sekrets_auth_token",
	);
	return Boolean(token);
}

export function refreshAuthToken(cookies: NextRequest["cookies"]) {
	const _refreshToken = cookies.get(
		process.env.NEXT_PUBLIC_REFRESH_COOKIE_NAME || "sekrets_refresh_token",
	);
}
