import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Trophy, Users, Calendar, Target } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { useIntramuralConfig } from "./useIntramuralConfig";
import SportTypes from "./components/SportTypes";
import RegistrationRules from "./components/RegistrationRules";
import TeamRules from "./components/TeamRules";
import ScoringRules from "./components/ScoringRules";

export default function IntramuralsConfig() {
	const { resetConfig } = useIntramuralConfig();
	const [activeSection, setActiveSection] = useState("sports");
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Intramural sports configuration has been updated.",
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
				description: "Intramural settings restored to defaults.",
			});
		}
	};

	const sidebarItems = [
		{
			id: "sports",
			label: "Sport Types",
			icon: Trophy,
			description: "Manage available intramural sports and leagues.",
		},
		{
			id: "registration",
			label: "Registration",
			icon: Calendar,
			description: "Configure registration windows, fees, and deadlines.",
		},
		{
			id: "teams",
			label: "Teams & Eligibility",
			icon: Users,
			description: "Set roster limits, free agent rules, and waivers.",
		},
		{
			id: "scoring",
			label: "Scoring & Standings",
			icon: Target,
			description:
				"Define point systems, tiebreakers, and forfeit rules.",
		},
	];

	return (
		<div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden relative">
			{/* Secondary Sidebar */}
			<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
				<div className="p-4">
					<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
						Intramurals
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
						{activeSection === "sports" && <SportTypes />}
						{activeSection === "registration" && (
							<RegistrationRules />
						)}
						{activeSection === "teams" && <TeamRules />}
						{activeSection === "scoring" && <ScoringRules />}
					</div>
				</div>
			</main>
		</div>
	);
}
