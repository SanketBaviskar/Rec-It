import { ReactNode } from "react";
import MembershipSidebar from "./MembershipSidebar";

interface MembershipLayoutProps {
	children: ReactNode;
	activeSection: string;
	onSectionChange: (section: string) => void;
	counts?: {
		plans?: number;
		passes?: number;
		households?: number;
	};
}

export default function MembershipLayout({
	children,
	activeSection,
	onSectionChange,
	counts = {},
}: MembershipLayoutProps) {
	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<MembershipSidebar
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
