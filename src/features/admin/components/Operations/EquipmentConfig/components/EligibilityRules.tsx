import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function EligibilityRules() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Shield className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Eligibility Rules</CardTitle>
						<CardDescription>
							Define who is allowed to checkout equipment.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Active Membership</Label>
						<p className="text-xs text-muted-foreground">
							Only members with active status can checkout items.
						</p>
					</div>
					<Switch
						checked={config.requireActiveMembership}
						onCheckedChange={(c) =>
							updateConfig({
								requireActiveMembership: c,
							})
						}
					/>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Block on Overdue</Label>
						<p className="text-xs text-muted-foreground">
							Prevent checkout if user has any overdue items.
						</p>
					</div>
					<Switch
						checked={config.blockOnOverdue}
						onCheckedChange={(c) =>
							updateConfig({ blockOnOverdue: c })
						}
					/>
				</div>
				<Separator />
				<div className="space-y-2">
					<Label htmlFor="max-items">Maximum Items Per User</Label>
					<Input
						id="max-items"
						type="number"
						value={config.maxItemsPerUser}
						onChange={(e) =>
							updateConfig({
								maxItemsPerUser: parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
					<p className="text-xs text-muted-foreground">
						Total number of items a user can have checked out at
						once.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
