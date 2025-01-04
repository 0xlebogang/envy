import React from "react";
import type { Metadata } from "next";
import { Card, CardBody } from "@nextui-org/card";
import TokenInput from "@/components/ui/TokenInput";

export const metadata: Metadata = {
  title: "Settings | Envyper - Manage Your Account",
  description:
    "Configure your Envyper account settings, security preferences, and notification options. Personalize your experience and manage your profile settings.",
  keywords: [
    "account settings",
    "user preferences",
    "profile settings",
    "security settings",
    "notification preferences",
    "envyper settings",
    "account management",
  ],
};

export default function Settings() {
  return (
    <>
      <div className="w-full flex justify-start items-start mb-6">
        <h1 className="text-4xl font-bold">Settings</h1>
      </div>

      <Card fullWidth className="p-4">
        <CardBody className="flex flex-row justify-start items-center gap-4">
          <TokenInput />
        </CardBody>
      </Card>
    </>
  );
}
