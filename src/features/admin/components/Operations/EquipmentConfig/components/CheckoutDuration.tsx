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
import { Clock } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function CheckoutDuration() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Clock className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Checkout Duration</CardTitle>
						<CardDescription>
							Configure how long members can borrow equipment.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="default-checkout">
							Default Checkout Duration (hours)
						</Label>
						<Input
							id="default-checkout"
							type="number"
							value={config.defaultCheckoutHours}
							onChange={(e) =>
								updateConfig({
									defaultCheckoutHours:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							Standard return time for equipment loans.
						</p>
					</div>
					<div className="space-y-2">
						<Label htmlFor="max-checkout">
							Maximum Checkout Duration (hours)
						</Label>
						<Input
							id="max-checkout"
							type="number"
							value={config.maxCheckoutHours}
							onChange={(e) =>
								updateConfig({
									maxCheckoutHours:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							Absolute maximum, even with extensions.
						</p>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Extensions</Label>
						<p className="text-xs text-muted-foreground">
							Members can request additional time.
						</p>
					</div>
					<Switch
						checked={config.allowExtensions}
						onCheckedChange={(c) =>
							updateConfig({ allowExtensions: c })
						}
					/>
				</div>

				{config.allowExtensions && (
					<div className="grid grid-cols-2 gap-4 pt-2">
						<div className="space-y-2">
							<Label htmlFor="max-extensions">
								Max Extensions Allowed
							</Label>
							<Input
								id="max-extensions"
								type="number"
								value={config.maxExtensions}
								onChange={(e) =>
									updateConfig({
										maxExtensions:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="extension-hours">
								Hours Per Extension
							</Label>
							<Input
								id="extension-hours"
								type="number"
								value={config.extensionHours}
								onChange={(e) =>
									updateConfig({
										extensionHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
