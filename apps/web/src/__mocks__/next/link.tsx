export default function MockNextLink({
	children,
	href,
	...props
}: {
	children: React.ReactNode;
	href: string;
}) {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
}
