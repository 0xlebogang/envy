import Link from "next/link";
import Logo from "../Logo";

export default function Footer() {
	return (
		<footer className="border-t border-border py-12">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<Logo />
					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						<Link
							href="/docs"
							className="hover:text-foreground transition-colors"
						>
							Documentation
						</Link>
						<a
							href="https://gitlab.com/envy-secrets/"
							className="hover:text-foreground transition-colors"
						>
							GitLab
						</a>
						<Link
							href="/community"
							className="hover:text-foreground transition-colors"
						>
							Community
						</Link>
						<a
							href="https://gitlab.com/envy-secrets/licenses"
							className="hover:text-foreground transition-colors"
						>
							License
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
