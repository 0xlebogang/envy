import { describe, expect, it, test } from "vitest";
import { capitalize, shouldShow } from "./utils";

describe("shouldShow", () => {
	describe("when user 'isAuthenticated' is true", () => {
		const isAuthenticated = true;

		it("should return true if 'showPublicSite' is true", () => {
			const showPublicSite = true;
			const result = shouldShow(isAuthenticated, showPublicSite);
			expect(result).toBe(true);
		});

		it("should return false if 'showPublicSite' is false", () => {
			const showPublicSite = false;
			const result = shouldShow(isAuthenticated, showPublicSite);
			expect(result).toBe(false);
		});
	});

	describe("when user 'isAuthenticated' is false", () => {
		const isAuthenticated = false;

		it("should return true regardless of 'showPublicSite' value", () => {
			const showPublicSiteTrue = true;
			const showPublicSiteFalse = false;

			const resultTrue = shouldShow(isAuthenticated, showPublicSiteTrue);
			const resultFalse = shouldShow(isAuthenticated, showPublicSiteFalse);

			expect(resultTrue).toBe(true);
			expect(resultFalse).toBe(true);
		});
	});
});

describe("capitalize", () => {
	it("should handle empty string", () => {
		const result = capitalize("");
		expect(result).toBe("");
	});

	it("should capitalize single lowercase letter", () => {
		const result = capitalize("a");
		expect(result).toBe("A");
	});

	it("should capitalize first letter of a word", () => {
		const result = capitalize("test");
		expect(result).toBe("Test");
	});
});
