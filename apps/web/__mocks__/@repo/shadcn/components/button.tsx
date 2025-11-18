export function Button({ children, variant, asChild, ...props }: any) {
	if (asChild) {
		// When asChild is true, render the children directly (usually a Link)
		return children;
	}
	return <button {...props}>{children}</button>;
}
