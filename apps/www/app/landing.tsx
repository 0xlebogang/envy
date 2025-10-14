import { Button } from "@repo/ui/components/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Landing() {
	return (
		<main className="min-h-[calc(100vh-88px)] flex items-center justify-center">
			<div className="max-w-7xl flex flex-col gap-6">
				<h1 className="text-4xl font-bold">Welcome to Envy</h1>
				<div className="w-full flex items-center justify-center gap-6">
					<Button asChild>
						<Link href="/login">Get Started</Link>
					</Button>
					<Button asChild variant="secondary">
						<Link href="https://github.com/0xlebogang/envy">
							<GithubIcon />
							GitHub
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
