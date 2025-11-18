import { vi } from "vitest";

export const Fira_Code = vi.fn(() => ({
	subsets: ["latin"],
	variable: "--font-mono-mock",
	style: { fontFamily: "Fira Code" },
}));
