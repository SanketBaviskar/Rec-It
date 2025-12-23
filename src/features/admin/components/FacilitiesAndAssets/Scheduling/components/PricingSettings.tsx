import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function PricingSettings() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Clock className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Pricing</CardTitle>
						<CardDescription>
							Configure hourly rates and peak pricing.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Member Hourly Rate ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.memberRate}
							onChange={(e) =>
								updateConfig({
									memberRate: parseFloat(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Non-Member Hourly Rate ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.nonMemberRate}
							onChange={(e) =>
								updateConfig({
									nonMemberRate:
										parseFloat(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="space-y-2">
					<Label>Peak Hour Multiplier</Label>
					<Input
						type="number"
						step="0.1"
						value={config.peakHourMultiplier}
						onChange={(e) =>
							updateConfig({
								peakHourMultiplier:
									parseFloat(e.target.value) || 1,
							})
						}
						className="w-32"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Peak Hours Start</Label>
						<Input
							type="time"
							value={config.peakHoursStart}
							onChange={(e) =>
								updateConfig({
									peakHoursStart: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Peak Hours End</Label>
						<Input
							type="time"
							value={config.peakHoursEnd}
							onChange={(e) =>
								updateConfig({
									peakHoursEnd: e.target.value,
								})
							}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
