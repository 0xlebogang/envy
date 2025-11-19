import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CodePreview from "./code-preview";

test("CodePreview component renders", () => {
	render(<CodePreview />);

	const codePreviewElement = screen.getByTestId("code-preview");
	expect(codePreviewElement).toBeInTheDocument();
});
