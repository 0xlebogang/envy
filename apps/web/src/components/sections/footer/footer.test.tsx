import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import useAuthStore from "@/stores/auth-store";
import useHomeRendererStore from "@/stores/home-renderer-store";
import Footer from ".";

vi.mock("./config", () => ({
	footerConfig: {
		logo: <div data-testid="footer-logo">Mock Logo</div>,
		links: [
			{ href: "/test-link-1", label: "test1", external: false },
			{ href: "/test-link-2", label: "test2", external: true },
		],
	},
}));

describe("Footer Component", () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	describe("Rendering Tests", () => {
		it("should render the footer", () => {
			render(<Footer />);
			const footerElement = screen.getByRole("contentinfo");
			expect(footerElement).toBeInTheDocument();
		});

		it("should render the logo component", () => {
			render(<Footer />);
			const logoElement = screen.getByTestId("footer-logo");
			expect(logoElement).toBeInTheDocument();
		});

		it("should render internal and external links", () => {
			render(<Footer />);
			const internalLink = screen.getByRole("link", { name: "test1" });
			const externalLink = screen.getByRole("link", { name: "test2" });

			expect(internalLink).toBeInTheDocument();
			expect(internalLink).toHaveAttribute("href", "/test-link-1");

			expect(externalLink).toBeInTheDocument();
			expect(externalLink).toHaveAttribute("href", "/test-link-2");
		});
	});

	describe("Behavioral Tests", () => {
		it("should show footer when authenticated and showPublicSite is true", () => {
			// Mock the useAuthStore to return authenticated state
			vi.mocked(useAuthStore).mockReturnValue(true);
			// Mock the useHomeRendererStore to return showPublicSite as true
			vi.mocked(useHomeRendererStore).mockReturnValue(true);

			render(<Footer />);
			const footerElement = screen.getByRole("contentinfo");
			expect(footerElement).not.toHaveClass("hidden");
		});

		it("should hide footer when authenticated and showPublicSite is false", () => {
			// Mock the useAuthStore to return authenticated state
			vi.mocked(useAuthStore).mockReturnValue(true);
			// Mock the useHomeRendererStore to return showPublicSite as false
			vi.mocked(useHomeRendererStore).mockReturnValue(false);

			render(<Footer />);
			const footerElement = screen.getByRole("contentinfo");
			expect(footerElement).toHaveClass("hidden");
		});
	});
});
