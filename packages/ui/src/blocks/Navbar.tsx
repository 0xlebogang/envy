import NavMenu from "@repo/ui/blocks/NavMenu";
import { Button } from "@repo/ui/components/button";
import {
	NavbarCenter,
	NavbarLeft,
	Navbar as NavbarProvider,
	NavbarRight,
} from "@repo/ui/components/navbar";

export default function Navbar({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	return (
		<NavbarProvider className="p-6 fixed top-0 left-0 z-50 w-full">
			<NavbarLeft>
				<h1 className="text-4xl font-bold">Envy</h1>
			</NavbarLeft>
			<NavbarCenter>
				<NavMenu />
			</NavbarCenter>
			<NavbarRight>
				{isAuthenticated ? (
					<Button asChild>
						<a href="/">Dashboard</a>
					</Button>
				) : (
					<Button asChild>
						<a href="/login">Sign In</a>
					</Button>
				)}
			</NavbarRight>
		</NavbarProvider>
	);
}
