"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export default function Themes({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			{children}
		</NextThemesProvider>
	);
}
