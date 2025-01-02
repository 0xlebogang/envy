"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Banner() {
  const { user } = useClerk();

  return (
    <Card className="w-full p-4">
      <CardBody as="div" className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-6">
          <Avatar
            isBordered
            src={user?.imageUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
            size="lg"
          />
          <p className="text-xl">{user?.fullName}</p>
        </div>

        <div className="w-full">
          <Button as={Link} href="/settings" color="primary" size="md">
            Client Secret
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
