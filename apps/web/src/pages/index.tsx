import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@nextui-org/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, signOut } = useClerk();

  return (
    <>
      <SignedOut>
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center">
          <div className="h-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Welcome to Envyper
              </h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Professional Secret Manager
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button variant="ghost" color="primary">
                Sign In
              </Button>
              <Button color="primary">Get Started</Button>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto max-h-[calc(100vh-64px)] w-full grid grid-cols-3 grid-rows-1 py-6 gap-6">
          <Card className="col-span-1 p-4">
            <CardHeader className="flex gap-4">
              <Avatar
                isBordered
                src={user?.imageUrl}
                name={user?.fullName as string}
                size="lg"
              />
              <div>
                <p className="font-bold">{user?.fullName}</p>
                <p className="text-default-500 font-light text-xs">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </CardHeader>
            <CardBody className="flex-col gap-2">
              <Button as={Link} href="/">
                Home
              </Button>
              <Button as={Link} href="/projects">
                My Projects
              </Button>
              <Button as={Link} href="/settings">
                Settings
              </Button>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Button color="danger" onPress={() => signOut()}>
                Sign Out
              </Button>
            </CardFooter>
          </Card>

          <div className="col-span-2 h-full">
            <Card className="p-4">
              <CardHeader>
                <h2 className="text-xl font-bold">Dashboard</h2>
              </CardHeader>
              <CardBody>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <p className="text-sm text-default-500">
                          Active Projects
                        </p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <p className="text-sm text-default-500">
                          Total Secrets
                        </p>
                        <p className="text-2xl font-bold">48</p>
                      </div>
                    </Card>
                  </div>
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Recent Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Secret added to Project A</p>
                        <span className="text-xs text-default-500">
                          2 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Project B updated</p>
                        <span className="text-xs text-default-500">
                          5 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">New team member added</p>
                        <span className="text-xs text-default-500">
                          1 day ago
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
