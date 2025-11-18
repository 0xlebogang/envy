import { Button } from "@repo/shadcn/components/button";
import { cleanup, render, screen } from "@testing-library/react";
import Link from "next/link";
import * as React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Hero from ".";
import { heroConfig } from "./config";

vi.mock("@repo/shadcn/components/button", () => ({
	Button: ({ children, asChild, ...props }: any) => {
		if (asChild) {
			// When asChild is true, we need to clone the child and pass props to it
			if (React.isValidElement(children)) {
				const childProps = children.props || {};
				return React.cloneElement(children, { ...props, ...childProps });
			}
			return children;
		}
		return <button {...props}>{children}</button>;
	},
}));

vi.mock("./config", () => ({
	heroConfig: {
		tag: {
			icon: (
				<svg data-testid="star-icon">
					<title>Star</title>
				</svg>
			),
			text: "tag test",
		},
		header: "Hero Header Test",
		subheader: "test subheader",
		actions: [
			{
				icon: (
					<svg data-testid="terminal-icon">
						<title>Terminal</title>
					</svg>
				),
				label: "Action 1",
				variant: "default",
				href: "/action-1",
			},
			{
				icon: (
					<svg data-testid="github-icon">
						<title>GitHub</title>
					</svg>
				),
				label: "Action 2",
				href: "/action-2",
				variant: "secondary",
				external: true,
			},
		],
	},
}));

describe("Hero Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the hero section", () => {
		render(<Hero />);

		const heroElement = screen.getByTestId("hero-section");
		expect(heroElement).toBeInTheDocument();
	});

	it("should render the header text", () => {
		render(<Hero />);

		const headerText = heroConfig.header.split(" ").slice(0, -1).join(" ");
		const headerElement = screen.getByText(headerText);
		expect(headerElement).toBeInTheDocument();
	});

	it("should render the subheader text", () => {
		render(<Hero />);

		const subheaderElement = screen.getByText(heroConfig.subheader);
		expect(subheaderElement).toBeInTheDocument();
	});

	it("should render action buttons with correct labels and links", () => {
		render(<Hero />);

		heroConfig.actions.forEach((action) => {
			// The accessible name includes both the icon title and the action label
			const actionElement = screen.getByRole("link", {
				name: new RegExp(action.label),
			});
			expect(actionElement).toBeInTheDocument();
			expect(actionElement).toHaveAttribute("href", action.href);
		});
	});

	it("should render the tag with icon and text", () => {
		render(<Hero />);

		const tagElement = screen.getByText(heroConfig.tag.text);
		expect(tagElement).toBeInTheDocument();
		// Check that the star icon is present in the tag container
		const tagContainer = tagElement.closest("div");
		expect(tagContainer?.querySelector("svg")).toBeInTheDocument();
	});
});
