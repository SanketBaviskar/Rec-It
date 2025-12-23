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
import { Users } from "lucide-react";
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function ApprovalWorkflow() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Users className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Approval Workflow</CardTitle>
						<CardDescription>
							Configure when bookings require admin approval.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Require Approval for Bookings Over (hours)</Label>
					<Input
						type="number"
						value={config.requireApprovalAboveHours}
						onChange={(e) =>
							updateConfig({
								requireApprovalAboveHours:
									parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center justify-between">
						<Label>Auto-Approve Members</Label>
						<Switch
							checked={config.autoApproveMembers}
							onCheckedChange={(c) =>
								updateConfig({
									autoApproveMembers: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Auto-Approve Staff</Label>
						<Switch
							checked={config.autoApproveStaff}
							onCheckedChange={(c) =>
								updateConfig({
									autoApproveStaff: c,
								})
							}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
