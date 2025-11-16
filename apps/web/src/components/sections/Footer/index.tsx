import Link from "next/link";
import { footerConfig } from "./config";

export default function Footer() {
	return (
		<footer className="border-t border-border py-12">
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
