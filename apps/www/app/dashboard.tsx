import { useSession } from "next-auth/react";

export default function Dashboard() {
	const session = useSession();

	return (
		<main className="flex items-center justify-center min-h-[calc(100vh-88px)]">
			<h1 className="text-4xl font-bold">
				Signed in as {session.data?.user?.email}
			</h1>
		</main>
	);
}
