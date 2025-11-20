import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import OrganizationsCard, {
	type OrganizationsCardProps,
} from "./organizations-card";

describe("OrganizationsCard", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering Tests", () => {
		it("renders the card with provided props", () => {
			const props: OrganizationsCardProps = {
				title: "Organizations",
				description: "Your organization overview",
				organizations: [
					{ id: 1, name: "Org One", teams: 5, projects: 10 },
					{ id: 2, name: "Org Two", teams: 3, projects: 7 },
				],
			};

			render(<OrganizationsCard {...props} />);

			const title = screen.getByTestId("card-title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent(props.title);

			const description = screen.getByTestId("card-description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent(props.description);

			const content = screen.getByTestId("card-content");

			expect(content).toBeInTheDocument();
			props.organizations.forEach((org) => {
				expect(content).toHaveTextContent(org.name);
				expect(content).toHaveTextContent(
					`${org.teams} teams | ${org.projects} projects`,
				);
			});
		});
	});
});
