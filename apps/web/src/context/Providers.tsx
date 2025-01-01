"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

type ProvidersProps = {
  children: React.ReactNode;
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function Providers(props: ProvidersProps) {
  const router = useRouter();

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <NextUIProvider navigate={router.push}>{props.children}</NextUIProvider>
    </ClerkProvider>
  );
}
