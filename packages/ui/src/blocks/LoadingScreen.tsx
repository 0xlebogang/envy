import { Spinner } from "@repo/ui/components/spinner";

export default function LoginLoading() {
	return (
		<div className="h-screen w-full flex flex-col items-center justify-center">
			<Spinner className="h-8 w-8" />
		</div>
	);
}
