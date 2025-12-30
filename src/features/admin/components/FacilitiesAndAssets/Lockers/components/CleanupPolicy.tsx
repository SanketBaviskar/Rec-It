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
import { Trash2 } from "lucide-react";
import { useLockerConfig } from "../useLockerConfig";

export default function CleanupPolicy() {
	const { config, updateConfig } = useLockerConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Trash2 className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Cleanup Policy</CardTitle>
						<CardDescription>
							Configure abandoned locker handling.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Cleanout After (days past expiration)</Label>
					<Input
						type="number"
						value={config.cleanoutAfterDays}
						onChange={(e) =>
							updateConfig({
								cleanoutAfterDays:
									parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
					<p className="text-xs text-muted-foreground">
						Number of days after rental expires before locker is
						cleaned out.
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Send Cleanout Warning</Label>
						<p className="text-xs text-muted-foreground">
							Email member before cleanout.
						</p>
					</div>
					<Switch
						checked={config.sendCleanoutWarning}
						onCheckedChange={(c) =>
							updateConfig({ sendCleanoutWarning: c })
						}
					/>
				</div>

				{config.sendCleanoutWarning && (
					<div className="space-y-2">
						<Label>Warning Days Before</Label>
						<Input
							type="number"
							value={config.warningDaysBefore}
							onChange={(e) =>
								updateConfig({
									warningDaysBefore:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
						<p className="text-xs text-muted-foreground">
							Days before cleanout to send warning email.
						</p>
					</div>
				)}

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Charge Cleanout Fee</Label>
						<p className="text-xs text-muted-foreground">
							Bill member for staff time to clean out.
						</p>
					</div>
					<Switch
						checked={config.chargeCleanoutFee}
						onCheckedChange={(c) =>
							updateConfig({ chargeCleanoutFee: c })
						}
					/>
				</div>

				{config.chargeCleanoutFee && (
					<div className="space-y-2">
						<Label>Cleanout Fee ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.cleanoutFee}
							onChange={(e) =>
								updateConfig({
									cleanoutFee:
										parseFloat(e.target.value) || 0,
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
