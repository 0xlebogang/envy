import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import type { FileRoutesByFullPath } from "@/routeTree.gen";
import { useClerk } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

type MenuItem = {
  title: string;
  href: keyof FileRoutesByFullPath;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useClerk();
  let menuItems: MenuItem[];

  menuItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  if (user) {
    menuItems = [
      ...menuItems,
      {
        title: "My Projects",
        href: "/projects",
      },
      {
        title: "Settings",
        href: "/settings",
      },
    ];
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ENVYPER</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, i) => (
          <NavbarItem key={`${item.href}-${i}`}>
            <Link href={item.href}>{item.title}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <SignedOut>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/sign-in">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>

      <SignedIn>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.fullName as string}
                size="sm"
                src={user?.imageUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.fullName}</p>
              </DropdownItem>
              <DropdownItem key="projects">My Projects</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </SignedIn>

      <NavbarMenu>
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${item.href}-${i}`}>
            <Link href={item.href}>{item.title}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
