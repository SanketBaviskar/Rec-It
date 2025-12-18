import { ReactNode } from "react";
import MemberSettingsSidebar from "./MemberSettingsSidebar";

interface MemberSettingsLayoutProps {
	children: ReactNode;
	activeSection: string;
	onSectionChange: (section: string) => void;
	counts?: {
		members?: number;
	};
}

export default function MemberSettingsLayout({
	children,
	activeSection,
	onSectionChange,
	counts = {},
}: MemberSettingsLayoutProps) {
	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<MemberSettingsSidebar
				activeSection={activeSection}
				onSectionChange={onSectionChange}
				counts={counts}
			/>

			{/* Main Content Area */}
			<main className="flex-1 overflow-y-auto p-6">
				<div className="mx-auto w-full max-w-7xl pb-10">{children}</div>
			</main>
		</div>
	);
}
