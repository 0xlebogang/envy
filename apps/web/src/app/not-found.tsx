import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go back home
      </a>
    </div>
  );
}
