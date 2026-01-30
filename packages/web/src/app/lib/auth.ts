import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
	plugins: [nextCookies()],
});
