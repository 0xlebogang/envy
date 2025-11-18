import Logo from "../logo";

export interface NavbarConfig {
	logo: React.ReactNode;
	menuItems: {
		label: string;
		href?: string;
		subitems?: {
			label: string;
			href: string;
			description?: string;
		}[];
	}[];
	buttons?: {
		label: string;
		href: string;
	}[];
}

export const navbarConfig: NavbarConfig = {
	logo: <Logo />,
	menuItems: [
		{
			label: "Features",
			href: "/features",
		},
		{
			label: "Documentation",
			subitems: [
				{
					label: "Getting Started",
					href: "/docs/getting-started",
					description: "Quick start guide to set up your project",
				},
				{
					label: "API Reference",
					href: "/docs/api",
					description: "Comprehensive API documentation",
				},
				{
					label: "Guides",
					href: "/docs/guides",
					description: "Step-by-step tutorials for common use cases",
				},
				{
					label: "Examples",
					href: "/docs/examples",
					description: "Practical examples to help you get started",
				},
			],
		},
		{
			label: "Community",
			subitems: [
				{
					label: "Discussions",
					href: "/community/discussions",
					description: "Join the conversation with other developers",
				},
				{
					label: "Showcase",
					href: "/community/showcase",
					description: "See what others have built",
				},
				{
					label: "Contribute",
					href: "/community/contribute",
					description: "Learn how to contribute to the project",
				},
			],
		},
		{
			label: "Pricing",
			href: "/pricing",
		},
	],
	buttons: [
		{
			label: "Sign In",
			href: "/sign-in",
		},
		{
			label: "Sign Up",
			href: "/sign-up",
		},
	],
};
