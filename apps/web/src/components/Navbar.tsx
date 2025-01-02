"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, signOut } = useClerk();

  const menuItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "docs",
      href: "/docs",
    },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit uppercase">
            Envyper
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit uppercase">
            Envyper
          </Link>
        </NavbarBrand>

        <SignedOut>
          {menuItems.map((item, i) => (
            <NavbarItem key={`${item}-${i}`} isActive={pathname === item.href}>
              <Link color="foreground" href={item.href}>
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </SignedOut>
      </NavbarContent>

      <NavbarContent justify="end" as={"div"}>
        <SignedOut>
          <NavbarItem className="hidden lg:flex">
            <Link href="/sign-in">Sign In</Link>
          </NavbarItem>
        </SignedOut>

        <SignedIn>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={`${user?.firstName} ${user?.lastName}`}
                size="sm"
                src={user?.imageUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-extralight">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </DropdownItem>
              <DropdownItem
                key="projects"
                as={Link}
                href="/projects"
                className="text-whtie"
              >
                Projects
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </SignedIn>
      </NavbarContent>

      <NavbarMenu>
        <SignedOut>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} className="text-white">
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </SignedOut>

        <SignedIn>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} className="text-white">
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <Button color="danger" onPress={() => signOut()}>
            Sign Out
          </Button>
        </SignedIn>
      </NavbarMenu>
    </Navbar>
  );
}
