import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Save,
	RotateCcw,
	Clock,
	DollarSign,
	AlertTriangle,
	Shield,
	Key,
	RefreshCw,
	Layers,
	Bell,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { useEquipmentPolicy } from "./useEquipmentPolicy";

// Components
import CheckoutDuration from "./components/CheckoutDuration";
import LateFeePolicy from "./components/LateFeePolicy";
import SuspensionPolicy from "./components/SuspensionPolicy";
import EligibilityRules from "./components/EligibilityRules";
import CollateralPolicy from "./components/CollateralPolicy";
import NotificationSettings from "./components/NotificationSettings";
import RenewalRules from "./components/RenewalRules";
import CategoryOverrides from "./components/CategoryOverrides";

export default function EquipmentPolicyConfig() {
	const { resetConfig } = useEquipmentPolicy();
	const [activeSection, setActiveSection] = useState("checkout");
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Equipment checkout policies have been updated.",
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
				description: "Equipment policies restored to defaults.",
			});
		}
	};

	const sidebarItems = [
		{
			id: "checkout",
			label: "Checkout Duration",
			icon: Clock,
			description: "Manage checkout limits and extensions.",
		},
		{
			id: "lateFees",
			label: "Late Fees",
			icon: DollarSign,
			description: "Configure penalties for overdue equipment.",
		},
		{
			id: "suspension",
			label: "Suspension",
			icon: AlertTriangle,
			description: "Manage automatic holds and suspensions.",
		},
		{
			id: "eligibility",
			label: "Eligibility",
			icon: Shield,
			description: "Define user rules and limits.",
		},
		{
			id: "collateral",
			label: "Collateral",
			icon: Key,
			description: "Set collateral requirements.",
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: Bell,
			description: "Configure automated alerts.",
		},
		{
			id: "renewal",
			label: "Renewal Rules",
			icon: RefreshCw,
			description: "Manage renewals and reservations.",
		},
		{
			id: "overrides",
			label: "Category Overrides",
			icon: Layers,
			description: "Set specific rules for equipment categories.",
		},
	];

	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
				<div className="p-4">
					<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
						Equipment Policy
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
						{activeSection === "checkout" && <CheckoutDuration />}
						{activeSection === "lateFees" && <LateFeePolicy />}
						{activeSection === "suspension" && <SuspensionPolicy />}
						{activeSection === "eligibility" && (
							<EligibilityRules />
						)}
						{activeSection === "collateral" && <CollateralPolicy />}
						{activeSection === "notifications" && (
							<NotificationSettings />
						)}
						{activeSection === "renewal" && <RenewalRules />}
						{activeSection === "overrides" && <CategoryOverrides />}
					</div>
				</div>
			</main>
		</div>
	);
}
