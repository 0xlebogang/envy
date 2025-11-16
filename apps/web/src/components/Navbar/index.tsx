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
import { navbarConfig } from "./config";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background">
			<div className="container mx-auto flex h-16 items-center justify-between">
				{navbarConfig.logo}

				{/* Desktop Navigation menu */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						{navbarConfig.menuItems.map((item) => {
							if (item.subitems) {
								return (
									<NavigationMenuItem key={item.label}>
										<NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
												{item.subitems.map((subItem) => (
													<ListItem
														key={subItem.label}
														href={subItem.href}
														title={subItem.label}
													>
														{subItem.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							} else {
								return (
									<NavigationMenuItem key={item.label}>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
											asChild
										>
											<Link href={item.href!}>{item.label}</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								);
							}
						})}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Auth Buttons - Desktop */}
				<div className="hidden items-center gap-2 md:flex">
					{navbarConfig.buttons?.map((button, i) => (
						<Button
							key={button.label}
							variant={i === 0 ? "ghost" : "default"}
							asChild
						>
							<Link href={button.href}>{button.label}</Link>
						</Button>
					))}
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
							{navbarConfig.menuItems.map((item) => {
								if (item.subitems) {
									return (
										<div className="flex flex-col gap-2">
											<span className="text-sm font-medium text-muted-foreground">
												{item.label}
											</span>
											{item.subitems.map((subItem) => (
												<Link href={subItem.href} className="pl-4 text-sm">
													{subItem.label}
												</Link>
											))}
										</div>
									);
								} else {
									return (
										<Link
											href={item.href as string}
											className="text-lg font-medium"
										>
											{item.label}
										</Link>
									);
								}
							})}

							<div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
								{navbarConfig.buttons?.map((button, i) => (
									<Button
										key={button.label}
										variant={i === 0 ? "outline" : "default"}
										asChild
									>
										<Link href={button.href}>{button.label}</Link>
									</Button>
								))}
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
