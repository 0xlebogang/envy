import { Button } from "@repo/shadcn/components/button";
import { Gitlab, Star, Terminal } from "lucide-react";
import Hero from "@/components/sections/Hero";

export default function Index() {
	return (
		<>
			<Hero />
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
