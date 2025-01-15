import { NextUIProvider } from "@nextui-org/react";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProviderProps) {
  return <NextUIProvider>{props.children}</NextUIProvider>;
}
