import { Button } from "@repo/shadcn/components/button";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NotFound from "./not-found";

vi.mock("@repo/shadcn/components/button", () => ({
	Button: ({ children, asChild, ...props }: any) => {
		if (asChild) {
			return children;
		}
		return <button {...props}>{children}</button>;
	},
}));

describe("NotFound Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the 404 Not Found page", () => {
		render(<NotFound />);
		const notFoundElement = screen.getByTestId("not-found");
		expect(notFoundElement).toBeInTheDocument();
	});

	it("should display the correct heading and message", () => {
		render(<NotFound />);
		const headingElement = screen.getByText("404");
		const subheadingElement = screen.getByText("Page Not Found");
		const messageElement = screen.getByText(
			"The page you're looking for doesn't exist or has been moved.",
		);

		expect(headingElement).toBeInTheDocument();
		expect(subheadingElement).toBeInTheDocument();
		expect(messageElement).toBeInTheDocument();
	});

	it("should have a return home button with correct link", () => {
		render(<NotFound />);
		// Try to find any button or link with "Return Home" text
		const returnHomeButton = screen.getByText("Return Home");
		expect(returnHomeButton).toBeInTheDocument();
		// Check if it's wrapped in a link
		const linkElement = returnHomeButton.closest("a");
		expect(linkElement).toHaveAttribute("href", "/");
	});
});
