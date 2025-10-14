import { Navbar as NavbarProvider, NavbarCenter, NavbarLeft, NavbarRight } from "@repo/ui/components/navbar";
import { Button } from "@repo/ui/components/button";

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
	return (
			<NavbarProvider className="p-6 fixed top-0 left-0 z-50 w-full">
				<NavbarLeft>
					<h1 className="text-4xl font-bold">Envy</h1>
				</NavbarLeft>
				<NavbarCenter>
					<h1>Navbar center</h1>
				</NavbarCenter>
				<NavbarRight>
					{isAuthenticated ? (
						<Button>
							Dashboard
						</Button>
					) : (
						<Button asChild>
							<a href="/login">Sign In</a>
						</Button>
					)}
				</NavbarRight>
		</NavbarProvider>

	)
}
