import { ReactNode } from "react";
import SettingsSidebar from "./SettingsSidebar";

interface SettingsLayoutProps {
	children: ReactNode;
	activeSection: string;
	onSectionChange: (section: string) => void;
}

export default function SettingsLayout({
	children,
	activeSection,
	onSectionChange,
}: SettingsLayoutProps) {
	return (
		<div className="flex h-full bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<SettingsSidebar
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
