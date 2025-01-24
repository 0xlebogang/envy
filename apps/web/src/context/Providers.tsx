import { HeroUIProvider } from "@heroui/react";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProviderProps) {
  return <HeroUIProvider>{props.children}</HeroUIProvider>;
}
