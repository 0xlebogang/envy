import { DM_Sans } from "next/font/google";

import "@repo/shadcn/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import Footer from "@/components/sections/footer";

const fontSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} font-sans antialiased selection:bg-primary selection:text-foreground`}
			>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
