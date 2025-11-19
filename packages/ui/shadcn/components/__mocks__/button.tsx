import * as React from 'react'

export const Button = ({ children, asChild, ...props }: any) => {
	if (asChild) {
		return React.cloneElement(children, { ...props });
	}
	return <button {...props}>{children}</button>;
};
