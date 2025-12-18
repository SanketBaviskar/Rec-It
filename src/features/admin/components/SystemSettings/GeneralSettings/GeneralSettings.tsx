import { useState } from "react";
import SettingsLayout from "./Layout/SettingsLayout";
import OrganizationSettings from "./components/OrganizationSettings";
import OperatingHoursSettings from "./components/OperatingHoursSettings";
import BookingPoliciesSettings from "./components/BookingPoliciesSettings";
import EmailSettings from "./components/EmailSettings";
import AccessControlSettings from "./components/AccessControlSettings";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function GeneralSettings() {
	const [activeSection, setActiveSection] = useState("profile");

	const renderContent = () => {
		switch (activeSection) {
			case "profile":
				return <OrganizationSettings />;
			case "hours":
				return <OperatingHoursSettings />;
			case "policies":
				return <BookingPoliciesSettings />;
			case "notifications":
				return <EmailSettings />;
			case "access":
				return <AccessControlSettings />;
			default:
				return (
					<div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
						<p>This setting module is coming soon.</p>
					</div>
				);
		}
	};

	return (
		<SettingsLayout
			activeSection={activeSection}
			onSectionChange={setActiveSection}
		>
			<div className="space-y-6">
				<div className="flex items-center justify-between pb-4 border-b">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-foreground">
							General Settings
						</h1>
						<p className="text-muted-foreground mt-1">
							Manage your system configurations.
						</p>
					</div>
					<Button>
						<Save className="mr-2 h-4 w-4" /> Save Changes
					</Button>
				</div>

				{/* Render the active component */}
				<div className="min-h-[500px]">{renderContent()}</div>
			</div>
		</SettingsLayout>
	);
}
