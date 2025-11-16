import { Button } from "@repo/shadcn/components/button";
import Link from "next/link";
import { heroConfig } from "./config";

export default function Hero() {
	return (
		<section
			data-testid="hero-section"
			className="container mx-auto px-6 pt-32 pb-24"
		>
			<div className="max-w-4xl mx-auto text-center">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm mb-8">
					{heroConfig.tag.icon}
					<span>{heroConfig.tag.text}</span>
				</div>

				<h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance leading-tight">
					{heroConfig.header.split(" ").map((word, i) =>
						i === heroConfig.header.split(" ").length - 1 ? (
							<span key={word} className="text-muted-foreground">
								{word}
							</span>
						) : (
							`${word} `
						),
					)}
				</h1>

				<p className="text-xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto leading-relaxed">
					{heroConfig.subheader}
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					{heroConfig.actions.map((action) => (
						<Button
							key={action.label}
							size="lg"
							variant={action.variant}
							className="text-base"
							asChild
						>
							{action.external ? (
								<a href={action.href}>
									{action.icon}
									{action.label}
								</a>
							) : (
								<Link href={action.href}>
									{action.icon}
									{action.label}
								</Link>
							)}
						</Button>
					))}
				</div>
			</div>
		</section>
	);
}
