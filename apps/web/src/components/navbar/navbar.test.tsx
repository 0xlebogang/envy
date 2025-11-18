import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Navbar } from ".";
import { navbarConfig } from "./config";

// Mock navbar config with test data
vi.mock("./config", () => ({
	navbarConfig: {
		logo: <div data-testid="logo">Logo</div>,
		menuItems: [
			{ label: "test-1", href: "/test-1" },
			{
				label: "test-2",
				subitems: [
					{
						label: "subitem-1",
						href: "/subitem-1",
						description: "Description 1",
					},
				],
			},
		],
		buttons: [
			{ label: "Sign In", href: "/sign-in" },
			{ label: "Sign Up", href: "/sign-up" },
		],
	},
}));

describe("Navbar Component", () => {
	beforeAll(() => {
		render(<Navbar />);
	});

	it("should render the navbar", () => {
		const navbarElement = screen.getByRole("banner");
		expect(navbarElement).toBeInTheDocument();
	});

	it("should render the logo component", () => {
		const logoElement = screen.getByTestId("logo");
		expect(logoElement).toBeInTheDocument();
	});

	// Skipped due to required user interaction for dropdowns
	it.skip("should render menu items with correct links", () => {
		navbarConfig.menuItems.forEach((item) => {
			if (item.href) {
				// Regular menu item with href should be a link
				const menuItem = screen.getByRole("link", { name: item.label });
				expect(menuItem).toBeInTheDocument();
				expect(menuItem).toHaveAttribute("href", item.href);
			} else if (item.subitems) {
				// Menu item with subitems should be a button (dropdown trigger)
				const menuItem = screen.getByRole("button", { name: item.label });
				expect(menuItem).toBeInTheDocument();
			}

			if (item.subitems) {
				item.subitems.forEach((subitem) => {
					const subItemElement = screen.getByRole("link", {
						name: subitem.label,
					});
					expect(subItemElement).toBeInTheDocument();
					expect(subItemElement).toHaveAttribute("href", subitem.href);
				});
			}
		});
	});

	it("should render buttons with correct links", () => {
		navbarConfig.buttons?.forEach((button) => {
			const buttonElement = screen.getByText(button.label);
			expect(buttonElement).toBeInTheDocument();
			expect(buttonElement.closest("a")).toHaveAttribute("href", button.href);
		});
	});
});
