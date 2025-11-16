import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound Component", () => {
	beforeAll(() => {
		render(<NotFound />);
	});

	it("should render the 404 Not Found page", () => {
		const notFoundElement = screen.getByTestId("not-found");
		expect(notFoundElement).toBeInTheDocument();
	});

	it("should display the correct heading and message", () => {
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
		const returnHomeButton = screen.getByRole("link", { name: "Return Home" });
		expect(returnHomeButton).toBeInTheDocument();
		expect(returnHomeButton).toHaveAttribute("href", "/");
	});
});
