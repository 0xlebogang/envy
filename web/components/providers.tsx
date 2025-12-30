import { ThemeProvider } from "next-themes";

export interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			{children}
		</ThemeProvider>
	);
}
