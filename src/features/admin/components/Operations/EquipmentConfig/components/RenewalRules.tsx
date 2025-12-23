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
import { RefreshCw } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function RenewalRules() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<RefreshCw className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Renewal & Reservation Rules</CardTitle>
						<CardDescription>
							Configure renewals, advance reservations, and buffer
							times.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Renewals</Label>
						<p className="text-xs text-muted-foreground">
							Members can renew equipment before returning.
						</p>
					</div>
					<Switch
						checked={config.allowRenewals}
						onCheckedChange={(c) =>
							updateConfig({ allowRenewals: c })
						}
					/>
				</div>
				{config.allowRenewals && (
					<div className="space-y-2 pt-2">
						<Label htmlFor="max-renewals">
							Max Renewals Per Checkout
						</Label>
						<Input
							id="max-renewals"
							type="number"
							value={config.maxRenewals}
							onChange={(e) =>
								updateConfig({
									maxRenewals: parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				)}
				<Separator />
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="reservation-window">
							Reservation Window (days)
						</Label>
						<Input
							id="reservation-window"
							type="number"
							value={config.reservationWindowDays}
							onChange={(e) =>
								updateConfig({
									reservationWindowDays:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							How far in advance members can reserve equipment.
						</p>
					</div>
					<div className="space-y-2">
						<Label htmlFor="buffer-minutes">
							Buffer Time (minutes)
						</Label>
						<Input
							id="buffer-minutes"
							type="number"
							value={config.bufferMinutesBetweenCheckouts}
							onChange={(e) =>
								updateConfig({
									bufferMinutesBetweenCheckouts:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							Time for cleaning/inspection between uses.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
