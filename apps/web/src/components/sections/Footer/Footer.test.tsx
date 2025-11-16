import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
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

describe("Footer", () => {
	beforeAll(() => {
		render(<Footer />);
	});

	it("should render footer", () => {
		const footerElement = screen.getByRole("contentinfo");
		expect(footerElement).toBeInTheDocument();
	});

	it("should render logo component", () => {
		const logoElement = screen.getByTestId("footer-logo");
		expect(logoElement).toBeInTheDocument();
	});

	it("should render internal and external links", () => {
		const internalLink = screen.getByRole("link", { name: "test1" });
		const externalLink = screen.getByRole("link", { name: "test2" });

		expect(internalLink).toBeInTheDocument();
		expect(internalLink).toHaveAttribute("href", "/test-link-1");

		expect(externalLink).toBeInTheDocument();
		expect(externalLink).toHaveAttribute("href", "/test-link-2");
	});
});
