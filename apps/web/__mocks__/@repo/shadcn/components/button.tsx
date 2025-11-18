export const Button = () => {
	Button: ({ children, asChild, ...props }: any) => {
		if (asChild) {
			return children;
		}
		return <button {...props}>{children}</button>;
	};
};
