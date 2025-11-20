import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/shadcn/components/card";
import { Building2 } from "lucide-react";

export interface OrganizationsCardProps {
	title: string;
	description: string;
	organizations: {
		// Replace with actual organization data type
		id: number;
		name: string;
		teams: number;
		projects: number;
	}[];
}

export default function OrganizationsCard({
	title,
	description,
	organizations,
}: OrganizationsCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-foreground">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{organizations.map((org) => (
						<div
							key={org.id}
							className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
									<Building2 className="h-4 w-4 text-muted-foreground" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										{org.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{org.teams} teams | {org.projects} projects
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
