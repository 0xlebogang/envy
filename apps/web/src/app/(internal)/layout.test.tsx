import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Layout from "./layout";

describe("InternalLayout", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the AdminPanelLayout", () => {
		render(
			<Layout>
				<div data-testid="child-element">Test Child</div>
			</Layout>,
		);

		expect(screen.getByTestId("admin-panel-layout")).toBeInTheDocument();
	});

	it("should render children inside AdminPanelLayout", () => {
		render(
			<Layout>
				<div data-testid="child-element">Test Child</div>
			</Layout>,
		);

		expect(screen.getByTestId("child-element")).toBeInTheDocument();
		expect(screen.getByTestId("child-element")).toHaveTextContent("Test Child");
	});

	it("should not throw error when no children are provided", () => {
		expect(() => render(<Layout>{null}</Layout>)).not.toThrow();
	});
});
