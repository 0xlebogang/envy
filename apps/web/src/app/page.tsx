import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default async function Index() {
  const { userId } = await auth();
  const res = await fetch(`${apiUrl}/tokens?clerkUserId=${userId}`);
  const data = await res.json();

  return (
    <>
      <SignedOut>
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Home Page!
          </h1>
        </div>
      </SignedOut>

      <SignedIn>
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Home Page!
          </h1>
          <p>Hi there, {data.accessToken.token}</p>
        </div>
        <Button>Press Me!</Button>
      </SignedIn>
    </>
  );
}
