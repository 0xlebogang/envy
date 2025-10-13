import { Geist, Geist_Mono } from "next/font/google";

import "@repo/ui/globals.css";
import Navbar from "@repo/ui/blocks/Navbar";
import Providers from "@/components/Providers";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
			>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
