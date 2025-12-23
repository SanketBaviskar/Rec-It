import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Save,
	RotateCcw,
	AlertTriangle,
	FileText,
	Bell,
	GitBranch,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { useIncidentConfig } from "./useIncidentConfig";

// Components
import IncidentTypes from "./components/IncidentTypes";
import ReportingRequirements from "./components/ReportingRequirements";
import NotificationSettings from "./components/NotificationSettings";
import WorkflowSettings from "./components/WorkflowSettings";

export default function IncidentConfig() {
	const { resetConfig } = useIncidentConfig();
	const [activeSection, setActiveSection] = useState("types");
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Incident reporting configuration has been updated.",
		});
	};

	const handleReset = () => {
		if (
			confirm(
				"Are you sure you want to reset all settings to defaults? This action cannot be undone."
			)
		) {
			resetConfig();
			toast({
				title: "Settings Reset",
				description: "Incident settings restored to defaults.",
			});
		}
	};

	const sidebarItems = [
		{
			id: "types",
			label: "Incident Types",
			icon: AlertTriangle,
			description: "Define categories and severity levels.",
		},
		{
			id: "reporting",
			label: "Reporting",
			icon: FileText,
			description: "Configure required information for reports.",
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: Bell,
			description: "Set up alert recipients and triggers.",
		},
		{
			id: "workflow",
			label: "Workflow",
			icon: GitBranch,
			description: "Configure follow-up and review process.",
		},
	];

	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
				<div className="p-4">
					<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
						Incident Reporting
					</h2>
					<div className="space-y-1">
						{sidebarItems.map((item) => {
							const Icon = item.icon;
							const isActive = activeSection === item.id;
							return (
								<Button
									key={item.id}
									variant="ghost"
									className={`w-full justify-start ${
										isActive
											? "bg-primary/10 text-primary hover:bg-primary/20"
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
									}`}
									onClick={() => setActiveSection(item.id)}
								>
									<Icon className="h-4 w-4 mr-3" />
									{item.label}
								</Button>
							);
						})}
					</div>
				</div>
			</nav>

			{/* Main Content Area */}
			<main className="flex-1 overflow-y-auto p-6">
				<div className="mx-auto w-full max-w-4xl pb-10">
					{/* Header with Actions */}
					<div className="flex justify-between items-center mb-6">
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								{
									sidebarItems.find(
										(i) => i.id === activeSection
									)?.label
								}
							</h1>
							<p className="text-sm text-muted-foreground mt-1">
								{
									sidebarItems.find(
										(i) => i.id === activeSection
									)?.description
								}
							</p>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" onClick={handleReset}>
								<RotateCcw className="w-4 h-4 mr-2" />
								Reset Defaults
							</Button>
							<Button onClick={handleSave} disabled={isSaving}>
								<Save className="w-4 h-4 mr-2" />
								{isSaving ? "Saving..." : "Save Settings"}
							</Button>
						</div>
					</div>

					{/* Content Routes */}
					<div className="animate-in fade-in-50 duration-300">
						{activeSection === "types" && <IncidentTypes />}
						{activeSection === "reporting" && (
							<ReportingRequirements />
						)}
						{activeSection === "notifications" && (
							<NotificationSettings />
						)}
						{activeSection === "workflow" && <WorkflowSettings />}
					</div>
				</div>
			</main>
		</div>
	);
}
