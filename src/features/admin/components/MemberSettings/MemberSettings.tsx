import { useState } from "react";
import MemberList from "./components/MemberList";
import MemberSettingsLayout from "./Layout/MemberSettingsLayout";
import MembershipConfig from "./components/MembershipConfig";
import RegistrationConfig from "./components/RegistrationConfig";
import AccessRulesConfig from "./components/AccessRulesConfig";
import FinancialConfig from "./components/FinancialConfig";
import PortalConfig from "./components/PortalConfig";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function MemberSettings() {
	const [activeSection, setActiveSection] = useState("database");

	const renderContent = () => {
		switch (activeSection) {
			case "database":
				return <MemberList />;
			case "membership":
				return <MembershipConfig />;
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
		>
			<div className="space-y-6">
				<div className="flex items-center justify-between pb-4 border-b">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-foreground">
							Member Settings
						</h1>
						<p className="text-muted-foreground mt-1">
							Control Panel for member lifecycle and rules.
						</p>
					</div>
					<Button>
						<Save className="mr-2 h-4 w-4" /> Save Configuration
					</Button>
				</div>

				{/* Render the active component */}
				<div className="min-h-[500px]">{renderContent()}</div>
			</div>
		</MemberSettingsLayout>
	);
}
