import { useSession } from "next-auth/react";

export default function Dashboard() {
	const session = useSession();

	return (
		<main className="min-h-[calc(100vh-88px)] flex items-center justify-center">
			<h1 className="text-4xl font-bold">
				Signed in as {session.data?.user?.email}
			</h1>
		</main>
	);
}
