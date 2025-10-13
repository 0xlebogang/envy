import { Navbar as NavbarProvider, NavbarCenter, NavbarLeft, NavbarRight } from "@repo/ui/components/navbar";
import { Button } from "@repo/ui/components/button";

export default function Navbar() {
	return (
			<NavbarProvider className="p-6">
				<NavbarLeft>
					<h1 className="text-4xl font-bold">Envy</h1>
				</NavbarLeft>
				<NavbarCenter>
					<h1>Navbar center</h1>
				</NavbarCenter>
				<NavbarRight>
					<Button size="sm" asChild>
						<a href="/login">Sign In</a>
					</Button>
				</NavbarRight>
		</NavbarProvider>

	)
}
