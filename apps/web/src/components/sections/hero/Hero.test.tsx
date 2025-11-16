import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import Hero from ".";
import { heroConfig } from "./config";

describe("Hero Component", () => {
	beforeAll(() => {
		render(<Hero />);
	});

	it("should render the hero section", () => {
		const heroElement = screen.getByTestId("hero-section");
		expect(heroElement).toBeInTheDocument();
	});

	it("should render the header text", () => {
		const headerText = heroConfig.header.split(" ").slice(0, -1).join(" ");
		const headerElement = screen.getByText(headerText);
		expect(headerElement).toBeInTheDocument();
	});

	it("should render the subheader text", () => {
		const subheaderElement = screen.getByText(heroConfig.subheader);
		expect(subheaderElement).toBeInTheDocument();
	});

	it("should render action buttons with correct labels and links", () => {
		heroConfig.actions.forEach((action) => {
			const actionElement = screen.getByRole("link", { name: action.label });
			expect(actionElement).toBeInTheDocument();
			expect(actionElement).toHaveAttribute("href", action.href);
		});
	});

	it("should render the tag with icon and text", () => {
		const tagElement = screen.getByText(heroConfig.tag.text);
		expect(tagElement).toBeInTheDocument();
		// Check that the star icon is present in the tag container
		const tagContainer = tagElement.closest("div");
		expect(tagContainer?.querySelector("svg")).toBeInTheDocument();
	});
});
