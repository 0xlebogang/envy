import { Github, Star, Terminal } from "lucide-react";

export interface HeroConfig {
	tag: {
		icon?: React.ReactElement;
		text: string;
	};
	header: string;
	subheader: string;
	actions: {
		icon?: React.ReactElement;
		label: string;
		href: string;
		variant:
			| "default"
			| "destructive"
			| "outline"
			| "secondary"
			| "ghost"
			| "link";
		external?: boolean;
	}[];
}

export const heroConfig: HeroConfig = {
	tag: {
		icon: <Star />,
		text: "Open Source",
	},
	header: "Your secrets, secured and synced",
	subheader:
		"A secrets management tool that works right in your favourite IDE. Centralise environment variables for all phases of development.",
	actions: [
		{
			icon: <Terminal />,
			label: "Quick Start",
			href: "/sign-in",
			variant: "default",
		},
		{
			icon: <Github />,
			label: "View on GitHub",
			href: "https://gitub.com/0xlebogang/envy",
			variant: "secondary",
			external: true,
		},
	],
};
