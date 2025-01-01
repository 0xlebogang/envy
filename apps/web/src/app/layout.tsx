import React from "react";
import { Inter } from "next/font/google";
import Providers from "@/context/Providers";
import "./globals.css";

import type { Metadata } from "next";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Envyper | The best way to manage your environment variables in development",
  description:
    "Envyper is a tool that helps you manage your environment variables in development",
  keywords: [
    "envyper",
    "env",
    "environment",
    "variables",
    "development",
    "management",
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
