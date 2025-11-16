import { Button } from "@repo/shadcn/components/button";
import Link from "next/link";
import { ctaConfig } from "./config";

export default function CTA() {
	return (
		<section
			data-testid="cta-section"
			className="container mx-auto px-6 py-24 border-t border-border"
		>
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl font-bold mb-6">{ctaConfig.header}</h2>
				<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
					{ctaConfig.subheader}
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					{ctaConfig.buttons.map((button) => (
						<Button
							key={button.label}
							size="lg"
							variant={button.variant}
							asChild
						>
							<Link href={button.href}>{button.label}</Link>
						</Button>
					))}
				</div>
			</div>
		</section>
	);
}
