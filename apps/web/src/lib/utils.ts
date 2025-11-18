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
