import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@heroui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h1>Index</h1>
      <p>Open the console to see the logs</p>
      <Button color="primary">Click Me!</Button>
    </>
  );
}
