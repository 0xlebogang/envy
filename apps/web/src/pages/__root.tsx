import { Outlet, createRootRoute } from "@tanstack/react-router";
import Providers from "@/context/Providers";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <div>Root</div>
      <Outlet />
    </Providers>
  );
}
