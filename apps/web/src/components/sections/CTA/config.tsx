export interface CTAConfig {
	header: string;
	subheader: string;
	buttons: {
		label: string;
		href: string;
		variant?:
			| "default"
			| "destructive"
			| "outline"
			| "secondary"
			| "ghost"
			| "link";
	}[];
}

export const ctaConfig: CTAConfig = {
	header: "Ready to secure your projects?",
	subheader:
		"Join developers who trust ENVY to manage their environment variables across all development phases.",
	buttons: [
		{ label: "Get Started for Free", href: "/sign-in" },
		{ label: "Read the Docs", href: "/docs", variant: "outline" },
	],
};
