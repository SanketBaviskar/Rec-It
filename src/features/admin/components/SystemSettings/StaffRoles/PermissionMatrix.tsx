import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PERMISSION_AREAS = [
	{
		area: "Members",
		description: "Manage member profiles and data",
		permissions: [
			"View Directory",
			"Add Member",
			"Edit Member",
			"Delete Member",
			"View Sensitive Info",
		],
	},
	{
		area: "Access Control",
		description: "Gate and security monitoring",
		permissions: [
			"Monitor Feed",
			"Override Blocks",
			"Ban Users",
			"View Logs",
		],
	},
	{
		area: "Financials",
		description: "Billing and revenue management",
		permissions: [
			"View Reports",
			"Process Refunds",
			"Manage Discounts",
			"Edit Prices",
		],
	},
	{
		area: "Inventory",
		description: "Equipment and stock control",
		permissions: [
			"View Items",
			"Checkout/Return",
			"Adjust Stock",
			"Manage Vendors",
		],
	},
	{
		area: "Facilities",
		description: "Scheduling and maintenance",
		permissions: [
			"View Schedule",
			"Oversee Bookings",
			"Manage Maintenance",
			"Edit Hours",
		],
	},
	{
		area: "System",
		description: "Global settings and logs",
		permissions: ["Manage Staff", "Configure Settings", "View Audit Logs"],
	},
];

export default function PermissionMatrix() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{PERMISSION_AREAS.map((group) => (
				<Card
					key={group.area}
					className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/20 transition-all"
				>
					<CardHeader className="bg-muted/30 pb-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-base font-semibold">
									{group.area}
								</CardTitle>
								<p className="text-xs text-muted-foreground">
									{group.description}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<Label
									htmlFor={`select-all-${group.area}`}
									className="text-xs text-muted-foreground"
								>
									All
								</Label>
								<Switch
									id={`select-all-${group.area}`}
									size="sm"
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6 flex-1">
						<div className="grid grid-cols-1 gap-3">
							{group.permissions.map((perm) => (
								<div
									key={perm}
									className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
								>
									<Checkbox
										id={`${group.area}-${perm}`}
										className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
									/>
									<label
										htmlFor={`${group.area}-${perm}`}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
									>
										{perm}
									</label>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
