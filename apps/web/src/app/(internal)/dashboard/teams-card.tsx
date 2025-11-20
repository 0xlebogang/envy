import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/shadcn/components/card";
import { Users } from "lucide-react";

export interface TeamsCardProps {
	title: string;
	description: string;
	teams: {
		// Replace with actual team data type
		id: number;
		name: string;
		org: string;
		members: number;
	}[];
}

export default function TeamsCard({
	title,
	description,
	teams,
}: TeamsCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-foreground">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{teams.map((team) => (
						<div
							key={team.id}
							className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
									<Users className="h-4 w-4 text-muted-foreground" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										{team.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{team.org} | {team.members} members
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
