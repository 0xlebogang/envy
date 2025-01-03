import type { Metadata } from "next";
import ProjectsTable from "@/components/ProjectsTable";
import { fetchProjects } from "@/data/fetchProjects";

export const metadata: Metadata = {
  title: "Projects | Envyper",
  description:
    "Manage and organize your environment variables securely across multiple projects",
  keywords: [
    "environment variables",
    "secrets management",
    "project management",
    "secure env vars",
    "envyper",
    "development tools",
  ],
};

export default async function Projects() {
  const { data } = await fetchProjects();

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>
      <ProjectsTable data={data} />
    </>
  );
}
