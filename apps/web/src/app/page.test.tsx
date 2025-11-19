import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Index from "./page";

vi.mock("@/components/sections/hero");
vi.mock("@/components/code-preview");
vi.mock("@/components/sections/call-to-action");

describe("Home Page", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render Hero component", () => {
		render(<Index />);
		expect(screen.getByTestId("hero-section")).toBeInTheDocument();
	});

	it("should render CodePreview component", () => {
		render(<Index />);
		expect(screen.getByTestId("code-preview")).toBeInTheDocument();
	});

	it("should render CTA component", () => {
		render(<Index />);
		expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
	});
});
