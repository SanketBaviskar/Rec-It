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
import { useGroupFitnessConfig } from "../useGroupFitnessConfig";

export default function CheckInSettings() {
	const { config, updateConfig } = useGroupFitnessConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Check-in Settings</CardTitle>
				<CardDescription>
					Configure class check-in requirements.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Check-in</Label>
						<p className="text-xs text-muted-foreground">
							Members must check in before class starts.
						</p>
					</div>
					<Switch
						checked={config.requireCheckIn}
						onCheckedChange={(c) =>
							updateConfig({ requireCheckIn: c })
						}
					/>
				</div>

				{config.requireCheckIn && (
					<>
						<div className="space-y-2">
							<Label>
								Check-in Window (minutes before class)
							</Label>
							<Input
								type="number"
								value={config.checkInWindowMinutes}
								onChange={(e) =>
									updateConfig({
										checkInWindowMinutes:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Release Spot if Not Checked In</Label>
								<p className="text-xs text-muted-foreground">
									Give unclaimed spots to waitlist members.
								</p>
							</div>
							<Switch
								checked={config.releaseSpotIfNotCheckedIn}
								onCheckedChange={(c) =>
									updateConfig({
										releaseSpotIfNotCheckedIn: c,
									})
								}
							/>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
