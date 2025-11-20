import { Building2, FolderGit2, Users, Variable } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { capitalize } from "@/lib/utils";
import OrganizationsCard from "./organizations-card";
import ProjectsCard from "./projects-card";
import StatsCard from "./stats-card";
import TeamsCard from "./teams-card";

export default function Dashboard() {
	// Mock dashboard data
	const stats = {
		organizations: 4,
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
			<div data-testid="dashboard" className="min-h-screen bg-background">
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
								icon={getIcon(key)}
							/>
						))}
					</div>

					{/* Content Grid */}
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						<OrganizationsCard
							title="Organizations"
							description="Your organization overview"
							organizations={recentOrganizations}
						/>

						<TeamsCard
							title="Teams"
							description="Recent teams"
							teams={recentTeams}
						/>

						<ProjectsCard
							title="Projects"
							description="Recent projects"
							projects={recentProjects}
						/>
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
export function getIcon(title: string) {
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
