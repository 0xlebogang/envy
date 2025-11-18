"use client";

import Link from "next/link";
import { shouldShow } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import useHomeRendererStore from "@/stores/home-renderer-store";
import { footerConfig } from "./config";

export default function Footer() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const showPublicSite = useHomeRendererStore((state) => state.showPublicSite);

	return (
		<footer
			className={`${shouldShow(isAuthenticated, showPublicSite) ? "" : "hidden"} border-t border-border py-12`}
		>
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{footerConfig.logo}
					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						{footerConfig.links.map((link) => {
							if (link.external) {
								return (
									<a
										key={link.href}
										href={link.href}
										className="hover:text-foreground transition-colors"
									>
										{link.label}
									</a>
								);
							} else {
								return (
									<Link
										key={link.href}
										href={link.href}
										className="hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								);
							}
						})}
					</div>
				</div>
			</div>
		</footer>
	);
}
