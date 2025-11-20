import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TeamsCard, { type TeamsCardProps } from "./teams-card";

describe("TeamsCard", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering Tests", () => {
		it("renders the card with provided props", () => {
			const props: TeamsCardProps = {
				title: "Teams",
				description: "Your team overview",
				teams: [
					{ id: 1, name: "Team Alpha", org: "Org One", members: 8 },
					{ id: 2, name: "Team Beta", org: "Org Two", members: 12 },
				],
			};

			render(<TeamsCard {...props} />);

			const title = screen.getByTestId("card-title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent(props.title);

			const description = screen.getByTestId("card-description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent(props.description);

			const content = screen.getByTestId("card-content");

			expect(content).toBeInTheDocument();
			props.teams.forEach((team) => {
				expect(content).toHaveTextContent(team.name);
				expect(content).toHaveTextContent(
					`${team.org} | ${team.members} members`,
				);
			});
		});
	});
});
