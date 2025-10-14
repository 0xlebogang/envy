import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import NavbarSessionChecker from "./navbarSessionChecker";
import "@repo/ui/globals.css";

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
					<NavbarSessionChecker />
					<div className="absolute top-[88px] px-6 w-full">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
