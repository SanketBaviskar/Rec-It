import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Save,
	RotateCcw,
	Calendar,
	Ban,
	Repeat,
	Users,
	Shuffle,
	DollarSign,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { useSchedulingConfig } from "./useSchedulingConfig";

// Components
import BookingWindow from "./components/BookingWindow";
import CancellationPolicy from "./components/CancellationPolicy";
import RecurringBookings from "./components/RecurringBookings";
import ApprovalWorkflow from "./components/ApprovalWorkflow";
import ConflictResolution from "./components/ConflictResolution";
import PricingSettings from "./components/PricingSettings";

export default function SchedulingConfig() {
	const { resetConfig } = useSchedulingConfig();
	const [activeSection, setActiveSection] = useState("booking");
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Facility scheduling configuration has been updated.",
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
				description: "Scheduling settings restored to defaults.",
			});
		}
	};

	const sidebarItems = [
		{
			id: "booking",
			label: "Booking Window",
			icon: Calendar,
			description: "Configure advance booking and duration limits.",
		},
		{
			id: "cancellation",
			label: "Cancellation",
			icon: Ban,
			description: "Set cancellation windows and fees.",
		},
		{
			id: "recurring",
			label: "Recurring",
			icon: Repeat,
			description: "Configure recurring reservation rules.",
		},
		{
			id: "approval",
			label: "Approval",
			icon: Users,
			description: "Manage approval workflow settings.",
		},
		{
			id: "conflict",
			label: "Conflicts",
			icon: Shuffle,
			description: "Configure priority and buffer times.",
		},
		{
			id: "pricing",
			label: "Pricing",
			icon: DollarSign,
			description: "Set rates and peak hour pricing.",
		},
	];

	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
				<div className="p-4">
					<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
						Scheduling
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
						{activeSection === "booking" && <BookingWindow />}
						{activeSection === "cancellation" && (
							<CancellationPolicy />
						)}
						{activeSection === "recurring" && <RecurringBookings />}
						{activeSection === "approval" && <ApprovalWorkflow />}
						{activeSection === "conflict" && <ConflictResolution />}
						{activeSection === "pricing" && <PricingSettings />}
					</div>
				</div>
			</main>
		</div>
	);
}
