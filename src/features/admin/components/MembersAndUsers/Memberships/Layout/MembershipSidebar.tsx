import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreditCard, Ticket, Users } from "lucide-react";

interface MembershipSidebarProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
	counts?: {
		plans?: number;
		passes?: number;
		households?: number;
	};
}

const sidebarItems = [
	{ id: "plans", label: "Memberships", icon: CreditCard, countKey: "plans" },
	{ id: "passes", label: "Passes", icon: Ticket, countKey: "passes" },
	{
		id: "households",
		label: "Households",
		icon: Users,
		countKey: "households",
	},
];

export default function MembershipSidebar({
	activeSection,
	onSectionChange,
	counts = {},
}: MembershipSidebarProps) {
	return (
		<nav className="w-64 bg-card border-r h-full overflow-y-auto flex-shrink-0">
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4 px-2 text-foreground">
					Plans & Passes
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
