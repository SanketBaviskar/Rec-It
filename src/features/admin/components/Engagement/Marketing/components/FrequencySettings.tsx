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

export default function FrequencySettings() {
	const { config, updateConfig } = useMarketingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Frequency & Compliance</CardTitle>
				<CardDescription>
					Prevent over-communication and ensure compliance.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Max Marketing Emails Per Week</Label>
					<Input
						type="number"
						value={config.maxEmailsPerWeek}
						onChange={(e) =>
							updateConfig({
								maxEmailsPerWeek: parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Unsubscribe</Label>
						<p className="text-xs text-muted-foreground">
							Include unsubscribe link in all emails (required by
							law).
						</p>
					</div>
					<Switch
						checked={config.unsubscribeEnabled}
						onCheckedChange={(c) =>
							updateConfig({ unsubscribeEnabled: c })
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
