import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Building2,
	CalendarClock,
	FileText,
	Bell,
	CreditCard,
	ShieldCheck,
	Server,
	MonitorSmartphone,
	UserCheck,
	Scan,
} from "lucide-react";

interface SettingsSidebarProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
}

const sidebarItems = [
	{ id: "profile", label: "Center Profile", icon: Building2 },
	{ id: "hours", label: "Operating Hours", icon: CalendarClock },
	{ id: "policies", label: "Booking Policies", icon: FileText },
	{ id: "notifications", label: "Email Settings", icon: Bell },
	{ id: "access", label: "Access Control & IDs", icon: Scan }, // Refers to the "Access card" requirement
	{ id: "payments", label: "Payment Gateways", icon: CreditCard },
	{ id: "security", label: "Security Settings", icon: ShieldCheck },
	{ id: "system", label: "System Settings", icon: Server },
	{ id: "devices", label: "Capture Devices", icon: MonitorSmartphone },
];

export default function SettingsSidebar({
	activeSection,
	onSectionChange,
}: SettingsSidebarProps) {
	return (
		<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
					General Settings
				</h2>
				<div className="space-y-1">
					{sidebarItems.map((item) => {
						const Icon = item.icon;
						const isActive = activeSection === item.id;
						return (
							<Button
								key={item.id}
								variant="ghost"
								className={cn(
									"w-full justify-start gap-3",
									isActive
										? "bg-primary/10 text-primary hover:bg-primary/20"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								)}
								onClick={() => onSectionChange(item.id)}
							>
								<Icon className="h-4 w-4" />
								{item.label}
							</Button>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
