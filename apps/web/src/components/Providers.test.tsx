import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Providers } from "./Providers";

// Mock window.matchMedia for NextThemesProvider
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => {},
	}),
});

describe("Providers", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render children correctly", () => {
		render(
			<Providers>
				<div>Test content</div>
			</Providers>,
		);

		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should wrap children with NextThemesProvider", () => {
		const { container } = render(
			<Providers>
				<div data-testid="child">Child content</div>
			</Providers>,
		);

		expect(screen.getByTestId("child")).toBeInTheDocument();
		expect(container.firstChild).toBeTruthy();
	});

	it("renders without crashing when no children provided", () => {
		expect(() => render(<Providers>{null}</Providers>)).not.toThrow();
	});
});
