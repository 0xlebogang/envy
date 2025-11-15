import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Logo from "./Logo";

afterEach(() => {
	cleanup();
});

test("renders logo with lock icon and text", () => {
	render(<Logo />);

	expect(screen.getByText("ENVY")).toBeDefined();
	expect(screen.getByRole("link")).toBeDefined();
});

test("has correct link href", () => {
	render(<Logo />);

	const link = screen.getByRole("link");
	expect(link).toHaveAttribute("href", "/");
});

test("contains lock icon", () => {
	render(<Logo />);

	const lockIcon = screen.getByRole("link").querySelector("svg");
	expect(lockIcon).toBeInTheDocument();
});

test("has correct CSS classes", () => {
	render(<Logo />);

	const link = screen.getByRole("link");
	expect(link).toHaveClass("flex", "items-center", "gap-2", "font-semibold");
});
