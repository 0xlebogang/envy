"use client";

import { cn } from "@repo/shadcn/lib/utils";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

export default function AdminPanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebar = useStore(useSidebar, (x) => x);
	if (!sidebar) return null;
	const { getOpenState, settings } = sidebar;
	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"min-h-[calc(100vh-56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
					!settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
				)}
			>
				{children}
			</main>
			{/* <footer
				className={cn(
					"transition-[margin-left] ease-in-out duration-300",
					!settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
				)}
			>
				<Footer />
			</footer> */}
		</>
	);
}
