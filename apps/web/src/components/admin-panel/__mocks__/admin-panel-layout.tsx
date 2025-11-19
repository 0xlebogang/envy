export default function AdminPanelLayoutMock({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div data-testid="admin-panel-layout">{children}</div>;
}
