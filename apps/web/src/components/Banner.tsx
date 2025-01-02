"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export default function Banner() {
  const { user } = useClerk();

  return (
    <Card fullWidth className="p-4">
      <CardHeader className="flex gap-3 mb-2">
        <Avatar
          alt={user?.fullName}
          src={user?.imageUrl}
          isBordered
          size="lg"
        />
        <div className="flex flex-col">
          <p className="text-md">{user?.fullName}</p>
          <p className="text-small text-default-500">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className="flex justify-end">
        <Button as={Link} href="/settings" size="lg" color="primary">
          Client ID
        </Button>
      </CardFooter>
    </Card>
  );
}
