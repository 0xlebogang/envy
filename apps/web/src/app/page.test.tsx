import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Index from "./page";

vi.mock("next/font/google", () => ({
	Fira_Code: () => ({
		subsets: ["latin"],
		variable: "--font-sans",
	}),
}));

vi.mock("@/components/ConditionalHomeRenderer", () => ({
	default: () => (
		<div data-testid="conditional-home-renderer">
			ConditionalHomeRenderer Component
		</div>
	),
}));

describe("Home Page", () => {
	beforeAll(() => {
		render(<Index />);
	});

	it("should render the ConditionalHomeRenderer component", () => {
		const conditionalHomeRenderer = screen.getByTestId(
			"conditional-home-renderer",
		);
		expect(conditionalHomeRenderer).toBeInTheDocument();
	});
});
