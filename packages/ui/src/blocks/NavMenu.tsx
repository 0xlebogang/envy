'use client'

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
		requiresAuth: false
	},
	{
		title: "Projects",
		href: "/projects",
		requiresAuth: true
	},
	{
		title: "Docs",
		href: "/docs",
		requiresAuth: false
	},
	{
		title: "About",
		href: "/about",
		requiresAuth: false
	},
	{
		title: "Source Code",
		href: "https://github.com/0xlebogang/envy",
		requiresAuth: false
	}
]

export default function NavMenu({ isAuthenticated }: { isAuthenticated?: boolean }) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navLinks.map((link) => (
					<NavigationMenuItem key={link.href}>
						{/* Hide link if route requires authenticated status and current user is unauthenticated */}
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()} hidden={link.requiresAuth && !isAuthenticated}>
							<a href={link.href}>{link.title}</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
