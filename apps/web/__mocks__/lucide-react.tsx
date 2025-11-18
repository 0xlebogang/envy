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

export const FileQuestion = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="menu-icon" {...props}>
		<title>Menu</title>
	</svg>
));

FileQuestion.displayName = "FileQuestion";

export const Lock = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="lock-icon" {...props}>
		<title>Lock</title>
	</svg>
));

Lock.displayName = "Lock";
