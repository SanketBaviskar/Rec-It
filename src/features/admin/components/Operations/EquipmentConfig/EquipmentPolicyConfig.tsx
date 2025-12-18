import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Save,
	RotateCcw,
	Clock,
	DollarSign,
	AlertTriangle,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Checkout Limits
	defaultCheckoutHours: 6,
	maxCheckoutHours: 24,
	allowExtensions: true,
	maxExtensions: 2,
	extensionHours: 2,

	// Late Fee Policy
	lateFeeEnabled: true,
	graceMinutes: 15,
	lateFeePerHour: 2.5,
	maxLateFee: 25.0,

	// Hold/Suspension Policy
	autoSuspendEnabled: true,
	suspendAfterHours: 48,
	requirePaymentBeforeReturn: false,

	// Damage Assessment
	damageAssessmentRequired: true,
	photoRequired: true,
	damageCategories: "minor,moderate,severe,lost",

	// Notifications
	reminderEnabled: true,
	reminderMinutesBefore: 30,
	overdueNotificationEnabled: true,
	overdueNotificationInterval: 60, // minutes
};

export default function EquipmentPolicyConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving equipment policy config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Equipment checkout policies have been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Equipment policies restored to defaults.",
		});
	};

	return (
		<div className="space-y-6">
			{/* Action Buttons */}
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={handleReset}>
					<RotateCcw className="w-4 h-4 mr-2" />
					Reset
				</Button>
				<Button onClick={handleSave} disabled={isSaving}>
					<Save className="w-4 h-4 mr-2" />
					{isSaving ? "Saving..." : "Save Settings"}
				</Button>
			</div>

			{/* Checkout Duration Limits */}
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
									setConfig({
										...config,
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
									setConfig({
										...config,
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
								setConfig({ ...config, allowExtensions: c })
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
										setConfig({
											...config,
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
										setConfig({
											...config,
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

			{/* Late Fee Policy */}
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
								setConfig({ ...config, lateFeeEnabled: c })
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
											setConfig({
												...config,
												graceMinutes:
													parseInt(e.target.value) ||
													0,
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
											setConfig({
												...config,
												lateFeePerHour:
													parseFloat(
														e.target.value
													) || 0,
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
											setConfig({
												...config,
												maxLateFee:
													parseFloat(
														e.target.value
													) || 0,
											})
										}
									/>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Suspension Policy */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						<div>
							<CardTitle>Hold / Suspension Policy</CardTitle>
							<CardDescription>
								Configure automatic holds for serious overdue
								cases.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Auto-Suspend Members</Label>
							<p className="text-xs text-muted-foreground">
								Automatically block access for severe overdue
								cases.
							</p>
						</div>
						<Switch
							checked={config.autoSuspendEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, autoSuspendEnabled: c })
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
										setConfig({
											...config,
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
								setConfig({
									...config,
									requirePaymentBeforeReturn: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Notifications */}
			<Card>
				<CardHeader>
					<CardTitle>Automated Notifications</CardTitle>
					<CardDescription>
						Configure email/SMS alerts for equipment borrowers.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Reminder Before Due</Label>
							<p className="text-xs text-muted-foreground">
								Notify member before equipment is due.
							</p>
						</div>
						<div className="flex items-center gap-4">
							<Input
								type="number"
								value={config.reminderMinutesBefore}
								onChange={(e) =>
									setConfig({
										...config,
										reminderMinutesBefore:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-20"
								disabled={!config.reminderEnabled}
							/>
							<span className="text-sm text-muted-foreground">
								min
							</span>
							<Switch
								checked={config.reminderEnabled}
								onCheckedChange={(c) =>
									setConfig({ ...config, reminderEnabled: c })
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Overdue Notifications</Label>
							<p className="text-xs text-muted-foreground">
								Send periodic reminders for overdue items.
							</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-muted-foreground">
								Every
							</span>
							<Input
								type="number"
								value={config.overdueNotificationInterval}
								onChange={(e) =>
									setConfig({
										...config,
										overdueNotificationInterval:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-20"
								disabled={!config.overdueNotificationEnabled}
							/>
							<span className="text-sm text-muted-foreground">
								min
							</span>
							<Switch
								checked={config.overdueNotificationEnabled}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										overdueNotificationEnabled: c,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
