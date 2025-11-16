import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function CodePreview() {
	return (
		<section
			data-testid="code-preview"
			className="container mx-auto px-6 pb-24"
		>
			<div className="max-w-4xl mx-auto">
				<div className="rounded border border-border bg-card p-6 font-mono text-sm">
					<div className="flex items-center gap-2 mb-6 text-muted-foreground">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<div className="w-3 h-3 rounded-full bg-yellow-500" />
						<div className="w-3 h-3 rounded-full bg-green-500" />
					</div>
					<pre className="text-foreground leading-relaxed">
						<code
							className={`${firaCode.variable} font-mono`}
						>{`$ npm install -g envy-cli

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
	);
}
