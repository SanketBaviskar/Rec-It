import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useMarketingConfig } from "../useMarketingConfig";

export default function PushNotifications() {
	const { config, updateConfig } = useMarketingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Push Notifications</CardTitle>
				<CardDescription>
					Configure mobile app push notification preferences.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Enable Push Notifications</Label>
						<p className="text-xs text-muted-foreground">
							Send push notifications to mobile app users.
						</p>
					</div>
					<Switch
						checked={config.pushEnabled}
						onCheckedChange={(c) =>
							updateConfig({ pushEnabled: c })
						}
					/>
				</div>

				{config.pushEnabled && (
					<>
						<Separator />
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label>New Classes / Events</Label>
								<Switch
									checked={config.pushForNewClasses}
									onCheckedChange={(c) =>
										updateConfig({
											pushForNewClasses: c,
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<Label>Facility Closures</Label>
								<Switch
									checked={config.pushForClosures}
									onCheckedChange={(c) =>
										updateConfig({
											pushForClosures: c,
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<Label>Promotions & Offers</Label>
								<Switch
									checked={config.pushForPromotions}
									onCheckedChange={(c) =>
										updateConfig({
											pushForPromotions: c,
										})
									}
								/>
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
