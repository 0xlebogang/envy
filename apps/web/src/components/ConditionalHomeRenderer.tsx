'use client'

import useAuthStore from "@/stores/auth-store"
import Hero from "./sections/hero";
import CodePreview from "./CodePreview";
import CTA from "./sections/call-to-action";
import AdminPanelLayout from "./admin-panel/admin-panel-layout";
import { ContentLayout } from "./admin-panel/content-layout";
import useHomeRendererStore from "@/stores/home-renderer-store";

export default function ConditionalHomeRenderer() {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const showPublicSite = useHomeRendererStore(state => state.showPublicSite);

	if (!isAuthenticated || showPublicSite) {
		return (
			<>
				<Hero />
				<CodePreview />
				<CTA />
			</>
		)
	}

	return (
		<AdminPanelLayout>
			<ContentLayout title="Test">
				<h1>Welcome to the Admin Panel</h1>
			</ContentLayout>
		</AdminPanelLayout>
	)
}
