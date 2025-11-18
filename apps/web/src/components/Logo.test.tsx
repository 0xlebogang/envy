import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Logo from "./Logo";

describe("Logo", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render logo with lock icon and text", () => {
		render(<Logo />);

		expect(screen.getByText("ENVY")).toBeDefined();
		expect(screen.getByRole("link")).toBeDefined();
	});

	it("should have the correct link href", () => {
		render(<Logo />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/");
	});

	it("should contain lock icon", () => {
		render(<Logo />);

		const lockIcon = screen.getByRole("link").querySelector("svg");
		expect(lockIcon).toBeInTheDocument();
	});

	it("should have correct CSS classes", () => {
		render(<Logo />);

		const link = screen.getByRole("link");
		expect(link).toHaveClass("flex", "items-center", "gap-2", "font-semibold");
	});
});
