import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import type { Project } from "@envyper/zod";

type ContentCardProps = {
  title: string;
  cols?: number;
  pageUrl?: string;
  noContentMessage?: string;
  fetchHref: string;
};

export default async function ContentCard(props: ContentCardProps) {
  const { getToken } = await auth();

  const res = await fetch(props.fetchHref, {
    headers: {
      Authorization: `Bearer ${(await getToken()) as string}`,
    },
  });

  const { data } = await res.json();

  return (
    <Card className={`p-4 col-span-${props.cols || 1}`}>
      <CardHeader className="flex flex-col items-start md:items-center gap-3 md:flex-row md:justify-between">
        <h1 className="text-4xl font-bold">{props.title}</h1>
        <Button
          as={Link}
          href={props.pageUrl as string}
          color="primary"
          className="w-full md:w-auto"
        >
          View
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
        {data?.map((item: Project, i: number) => (
          <Card fullWidth className="p-4" key={`${item}-${i}`}>
            <CardHeader>
              <h1 className="text-2xl font-bold">{item.name}</h1>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}
