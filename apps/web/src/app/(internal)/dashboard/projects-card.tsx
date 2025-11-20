import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/shadcn/components/card";
import { FolderGit2 } from "lucide-react";

export interface ProjectsCardProps {
	title: string;
	description: string;
	projects: {
		// Replace with actual project data type
		id: number;
		name: string;
		team: string;
		variables: number;
	}[];
}

export default function ProjectsCard({
	title,
	description,
	projects,
}: ProjectsCardProps) {
	return (
		<Card className="lg:col-span-2">
			<CardHeader>
				<CardTitle className="text-foreground">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{projects.map((project) => (
						<div
							key={project.id}
							className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
									<FolderGit2 className="h-4 w-4 text-muted-foreground" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground font-mono">
										{project.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{project.team} | {project.variables} vars
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
