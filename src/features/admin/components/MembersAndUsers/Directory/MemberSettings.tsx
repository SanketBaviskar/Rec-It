import { useState, useMemo } from "react";
import MemberList from "./components/MemberList";
import MemberSettingsLayout from "./Layout/MemberSettingsLayout";
import RegistrationConfig from "./components/RegistrationConfig";
import AccessRulesConfig from "./components/AccessRulesConfig";
import FinancialConfig from "./components/FinancialConfig";
import PortalConfig from "./components/PortalConfig";

// Section titles for dynamic header
const SECTION_TITLES: Record<string, { title: string; description: string }> = {
	database: {
		title: "Member Database",
		description: "View and manage all registered members.",
	},
	registration: {
		title: "Registration & Onboarding",
		description: "Configure the intake process for new members.",
	},
	access: {
		title: "Access Control & Check-in",
		description: "Manage physical access rules and hardware integration.",
	},
	financial: {
		title: "Billing & Financial Rules",
		description: "Manage payments, taxes, and fees.",
	},
	portal: {
		title: "Member Portal Permissions",
		description:
			"Control what actions members can perform themselves online.",
	},
};

export default function MemberSettings() {
	const [activeSection, setActiveSection] = useState("database");

	// Mock member count for badge
	const counts = useMemo(
		() => ({
			members: 5, // This would come from actual data in a real app
		}),
		[]
	);

	const currentSection = SECTION_TITLES[activeSection] || {
		title: "Member Settings",
		description: "Control Panel for member lifecycle and rules.",
	};

	const renderContent = () => {
		switch (activeSection) {
			case "database":
				return <MemberList />;
			case "registration":
				return <RegistrationConfig />;
			case "access":
				return <AccessRulesConfig />;
			case "financial":
				return <FinancialConfig />;
			case "portal":
				return <PortalConfig />;
			default:
				return <div>Section not found</div>;
		}
	};

	return (
		<MemberSettingsLayout
			activeSection={activeSection}
			onSectionChange={setActiveSection}
			counts={counts}
		>
			<div className="space-y-6">
				{/* Dynamic Header */}
				<div className="pb-4 border-b">
					<h1 className="text-2xl font-bold tracking-tight text-foreground">
						{currentSection.title}
					</h1>
					<p className="text-muted-foreground mt-1">
						{currentSection.description}
					</p>
				</div>

				{/* Render the active component */}
				<div className="min-h-[500px]">{renderContent()}</div>
			</div>
		</MemberSettingsLayout>
	);
}
