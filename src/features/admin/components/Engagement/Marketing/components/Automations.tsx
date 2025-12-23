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
import { useMarketingConfig } from "../useMarketingConfig";

export default function Automations() {
	const { config, updateConfig } = useMarketingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Automated Campaigns</CardTitle>
				<CardDescription>
					Enable or disable automated marketing triggers.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Welcome Email Series</Label>
						<p className="text-xs text-muted-foreground">
							Automatically email new members.
						</p>
					</div>
					<Switch
						checked={config.welcomeEmailEnabled}
						onCheckedChange={(c) =>
							updateConfig({ welcomeEmailEnabled: c })
						}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Birthday Email</Label>
						<p className="text-xs text-muted-foreground">
							Send birthday greetings with special offers.
						</p>
					</div>
					<Switch
						checked={config.birthdayEmailEnabled}
						onCheckedChange={(c) =>
							updateConfig({
								birthdayEmailEnabled: c,
							})
						}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Renewal Reminders</Label>
						<p className="text-xs text-muted-foreground">
							Remind members before membership expires.
						</p>
					</div>
					<Switch
						checked={config.renewalReminderEnabled}
						onCheckedChange={(c) =>
							updateConfig({
								renewalReminderEnabled: c,
							})
						}
					/>
				</div>

				{config.renewalReminderEnabled && (
					<div className="space-y-2">
						<Label>Days Before Expiration</Label>
						<Input
							type="number"
							value={config.renewalReminderDays}
							onChange={(e) =>
								updateConfig({
									renewalReminderDays:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
