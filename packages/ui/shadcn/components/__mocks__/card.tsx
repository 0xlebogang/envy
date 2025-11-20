export const Card = ({ children, ...props }: { children: React.ReactNode }) => (
	<div data-testid="card-wrapper" {...props}>{children}</div>
);

export const CardHeader = ({ children, ...props }: { children: React.ReactNode; className?: string }) => (
	<div data-testid="card-header" {...props}>
		{children}
	</div>
);

export const CardTitle = ({ children, ...props }: { children: React.ReactNode; className?: string }) => (
	<h3 data-testid="card-title" {...props}>
		{children}
	</h3>
);

export const CardContent = ({ children, ...props }: { children: React.ReactNode; className?: string }) => (
	<div data-testid="card-content" {...props}>
		{children}
	</div>
);
