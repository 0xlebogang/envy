import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/shadcn/components/card";
import { Building2, FolderGit2, Key, Users, Variable } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { capitalize } from "@/lib/utils";
import StatsCard from "./stats-card";

export default function Dashboard() {
	// Mock dashboard data
	const stats = {
		organizations: 3,
		teams: 8,
		projects: 12,
		variables: 247,
	};

	const recentOrganizations = [
		{ id: 1, name: "Acme Corp", teams: 4, projects: 8 },
		{ id: 2, name: "TechStart Inc", teams: 2, projects: 3 },
		{ id: 3, name: "DevOps LLC", teams: 2, projects: 1 },
		{ id: 4, name: "Startup LLC", teams: 5, projects: 3 },
	];

	const recentTeams = [
		{ id: 1, name: "Frontend Team", org: "Acme Corp", members: 5 },
		{ id: 2, name: "Backend Team", org: "Acme Corp", members: 4 },
		{ id: 3, name: "DevOps Team", org: "TechStart Inc", members: 3 },
		{ id: 4, name: "Mobile Team", org: "Acme Corp", members: 6 },
	];

	const recentProjects = [
		{ id: 1, name: "web-dashboard", team: "Frontend Team", variables: 32 },
		{ id: 2, name: "api-service", team: "Backend Team", variables: 45 },
		{ id: 3, name: "mobile-app", team: "Mobile Team", variables: 28 },
		{ id: 4, name: "infrastructure", team: "DevOps Team", variables: 67 },
	];

	return (
		<ContentLayout title="Dashboard">
			<div className="min-h-screen bg-background">
				<div className="container mx-auto px-4 py-8 max-w-7xl">
					{/* Header */}
					<div className="mb-8">
						<p className="text-muted-foreground">
							Overview of your environment variables and secrets
						</p>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
						{/* Loop through returned stats */}
						{Object.entries(stats).map(([key, value]) => (
							<StatsCard
								key={key}
								title={capitalize(key)}
								value={value}
								icon={getIconStatIcon(key)}
							/>
						))}
					</div>

					{/* Content Grid */}
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{/* Organizations */}
						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">Organizations</CardTitle>
								<CardDescription>Your organization overview</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{recentOrganizations.map((org) => (
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

						{/* Teams */}
						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">Teams</CardTitle>
								<CardDescription>Recent teams</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{recentTeams.map((team) => (
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

						{/* Projects */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="text-foreground">Projects</CardTitle>
								<CardDescription>Recent projects</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{recentProjects.map((project) => (
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
														{project.team} · {project.variables} vars
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</ContentLayout>
	);
}

/**
 * Get the corresponding icon component for a given stat title.
 *
 * @param title title of the stat
 * @returns corresponding icon component
 */
export function getIconStatIcon(title: string) {
	switch (title) {
		case "organizations":
			return <Building2 className="h-4 w-4 text-muted-foreground" />;
		case "teams":
			return <Users className="h-4 w-4 text-muted-foreground" />;
		case "projects":
			return <FolderGit2 className="h-4 w-4 text-muted-foreground" />;
		default:
			return <Variable className="h-4 w-4 text-muted-foreground" />;
	}
}
