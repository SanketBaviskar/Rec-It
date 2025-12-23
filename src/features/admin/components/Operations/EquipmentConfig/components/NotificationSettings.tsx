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
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function NotificationSettings() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Automated Notifications</CardTitle>
				<CardDescription>
					Configure email/SMS alerts for equipment borrowers.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Reminder Before Due</Label>
						<p className="text-xs text-muted-foreground">
							Notify member before equipment is due.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<Input
							type="number"
							value={config.reminderMinutesBefore}
							onChange={(e) =>
								updateConfig({
									reminderMinutesBefore:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-20"
							disabled={!config.reminderEnabled}
						/>
						<span className="text-sm text-muted-foreground">
							min
						</span>
						<Switch
							checked={config.reminderEnabled}
							onCheckedChange={(c) =>
								updateConfig({ reminderEnabled: c })
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Overdue Notifications</Label>
						<p className="text-xs text-muted-foreground">
							Send periodic reminders for overdue items.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-sm text-muted-foreground">
							Every
						</span>
						<Input
							type="number"
							value={config.overdueNotificationInterval}
							onChange={(e) =>
								updateConfig({
									overdueNotificationInterval:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-20"
							disabled={!config.overdueNotificationEnabled}
						/>
						<span className="text-sm text-muted-foreground">
							min
						</span>
						<Switch
							checked={config.overdueNotificationEnabled}
							onCheckedChange={(c) =>
								updateConfig({
									overdueNotificationEnabled: c,
								})
							}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
