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
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function RecurringBookings() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recurring Bookings</CardTitle>
				<CardDescription>
					Configure recurring reservation settings.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Recurring Bookings</Label>
						<p className="text-xs text-muted-foreground">
							Users can schedule weekly/monthly recurring
							reservations.
						</p>
					</div>
					<Switch
						checked={config.recurringAllowed}
						onCheckedChange={(c) =>
							updateConfig({ recurringAllowed: c })
						}
					/>
				</div>

				{config.recurringAllowed && (
					<>
						<div className="space-y-2">
							<Label>Max Recurring Duration (weeks)</Label>
							<Input
								type="number"
								value={config.maxRecurringWeeks}
								onChange={(e) =>
									updateConfig({
										maxRecurringWeeks:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Approval for Recurring</Label>
								<p className="text-xs text-muted-foreground">
									Admin must approve recurring reservations.
								</p>
							</div>
							<Switch
								checked={config.requireApprovalForRecurring}
								onCheckedChange={(c) =>
									updateConfig({
										requireApprovalForRecurring: c,
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
