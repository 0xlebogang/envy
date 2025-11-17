import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CodePreview from "@/components/CodePreview";
import CTA from "@/components/sections/call-to-action";
import Hero from "@/components/sections/hero";

let isAuthenticated: boolean;

if (process.env.NODE_ENV !== "production") {
	// Replace with actual authentication check once protected routes are implemented
	isAuthenticated = true;
}

export default function Index() {
	if (!isAuthenticated) {
		return (
			<>
				<Hero />
				<CodePreview />
				<CTA />
			</>
		);
	}

	return (
		<AdminPanelLayout>
			<ContentLayout title="TEST">
				<p>Welcome to the admin panel!</p>
			</ContentLayout>
		</AdminPanelLayout>
	);
}
