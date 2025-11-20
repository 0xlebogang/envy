import { cleanup, render, screen } from "@testing-library/react";
import { i } from "node_modules/vitest/dist/chunks/moduleRunner.d.CzOZ_4wC";
import { afterEach, describe, expect, it, vi } from "vitest";
import Dashboard, { getIcon } from "./page";

vi.mock("@/lib/utils");
vi.mock("./organizations-card");
vi.mock("./projects-card");
vi.mock("./stats-card");
vi.mock("./teams-card");

describe("Dashboard Page", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering Tests", () => {
		it("should render the dashboard page", () => {
			render(<Dashboard />);
			const dashboardElement = screen.getByTestId("dashboard");
			expect(dashboardElement).toBeInTheDocument();
		});

		it("should render dashboard header", () => {
			render(<Dashboard />);
			const headerElement = screen.getByText(
				/Overview of your environment variables and secrets/i,
			);
			expect(headerElement).toBeInTheDocument();
		});

		it("should render stats cards", () => {
			render(<Dashboard />);
			const statsCardElements = screen.getAllByTestId("stats-card");
			expect(statsCardElements.length).toBeGreaterThanOrEqual(1); // At least one stats card should be rendered
		});

		it("should render projects card", () => {
			render(<Dashboard />);
			const projectsCardElement = screen.getByTestId("projects-card");
			expect(projectsCardElement).toBeInTheDocument();
		});

		it("should render organizations card", () => {
			render(<Dashboard />);
			const organizationsCardElement = screen.getByTestId("organizations-card");
			expect(organizationsCardElement).toBeInTheDocument();
		});

		it("should render teams card", () => {
			render(<Dashboard />);
			const teamsCardElement = screen.getByTestId("teams-card");
			expect(teamsCardElement).toBeInTheDocument();
		});
	});
});

describe("getIcon Utility Function", () => {
	it.each([
		{ key: "organizations", expectedIconTestId: "building-icon" },
		{ key: "projects", expectedIconTestId: "git-folder-icon" },
		{ key: "teams", expectedIconTestId: "users-icon" },
		{ key: "unknown", expectedIconTestId: "variable-icon" }, // Default case
	])("should return correct icon", ({ key, expectedIconTestId }) => {
		const IconComponent = getIcon(key);
		const { getByTestId } = render(IconComponent);
		const iconElement = getByTestId(expectedIconTestId);
		expect(iconElement).toBeInTheDocument();
	});
});
