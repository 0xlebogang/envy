import { Button } from "@repo/shadcn/components/button";
import { Gitlab, Star, Terminal } from "lucide-react";

export default function Index() {
	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-6 pt-32 pb-24">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm mb-8">
						<Star className="w-4 h-4" />
						<span>Open Source</span>
					</div>

					<h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance leading-tight">
						Your secrets, <span className="text-muted-foreground">secured</span>{" "}
						and <span className="text-muted-foreground">synced</span>
					</h1>

					<p className="text-xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto leading-relaxed">
						A secrets management tool that works right in your favourite IDE.
						Centralise environment variables for all phases of development.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button size="lg" className="text-base">
							<Terminal className="w-4 h-4 mr-2" />
							Quick Start
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="text-base bg-transparent"
							asChild
						>
							<a href="https://gitlab.com/envy-secrets/">
								<Gitlab className="w-4 h-4 mr-2" />
								View on GitLab
							</a>
						</Button>
					</div>
				</div>
			</section>

			{/* Code Preview */}
			<section className="container mx-auto px-6 pb-24">
				<div className="max-w-4xl mx-auto">
					<div className="rounded border border-border bg-card p-6 font-mono text-sm">
						<div className="flex items-center gap-2 mb-6 text-muted-foreground">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<div className="w-3 h-3 rounded-full bg-green-500" />
						</div>
						<pre className="text-foreground leading-relaxed">
							<code>{`$ npm install -g envy-cli

$ envy init
✓ Connected to ENVY
✓ Syncing secrets...
✓ 12 environment variables loaded

$ envy dev
> Starting development server with secrets...`}</code>
						</pre>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-6 py-24 border-t border-border">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">
						Ready to secure your secrets?
					</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Join developers who trust ENVY to manage their environment variables
						across all development phases.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button size="lg">Get Started for Free</Button>
						<Button size="lg" variant="outline">
							Read the Docs
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
