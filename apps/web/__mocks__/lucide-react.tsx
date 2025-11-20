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

export const Building2 = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="building-icon" {...props}>
		<title>Building2</title>
	</svg>
));

Building2.displayName = "Building2";

export const Users = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="users-icon" {...props}>
		<title>Users</title>
	</svg>
));

Users.displayName = "Users";

export const FolderGit2 = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="git-folder-icon" {...props}>
		<title>FolderGit2</title>
	</svg>
));

FolderGit2.displayName = "FolderGit2";

export const Variable = React.forwardRef<
	SVGSVGElement,
	React.SVGProps<SVGSVGElement>
>((props, ref) => (
	<svg ref={ref} data-testid="variable-icon" {...props}>
		<title>Variable</title>
	</svg>
));

Variable.displayName = "Variable";
