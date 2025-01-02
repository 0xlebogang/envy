import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

type ContentCardProps = {
  title: string;
  cols?: number;
  pageUrl?: string;
  noContentMessage?: string;
};

export default function ContentCard(props: ContentCardProps) {
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
        <p className="text-default-500">{props.noContentMessage}</p>
      </CardBody>
    </Card>
  );
}
