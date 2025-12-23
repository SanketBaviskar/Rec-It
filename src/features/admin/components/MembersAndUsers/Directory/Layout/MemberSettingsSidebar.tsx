import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	UserPlus,
	ShieldAlert,
	Receipt,
	LayoutDashboard,
	Database,
} from "lucide-react";

interface MemberSettingsSidebarProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
	counts?: {
		members?: number;
	};
}

const sidebarItems = [
	{
		id: "database",
		label: "Member Database",
		icon: Database,
		countKey: "members",
	},
	{
		id: "registration",
		label: "Registration & Onboarding",
		icon: UserPlus,
		countKey: null,
	},
	{
		id: "access",
		label: "Access Control Rules",
		icon: ShieldAlert,
		countKey: null,
	},
	{
		id: "financial",
		label: "Billing & Finance",
		icon: Receipt,
		countKey: null,
	},
	{
		id: "portal",
		label: "Portal Permissions",
		icon: LayoutDashboard,
		countKey: null,
	},
];

export default function MemberSettingsSidebar({
	activeSection,
	onSectionChange,
	counts = {},
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
						const count = item.countKey
							? counts[item.countKey as keyof typeof counts]
							: undefined;

						return (
							<Button
								key={item.id}
								variant="ghost"
								className={cn(
									"w-full justify-between",
									isActive
										? "bg-primary/10 text-primary hover:bg-primary/20"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								)}
								onClick={() => onSectionChange(item.id)}
							>
								<span className="flex items-center gap-3">
									<Icon className="h-4 w-4" />
									{item.label}
								</span>
								{count !== undefined && count > 0 && (
									<Badge
										variant={
											isActive ? "default" : "secondary"
										}
										className="ml-auto text-xs"
									>
										{count}
									</Badge>
								)}
							</Button>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
