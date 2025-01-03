import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

type ContentCardProps = {
  title: string;
  cols?: number;
  pageUrl?: string;
  noContentMessage?: string;
  fetchHref: string;
  children?: React.ReactNode;
  modalForm: React.ReactNode;
};

export default async function ContentCard(props: ContentCardProps) {
  return (
    <Card className={`p-4 col-span-${props.cols || 1}`}>
      <CardHeader className="flex flex-col items-start md:items-center gap-3 md:flex-row md:justify-between">
        <h1 className="text-4xl font-bold">{props.title}</h1>
        {props.modalForm}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">{props.children}</CardBody>
    </Card>
  );
}
