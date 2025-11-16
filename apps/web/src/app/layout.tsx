import { DM_Sans } from "next/font/google";

import "@repo/shadcn/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import Footer from "@/components/sections/Footer";

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
			<body className={`${fontSans.variable} font-sans antialiased`}>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
