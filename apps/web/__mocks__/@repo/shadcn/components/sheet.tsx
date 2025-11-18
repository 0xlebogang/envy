export const Sheet = ({ children, ...props }: React.PropsWithChildren<any>) => (
	<div data-testid="sheet" {...props}>
		{children}
	</div>
);

export const SheetTrigger = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<button data-testid="sheet-trigger" {...props}>
		{children}
	</button>
);

export const SheetClose = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<button data-testid="sheet-close" {...props}>
		{children}
	</button>
);

export const SheetPortal = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<div data-testid="sheet-portal" {...props}>
		{children}
	</div>
);

export const SheetOverlay = ({ ...props }: any) => (
	<div data-testid="sheet-overlay" {...props} />
);

export const SheetContent = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<div data-testid="sheet-content" {...props}>
		{children}
	</div>
);

export const SheetHeader = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<div data-testid="sheet-header" {...props}>
		{children}
	</div>
);

export const SheetFooter = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<div data-testid="sheet-footer" {...props}>
		{children}
	</div>
);

export const SheetTitle = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<h2 data-testid="sheet-title" {...props}>
		{children}
	</h2>
);

export const SheetDescription = ({
	children,
	...props
}: React.PropsWithChildren<any>) => (
	<p data-testid="sheet-description" {...props}>
		{children}
	</p>
);
