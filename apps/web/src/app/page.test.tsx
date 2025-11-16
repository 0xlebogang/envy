import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Index from "./page";

vi.mock("@/components/CodePreview", () => ({
	default: function MockCodePreview() {
		return <div data-testid="code-preview">CodePreview Component</div>;
	},
}));

vi.mock("@/components/sections/CTA", () => ({
	default: function MockCTA() {
		return <div data-testid="cta-section">CTA Component</div>;
	},
}));

vi.mock("@/components/sections/Hero", () => ({
	default: function MockHero() {
		return <div data-testid="hero-section">Hero Component</div>;
	},
}));

describe("Home Page", () => {
	beforeAll(() => {
		render(<Index />);
	});

	it("should render the Hero section", () => {
		const heroElement = screen.getByTestId("hero-section");
		expect(heroElement).toBeInTheDocument();
	});

	it("should render the CodePreview component", () => {
		const codePreviewElement = screen.getByTestId("code-preview");
		expect(codePreviewElement).toBeInTheDocument();
	});

	it("should render the CTA section", () => {
		const ctaElement = screen.getByTestId("cta-section");
		expect(ctaElement).toBeInTheDocument();
	});
});
