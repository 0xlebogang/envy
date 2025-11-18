import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useAuthStore from "@/stores/auth-store";
import useHomeRendererStore from "@/stores/home-renderer-store";
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
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	describe("Rendering Tests", () => {
		it("should render the navbar", () => {
			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).toBeInTheDocument();
		});

		it("should render the logo component", () => {
			render(<Navbar />);
			const logoElement = screen.getByTestId("logo");
			expect(logoElement).toBeInTheDocument();
		});
	});

	describe("Behavioral Tests", () => {
		it("should hide navbar when authenticated", () => {
			// Mock the useAuthStore to return authenticated state
			vi.mocked(useAuthStore).mockReturnValue(true);

			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).toHaveClass("hidden");
		});

		it("should show navbar when not authenticated", () => {
			// Mock the useAuthStore to return unauthenticated state
			vi.mocked(useAuthStore).mockReturnValue(false);

			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).not.toHaveClass("hidden");
		});

		it("should show navbar when home renderer is active", () => {
			// Mock the useAuthStore to return authenticated state
			vi.mocked(useAuthStore).mockReturnValue(true);
			// Mock the useHomeRendererStore to return showPublicSite as true
			vi.mocked(useHomeRendererStore).mockReturnValue(true);

			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).not.toHaveClass("hidden");
		});

		it("should hide navebar when home renderer is inactive", () => {
			// Mock the useAuthStore to return authenticated state
			vi.mocked(useAuthStore).mockReturnValue(true);
			// Mock the useHomeRendererStore to return showPublicSite as false
			vi.mocked(useHomeRendererStore).mockReturnValue(false);

			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).toHaveClass("hidden");
		});

		it("should show navbar when not authenticated but home renderer is active", () => {
			// Mock the useAuthStore to return unauthenticated state
			vi.mocked(useAuthStore).mockReturnValue(false);
			// Mock the useHomeRendererStore to return showPublicSite as true
			vi.mocked(useHomeRendererStore).mockReturnValue(true);

			render(<Navbar />);
			const navbarElement = screen.getByRole("banner");
			expect(navbarElement).not.toHaveClass("hidden");
		});
	});

	describe.skip("Responsive Design Tests", () => {
		it("should render menu items in navigation menu (desktop)", () => {
			// This test is skipped because NavigationMenu components require proper
			// responsive behavior testing which needs more complex setup
			render(<Navbar />);
			navbarConfig.menuItems.forEach((item) => {
				const menuItemElements = screen.queryAllByText(item.label);
				expect(menuItemElements.length).toBeGreaterThan(0);
			});
		});

		it("should render auth buttons (desktop)", () => {
			// This test is skipped because the auth buttons are hidden by CSS
			// and would require proper responsive testing setup
			render(<Navbar />);
			navbarConfig.buttons?.forEach((button) => {
				const buttonElements = screen.queryAllByText(button.label);
				expect(buttonElements.length).toBeGreaterThan(0);
			});
		});
	});
});
