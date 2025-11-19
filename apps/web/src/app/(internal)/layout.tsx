import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

interface InternalLayoutProps {
	children: Readonly<React.ReactNode>;
}

export default function InternalLayout({ children }: InternalLayoutProps) {
	return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
