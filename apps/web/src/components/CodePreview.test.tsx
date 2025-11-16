import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CodePreview from "./CodePreview";

vi.mock("next/font/google", () => ({
	Fira_Code: vi.fn(() => ({
		variable: "--font-mono-mock",
		className: "fira-code-mock",
	})),
}));

test("CodePreview component renders", () => {
	render(<CodePreview />);

	const codePreviewElement = screen.getByTestId("code-preview");
	expect(codePreviewElement).toBeInTheDocument();
});
