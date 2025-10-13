"use client";

import { SessionProvider } from "next-auth/react";
import Themes from "./themes";
import type { ProviderProps } from "./types";

export default function Providers({ children }: ProviderProps) {
	return (
		<SessionProvider>
			<Themes>{children}</Themes>
		</SessionProvider>
	);
}
