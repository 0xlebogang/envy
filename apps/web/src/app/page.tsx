import { Button } from "@repo/shadcn/components/button";
import { Gitlab, Star, Terminal } from "lucide-react";
import CodePreview from "@/components/CodePreview";
import Hero from "@/components/sections/Hero";

export default function Index() {
	return (
		<>
			<Hero />
			<CodePreview />

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
