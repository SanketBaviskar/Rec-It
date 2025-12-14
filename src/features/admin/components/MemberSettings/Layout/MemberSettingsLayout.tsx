import { ReactNode } from "react";
import MemberSettingsSidebar from "./MemberSettingsSidebar";

interface MemberSettingsLayoutProps {
	children: ReactNode;
	activeSection: string;
	onSectionChange: (section: string) => void;
}

export default function MemberSettingsLayout({
	children,
	activeSection,
	onSectionChange,
}: MemberSettingsLayoutProps) {
	return (
		<div className="flex h-full bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<MemberSettingsSidebar
				activeSection={activeSection}
				onSectionChange={onSectionChange}
			/>

			{/* Main Content Area */}
			<main className="flex-1 overflow-y-auto p-8">
				<div className="max-w-4xl mx-auto">{children}</div>
			</main>
		</div>
	);
}
