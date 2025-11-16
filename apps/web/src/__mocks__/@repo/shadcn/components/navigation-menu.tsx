export const NavigationMenu = ({ children, ...props }: any) => (
	<nav data-testid="navigation-menu" {...props}>
		{children}
	</nav>
);

export const NavigationMenuList = ({ children, ...props }: any) => (
	<ul data-testid="navigation-menu-list" {...props}>
		{children}
	</ul>
);

export const NavigationMenuItem = ({ children, ...props }: any) => (
	<li data-testid="navigation-menu-item" {...props}>
		{children}
	</li>
);

export const NavigationMenuTrigger = ({ children, ...props }: any) => (
	<button data-testid="navigation-menu-trigger" {...props}>
		{children}
	</button>
);

export const NavigationMenuContent = ({ children, ...props }: any) => (
	<div data-testid="navigation-menu-content" {...props}>
		{children}
	</div>
);

export const NavigationMenuLink = ({ children, asChild, ...props }: any) => {
	if (asChild) {
		// When asChild is true, render the children directly (usually a Link)
		return children;
	}
	return (
		<a data-testid="navigation-menu-link" {...props}>
			{children}
		</a>
	);
};

export const NavigationMenuIndicator = ({ ...props }: any) => (
	<div data-testid="navigation-menu-indicator" {...props} />
);

export const NavigationMenuViewport = ({ ...props }: any) => (
	<div data-testid="navigation-menu-viewport" {...props} />
);

export const navigationMenuTriggerStyle = () => "mock-trigger-style";
