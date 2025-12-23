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
import { DollarSign } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function LateFeePolicy() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<DollarSign className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Late Fee Policy</CardTitle>
						<CardDescription>
							Configure penalties for overdue equipment.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Enable Late Fees</Label>
						<p className="text-xs text-muted-foreground">
							Charge members for overdue returns.
						</p>
					</div>
					<Switch
						checked={config.lateFeeEnabled}
						onCheckedChange={(c) =>
							updateConfig({ lateFeeEnabled: c })
						}
					/>
				</div>

				{config.lateFeeEnabled && (
					<>
						<Separator />
						<div className="grid grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="grace-minutes">
									Grace Period (minutes)
								</Label>
								<Input
									id="grace-minutes"
									type="number"
									value={config.graceMinutes}
									onChange={(e) =>
										updateConfig({
											graceMinutes:
												parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="fee-per-hour">
									Fee Per Hour ($)
								</Label>
								<Input
									id="fee-per-hour"
									type="number"
									step="0.01"
									value={config.lateFeePerHour}
									onChange={(e) =>
										updateConfig({
											lateFeePerHour:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="max-fee">
									Maximum Late Fee ($)
								</Label>
								<Input
									id="max-fee"
									type="number"
									step="0.01"
									value={config.maxLateFee}
									onChange={(e) =>
										updateConfig({
											maxLateFee:
												parseFloat(e.target.value) || 0,
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
