import { fetchProjects } from "@/data/fetchProjects";
import type { Metadata } from "next";

import CreateProjectForm from "@/components/CreateProjectForm";
import ProjectsTable from "@/components/ProjectsTable";

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
      <div className="w-full flex justify-between items-start">
        <h1 className="text-4xl font-bold mb-6">My Projects</h1>
        <CreateProjectForm
          openModalBtnText="Add New"
          submitText="Create"
          title="Create New Project"
        />
      </div>
      <ProjectsTable data={data} />
    </>
  );
}
