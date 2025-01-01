import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="relative top-[64px] flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-2">
      {props.children}
    </div>
  );
}
