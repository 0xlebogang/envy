import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUpForm,
});

function SignUpForm() {
  return (
    <div className="h-[calc(100vh-6px)] grid place-items-center w-full">
      <SignUp />
    </div>
  );
}
