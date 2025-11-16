import { Button } from "@repo/shadcn/components/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<section
			data-testid="not-found"
			className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4"
		>
			<div className="flex flex-col items-center gap-6 text-center">
				<div className="flex items-center justify-center">
					<FileQuestion
						className="h-20 w-20 text-muted-foreground"
						strokeWidth={1.5}
					/>
				</div>

				<div className="space-y-2">
					<h1 className="text-6xl font-bold tracking-tight text-foreground">
						404
					</h1>
					<h2 className="text-2xl font-semibold text-foreground">
						Page Not Found
					</h2>
					<p className="max-w-md text-muted-foreground">
						The page you're looking for doesn't exist or has been moved.
					</p>
				</div>

				<Button asChild size="lg" className="mt-2">
					<Link href="/">Return Home</Link>
				</Button>
			</div>
		</section>
	);
}
