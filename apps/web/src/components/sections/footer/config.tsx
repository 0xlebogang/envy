import Logo from "@/components/logo";

interface FooterConfig {
	logo: React.ReactElement;
	links: {
		label: string;
		href: string;
		external?: boolean;
	}[];
}

export const footerConfig: FooterConfig = {
	logo: <Logo />,
	links: [
		{ label: "Documentation", href: "/docs" },
		{
			label: "GitHub",
			href: "https://github.com/envy/",
			external: true,
		},
		{ label: "Community", href: "/community" },
		{
			label: "License",
			href: "/licenses",
		},
	],
};
