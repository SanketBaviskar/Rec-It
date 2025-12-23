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
import { AlertTriangle } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function SuspensionPolicy() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<AlertTriangle className="h-5 w-5 text-destructive" />
					<div>
						<CardTitle>Hold / Suspension Policy</CardTitle>
						<CardDescription>
							Configure automatic holds for serious overdue cases.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Auto-Suspend Members</Label>
						<p className="text-xs text-muted-foreground">
							Automatically block access for severe overdue cases.
						</p>
					</div>
					<Switch
						checked={config.autoSuspendEnabled}
						onCheckedChange={(c) =>
							updateConfig({ autoSuspendEnabled: c })
						}
					/>
				</div>

				{config.autoSuspendEnabled && (
					<>
						<Separator />
						<div className="space-y-2">
							<Label htmlFor="suspend-after">
								Suspend After (hours overdue)
							</Label>
							<Input
								id="suspend-after"
								type="number"
								value={config.suspendAfterHours}
								onChange={(e) =>
									updateConfig({
										suspendAfterHours:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					</>
				)}

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Payment Before Return</Label>
						<p className="text-xs text-muted-foreground">
							Member must pay late fees before returning
							equipment.
						</p>
					</div>
					<Switch
						checked={config.requirePaymentBeforeReturn}
						onCheckedChange={(c) =>
							updateConfig({
								requirePaymentBeforeReturn: c,
							})
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
