import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Users,
	UserPlus,
	ShieldAlert,
	Receipt,
	LayoutDashboard,
	Database,
} from "lucide-react";

interface MemberSettingsSidebarProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
}

const sidebarItems = [
	{ id: "database", label: "Member Database", icon: Database }, // New Item First
	{ id: "membership", label: "Membership Types", icon: Users },
	{ id: "registration", label: "Registration & Onboarding", icon: UserPlus },
	{ id: "access", label: "Access Control Rules", icon: ShieldAlert },
	{ id: "financial", label: "Billing & Finance", icon: Receipt },
	{ id: "portal", label: "Portal Permissions", icon: LayoutDashboard },
];

export default function MemberSettingsSidebar({
	activeSection,
	onSectionChange,
}: MemberSettingsSidebarProps) {
	return (
		<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
					Member Control Panel
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
