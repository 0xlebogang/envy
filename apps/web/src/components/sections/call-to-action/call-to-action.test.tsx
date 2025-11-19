import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CTA from ".";
import { ctaConfig } from "./config";

describe("CTA Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the CTA section", () => {
		render(<CTA />);

		const ctaElement = screen.getByTestId("cta-section");
		expect(ctaElement).toBeInTheDocument();
	});

	it("should render the header and subheader", () => {
		render(<CTA />);

		const headerElement = screen.getByText(ctaConfig.header);
		const subheaderElement = screen.getByText(ctaConfig.subheader);

		expect(headerElement).toBeInTheDocument();
		expect(subheaderElement).toBeInTheDocument();
	});

	it("should render the buttons with correct links and labels", () => {
		render(<CTA />);

		ctaConfig.buttons.forEach((button) => {
			const buttonElement = screen.getByRole("link", { name: button.label });
			expect(buttonElement).toBeInTheDocument();
			expect(buttonElement).toHaveAttribute("href", button.href);
		});
	});
});
