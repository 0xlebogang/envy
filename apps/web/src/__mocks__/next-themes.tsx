import type * as React from "react";
import { vi } from "vitest";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <div data-testid="theme-provider">{children}</div>;
};

export const useTheme = (): {
	theme: string;
	setTheme: ReturnType<typeof vi.fn>;
	resolvedTheme: string;
	themes: string[];
	systemTheme: string;
} => ({
	theme: "light",
	setTheme: vi.fn(),
	resolvedTheme: "light",
	themes: ["light", "dark"],
	systemTheme: "light",
});
