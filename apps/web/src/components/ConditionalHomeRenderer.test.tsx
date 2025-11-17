import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ConditionalHomeRenderer from "./ConditionalHomeRenderer";
import React from "react";
import useAuthStore from "@/stores/auth-store";
import useHomeRendererStore from "@/stores/home-renderer-store";

// Mock Next.js modules
vi.mock("next/font/google", () => ({
	Fira_Code: vi.fn(() => ({
		className: "fira-code",
		variable: "--font-fira-code",
		style: { fontFamily: "Fira Code" },
	})),
}))

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(() => "/dashboard"),
}))

// Mock admin panel components
vi.mock("@/components/admin-panel/admin-panel-layout", () => ({
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="admin-panel-layout">{children}</div>
	),
}))

vi.mock("@/components/admin-panel/content-layout", () => ({
	ContentLayout: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="content-layout">{children}</div>
	),
}))

// Mock sections components
vi.mock("./sections/hero", () => ({
	default: () => <div data-testid="hero-section">Hero Section</div>,
}))

vi.mock("./CodePreview", () => ({
	default: () => <div data-testid="code-preview">Code Preview</div>,
}))

vi.mock("./sections/call-to-action", () => ({
	default: () => <div data-testid="cta-section">CTA Section</div>,
}))

// Mock store modules
vi.mock("@/stores/auth-store", () => ({
	default: vi.fn(),
}))

vi.mock("@/stores/home-renderer-store", () => ({
	default: vi.fn(),
}))

describe("ConditionalHomeRenderer", () => {
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	describe("when user is not authenticated", () => {
		beforeEach(() => {
			// Mock auth store to return false (not authenticated)
			vi.mocked(useAuthStore).mockImplementation((selector: any) =>
				selector({ isAuthenticated: false })
			);
			// Mock home renderer store
			vi.mocked(useHomeRendererStore).mockImplementation((selector: any) =>
				selector({ showPublicSite: false })
			);
		});

		it("should render public site components", () => {
			render(<ConditionalHomeRenderer />);

			expect(screen.getByTestId("hero-section")).toBeInTheDocument();
			expect(screen.getByTestId("code-preview")).toBeInTheDocument();
			expect(screen.getByTestId("cta-section")).toBeInTheDocument();

			expect(screen.queryByTestId("admin-panel-layout")).not.toBeInTheDocument();
		});
	});

	describe("when user is authenticated but showPublicSite is true", () => {
		beforeEach(() => {
			// Mock auth store to return true (authenticated)
			vi.mocked(useAuthStore).mockImplementation((selector: any) =>
				selector({ isAuthenticated: true })
			);
			// Mock home renderer store to show public site
			vi.mocked(useHomeRendererStore).mockImplementation((selector: any) =>
				selector({ showPublicSite: true })
			);
		});

		it("should render public site components", () => {
			render(<ConditionalHomeRenderer />);

			expect(screen.getByTestId("hero-section")).toBeInTheDocument();
			expect(screen.getByTestId("code-preview")).toBeInTheDocument();
			expect(screen.getByTestId("cta-section")).toBeInTheDocument();

			expect(screen.queryByTestId("admin-panel-layout")).not.toBeInTheDocument();
		});
	});

	describe("when user is authenticated and showPublicSite is false", () => {
		beforeEach(() => {
			// Mock auth store to return true (authenticated)
			vi.mocked(useAuthStore).mockImplementation((selector: any) =>
				selector({ isAuthenticated: true })
			);
			// Mock home renderer store to NOT show public site
			vi.mocked(useHomeRendererStore).mockImplementation((selector: any) =>
				selector({ showPublicSite: false })
			);
		});

		it("should render admin panel", () => {
			render(<ConditionalHomeRenderer />);

			expect(screen.getByTestId("admin-panel-layout")).toBeInTheDocument();
			expect(screen.getByTestId("content-layout")).toBeInTheDocument();

			expect(screen.queryByTestId("hero-section")).not.toBeInTheDocument();
			expect(screen.queryByTestId("code-preview")).not.toBeInTheDocument();
			expect(screen.queryByTestId("cta-section")).not.toBeInTheDocument();
		});
	});
});
