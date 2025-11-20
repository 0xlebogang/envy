import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ProjectsCard, { type ProjectsCardProps } from "./projects-card";

describe("ProjectsCard", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering Tests", () => {
		it("renders the card with provided props", () => {
			const props: ProjectsCardProps = {
				title: "Projects",
				description: "Your project overview",
				projects: [
					{ id: 1, name: "Project One", team: "Team A", variables: 15 },
					{ id: 2, name: "Project Two", team: "Team B", variables: 8 },
				],
			};

			render(<ProjectsCard {...props} />);

			const title = screen.getByTestId("card-title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent(props.title);

			const description = screen.getByTestId("card-description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent(props.description);

			const content = screen.getByTestId("card-content");
			expect(content).toBeInTheDocument();

			props.projects.forEach((project) => {
				const projectName = screen.getByText(project.name);
				expect(projectName).toBeInTheDocument();

				const projectDetails = screen.getByText(
					`${project.team} | ${project.variables} vars`,
				);
				expect(projectDetails).toBeInTheDocument();
			});
		});
	});
});
