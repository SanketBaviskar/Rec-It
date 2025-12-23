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
import { Bell } from "lucide-react";
import { useIncidentConfig } from "../useIncidentConfig";

export default function NotificationSettings() {
	const { config, updateConfig } = useIncidentConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Bell className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>
							Configure who gets notified when incidents are
							reported.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Notify Manager</Label>
							<p className="text-xs text-muted-foreground">
								Email shift supervisor.
							</p>
						</div>
						<Switch
							checked={config.notifyManager}
							onCheckedChange={(c) =>
								updateConfig({ notifyManager: c })
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Notify Risk Officer</Label>
							<p className="text-xs text-muted-foreground">
								Email risk management.
							</p>
						</div>
						<Switch
							checked={config.notifyRiskOfficer}
							onCheckedChange={(c) =>
								updateConfig({
									notifyRiskOfficer: c,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Special Alert for Critical Incidents</Label>
							<p className="text-xs text-muted-foreground">
								Send immediate notification for critical
								severity.
							</p>
						</div>
						<Switch
							checked={config.notifyOnCritical}
							onCheckedChange={(c) =>
								updateConfig({
									notifyOnCritical: c,
								})
							}
						/>
					</div>

					{config.notifyOnCritical && (
						<div className="space-y-2">
							<Label>Critical Alert Email</Label>
							<Input
								type="email"
								value={config.criticalNotifyEmail}
								onChange={(e) =>
									updateConfig({
										criticalNotifyEmail: e.target.value,
									})
								}
								placeholder="risk@university.edu"
							/>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
