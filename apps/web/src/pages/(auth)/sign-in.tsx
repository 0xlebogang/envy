import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInForm,
});

function SignInForm() {
  return (
    <div className="h-[calc(100vh-6px)] grid place-items-center w-full">
      <SignIn />
    </div>
  );
}
