import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const session = useSession();

	return (
		<main className="min-h-[calc(100vh-88px)] grid grid-cols-2 gap-6">
			<Card>
				<CardHeader>
					<h2 className="text-2xl font-bold">
						Welcome, {session.data?.user?.name}!
					</h2>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<h2 className="text-2xl font-bold">Your Projects</h2>
				</CardHeader>
				<CardContent>
					<p className="text-gray-500">
						You have no projects yet. Start by creating a new project!
					</p>
				</CardContent>
			</Card>
		</main>
	);
}
