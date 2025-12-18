import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const PERMISSION_AREAS = [
	{
		area: "Members",
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
		permissions: [
			"Monitor Feed",
			"Override Blocks",
			"Ban Users",
			"View Logs",
		],
	},
	{
		area: "Financials",
		permissions: [
			"View Reports",
			"Process Refunds",
			"Manage Discounts",
			"Edit Prices",
		],
	},
	{
		area: "Inventory",
		permissions: [
			"View Items",
			"Checkout/Return",
			"Adjust Stock",
			"Manage Vendors",
		],
	},
	{
		area: "Facilities",
		permissions: [
			"View Schedule",
			"Oversee Bookings",
			"Manage Maintenance",
			"Edit Hours",
		],
	},
	{
		area: "System",
		permissions: ["Manage Staff", "Configure Settings", "View Audit Logs"],
	},
];

export default function PermissionMatrix() {
	return (
		<div className="rounded-md border bg-card">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">
							Feature Area
						</TableHead>
						<TableHead>Permissions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{PERMISSION_AREAS.map((group) => (
						<TableRow key={group.area}>
							<TableCell className="font-semibold align-top pt-4">
								{group.area}
							</TableCell>
							<TableCell>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
									{group.permissions.map((perm) => (
										<div
											key={perm}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={`${group.area}-${perm}`}
											/>
											<label
												htmlFor={`${group.area}-${perm}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{perm}
											</label>
										</div>
									))}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
