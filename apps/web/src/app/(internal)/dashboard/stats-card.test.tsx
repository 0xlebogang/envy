import { cleanup, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import StatsCard from "./stats-card";

test("should render the StatsCard component", () => {
	const title = "test title";
	const value = 1234;
	const icon = <svg data-testid="test-icon" />;

	render(<StatsCard title={title} value={value} icon={icon} />);

	expect(screen.getByText(title)).toBeInTheDocument();
	expect(screen.getByText(value.toString())).toBeInTheDocument();
	expect(screen.getByTestId("test-icon")).toBeInTheDocument();
});
