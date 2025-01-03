"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Banner() {
  const { user } = useClerk();

  return (
    <Card
      fullWidth
      className="hidden md:flex flex-col justify-start md:col-span-1 p-4"
    >
      <CardHeader className="flex justify-start items-start gap-3 mb-2">
        <Avatar
          alt={user?.fullName}
          src={user?.imageUrl}
          isBordered
          size="sm"
        />
        <div className="flex flex-col text-start">
          <p className="text-sm">{user?.fullName}</p>
          <p className="text-xs text-default-500">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 justify-start">
        <Button
          size="md"
          href="/settings"
          as={Link}
          className="font-semibold"
          fullWidth
        >
          Setiings
        </Button>
        <Button
          size="md"
          href="/projects"
          as={Link}
          className="font-semibold"
          fullWidth
        >
          My Projects
        </Button>
      </CardFooter>
    </Card>
  );
}
