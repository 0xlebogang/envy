import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import CTA from ".";
import { ctaConfig } from "./config";

describe("CTA Component", () => {
	beforeAll(() => {
		render(<CTA />);
	});

	it("should render the CTA section", () => {
		const ctaElement = screen.getByTestId("cta-section");
		expect(ctaElement).toBeInTheDocument();
	});

	it("should render the header and subheader", () => {
		const headerElement = screen.getByText(ctaConfig.header);
		const subheaderElement = screen.getByText(ctaConfig.subheader);

		expect(headerElement).toBeInTheDocument();
		expect(subheaderElement).toBeInTheDocument();
	});

	it("should render the buttons with correct links and labels", () => {
		ctaConfig.buttons.forEach((button) => {
			const buttonElement = screen.getByRole("link", { name: button.label });
			expect(buttonElement).toBeInTheDocument();
			expect(buttonElement).toHaveAttribute("href", button.href);
		});
	});
});
