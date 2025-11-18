import { Lock } from "lucide-react";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2 font-semibold">
			<Lock className="w-5 h-5" />
			<span>ENVY</span>
		</Link>
	);
}
