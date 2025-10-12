"use client";

import { SessionProvider } from "next-auth/react";
import NavMenus from "./navMenus";
import Themes from "./themes";
import type { ProviderProps } from "./types";

export default function Providers({ children }: ProviderProps) {
	return (
		<SessionProvider>
			<Themes>
				<NavMenus>{children}</NavMenus>
			</Themes>
		</SessionProvider>
	);
}
