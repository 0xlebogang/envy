import * as React from "react";

export const Menu = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="menu-icon" {...props}>
		<title>Menu</title>
	</svg>
));

Menu.displayName = "Menu";
