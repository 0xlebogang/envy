import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Index from "./page";

vi.mock("next/font/google", () => ({
	Fira_Code: () => ({
		subsets: ["latin"],
		variable: "--font-sans",
	}),
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
