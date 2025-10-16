import { Spinner } from "@repo/ui/components/spinner";
import { cn } from "@repo/ui/lib/utils";

export default function Loading({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"w-full flex flex-col items-center justify-center",
				className,
			)}
		>
			<Spinner className="h-8 w-8" />
		</div>
	);
}
