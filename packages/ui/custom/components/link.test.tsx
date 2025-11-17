import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Link } from "./link";

describe("Link Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render as anchor tag by default", () => {
		render(<Link href="/test">Test Link</Link>);

		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link.tagName).toBe("A");
		expect(link).toHaveAttribute("href", "/test");
	});

	it("should render external links with proper attributes", () => {
		render(
			<Link href="https://example.com" external>
				External Link
			</Link>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://example.com");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("should auto-detect external links starting with http", () => {
		render(<Link href="https://example.com">Auto External</Link>);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("auto-detects mailto links", () => {
		render(<Link href="mailto:test@example.com">Email Link</Link>);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("applies custom className", () => {
		render(
			<Link href="/test" className="custom-class">
				Styled Link
			</Link>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveClass("custom-class");
		expect(link).toHaveClass("transition-colors");
		expect(link).toHaveClass("hover:text-foreground/80");
	});

	it("renders with asChild pattern", () => {
		const CustomLink = ({ href, children, ...props }: any) => (
			<a href={href} data-testid="custom-link" {...props}>
				{children}
			</a>
		);

		render(
			<Link asChild>
				<CustomLink href="/custom">Custom Link Component</CustomLink>
			</Link>,
		);

		const link = screen.getByTestId("custom-link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/custom");
	});
});
