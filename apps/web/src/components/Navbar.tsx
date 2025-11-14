"use client";

import { Button } from "@repo/shadcn/components/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@repo/shadcn/components/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@repo/shadcn/components/sheet";
import { cn } from "@repo/shadcn/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import type React from "react";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background">
			<div className="container mx-auto flex h-16 items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center space-x-2">
					<span className="text-lg font-semibold uppercase">Envy</span>
				</Link>

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								asChild
							>
								<Link href="/features">Features</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
									<ListItem
										href="/docs/getting-started"
										title="Getting Started"
									>
										Quick start guide to set up your project
									</ListItem>
									<ListItem href="/docs/api" title="API Reference">
										Comprehensive API documentation
									</ListItem>
									<ListItem href="/docs/guides" title="Guides">
										Step-by-step tutorials and examples
									</ListItem>
									<ListItem href="/docs/examples" title="Examples">
										Sample projects and code snippets
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Community</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4">
									<ListItem href="/community/discussions" title="Discussions">
										Join the conversation with other developers
									</ListItem>
									<ListItem href="/community/showcase" title="Showcase">
										See what others have built
									</ListItem>
									<ListItem href="/community/contribute" title="Contribute">
										Learn how to contribute to the project
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								asChild
							>
								<Link href="/pricing">Pricing</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Auth Buttons - Desktop */}
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="ghost" asChild>
						<Link href="/sign-in">Sign In</Link>
					</Button>
					<Button asChild>
						<Link href="/sign-up">Sign Up</Link>
					</Button>
				</div>

				{/* Mobile Menu */}
				<Sheet>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
						<nav className="flex flex-col gap-4">
							<Link href="/features" className="text-lg font-medium">
								Features
							</Link>

							<div className="flex flex-col gap-2">
								<span className="text-sm font-medium text-muted-foreground">
									Documentation
								</span>
								<Link href="/docs/getting-started" className="pl-4 text-sm">
									Getting Started
								</Link>
								<Link href="/docs/api" className="pl-4 text-sm">
									API Reference
								</Link>
								<Link href="/docs/guides" className="pl-4 text-sm">
									Guides
								</Link>
								<Link href="/docs/examples" className="pl-4 text-sm">
									Examples
								</Link>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-sm font-medium text-muted-foreground">
									Community
								</span>
								<Link href="/community/discussions" className="pl-4 text-sm">
									Discussions
								</Link>
								<Link href="/community/showcase" className="pl-4 text-sm">
									Showcase
								</Link>
								<Link href="/community/contribute" className="pl-4 text-sm">
									Contribute
								</Link>
							</div>

							<Link href="/pricing" className="text-lg font-medium">
								Pricing
							</Link>

							<div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
								<Button variant="outline" asChild>
									<Link href="/sign-in">Sign In</Link>
								</Button>
								<Button asChild>
									<Link href="/sign-up">Sign Up</Link>
								</Button>
							</div>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}

const ListItem = ({
	className,
	title,
	children,
	href,
	...props
}: {
	className?: string;
	title: string;
	children: React.ReactNode;
	href: string;
}) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
};

const navigationMenuTriggerStyle = () =>
	"group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";
