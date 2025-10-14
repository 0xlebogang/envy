import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu"

const navLinks = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Docs",
		href: "/docs",
	},
	{
		title: "About",
		href: "/about",
	},
	{
		title: "Source Code",
		href: "https://github.com/0xlebogang/envy",
	}
]

export default function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navLinks.map((link) => (
					<NavigationMenuItem key={link.href}>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<a href={link.href}>{link.title}</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
