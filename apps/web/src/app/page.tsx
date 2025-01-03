import React from "react";
import { Button } from "@nextui-org/button";
import { auth } from "@clerk/nextjs/server";
import { fetchProjects } from "@/data/fetchProjects";
import { Component as CreateModalForm } from "@/components/CreateProjectForm";

import ContentCard from "@/components/ContentCard";
import Banner from "@/components/Banner";
import ItemCard from "@/components/ui/ItemCard";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default async function Index() {
  const { getToken } = await auth();

  if (await getToken()) {
    const { data } = await fetchProjects();

    return (
      <>
        <main className="grid min-h-[calc(100vh-64px)] grid-cols-4 p-8 gap-6">
          <Banner />
          <div className="w-full col-span-3 min-h-full gap-6">
            <ContentCard
              title="My Projects"
              cols={1}
              pageUrl="/projects"
              noContentMessage="No projects yet"
              fetchHref={`${apiUrl}/projects`}
              modalForm={
                <CreateModalForm
                  openModalBtnText="Add New"
                  title="Create New Project"
                  submitText="Create"
                />
              }
            >
              {data?.map((item, i) => (
                <ItemCard
                  key={`${item.id}-${i}`}
                  title={item.name}
                  description={item.description}
                  href={`/projects/${item.id}`}
                />
              ))}
            </ContentCard>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Envyper</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Your secure environment variable management solution. Sign in to get
          started.
        </p>
        <Button
          href="/sign-up"
          as={Link}
          color="primary"
          size="lg"
          className="font-semibold"
        >
          Get Started
        </Button>
      </main>
    </>
  );
}
