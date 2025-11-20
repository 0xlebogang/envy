/**
 * Determines whether to show a component based on authentication status and public site flag.
 *
 * @param isAuthenticated User's authentication status
 * @param showPublicSite Flag indicating if the public site should be shown
 * @returns boolean indicating whether to show the component
 */
export function shouldShow(
	isAuthenticated: boolean,
	showPublicSite: boolean,
): boolean {
	// Returns true when:
	// 1. User is not authenticated (landing page)
	// 2. User is authenticated AND has enabled showPublicSite flag
	return !isAuthenticated || (isAuthenticated && showPublicSite);
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param str word to whose first letter needs to be capitalized
 * @returns word with first letter in uppercase
 */
export function capitalize(str: string): string {
	// Handle empty string case
	if (str.length === 0) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}
