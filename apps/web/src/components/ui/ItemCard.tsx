"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";

type ItemCardProps = {
  title: string;
  href: string;
  description?: string;
};

export default function ItemCard(props: ItemCardProps) {
  return (
    <Card fullWidth as={Link} href={props.href}>
      <CardBody className="flex gap-4">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-default-500">{props.description}</p>
      </CardBody>
    </Card>
  );
}
