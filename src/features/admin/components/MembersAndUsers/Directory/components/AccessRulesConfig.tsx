import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Save, RotateCcw, Volume2, Camera } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Hardware
	primaryEntryMethod: "barcode" as
		| "barcode"
		| "rfid"
		| "biometric"
		| "manual",
	scannerDriver: "hid" as "hid" | "serial",

	// Check-in Validation
	denyIfInactive: true,
	denyIfBalanceExceeds: true,
	balanceLimit: 50,
	denyIfNoWaiver: true,
	denyIfNoPhoto: false,

	// Anti-Passback
	antiPassbackEnabled: true,
	antiPassbackCooldown: 15, // minutes

	// Visual Verification
	showPhotoOnScan: true,
	playSoundOnScan: true,

	// Guest Policy
	maxGuestsPerMemberPerMonth: 2,
};

export default function AccessRulesConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving access config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Access control configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Access control configuration restored to defaults.",
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

			{/* Hardware Integration Card */}
			<Card>
				<CardHeader>
					<CardTitle>Hardware Integration</CardTitle>
					<CardDescription>
						Configure entry points and scanner types.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Primary Entry Method</Label>
							<Select
								value={config.primaryEntryMethod}
								onValueChange={(v) =>
									setConfig({
										...config,
										primaryEntryMethod: v as
											| "barcode"
											| "rfid"
											| "biometric"
											| "manual",
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select method" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="barcode">
										Barcode / QR Code
									</SelectItem>
									<SelectItem value="rfid">
										RFID / NFC Card
									</SelectItem>
									<SelectItem value="biometric">
										Biometric (Fingerprint)
									</SelectItem>
									<SelectItem value="manual">
										Manual Staff Check-in
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Scanner Device Driver</Label>
							<Select
								value={config.scannerDriver}
								onValueChange={(v) =>
									setConfig({
										...config,
										scannerDriver: v as "hid" | "serial",
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hid">
										Generic HID Keyboard
									</SelectItem>
									<SelectItem value="serial">
										Serial Port (COM)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Check-in Validation Logic Card */}
			<Card>
				<CardHeader>
					<CardTitle>Check-in Validation Logic</CardTitle>
					<CardDescription>
						Define conditions that trigger a "Red Flag" (Deny
						Access) at the turnstile.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>
								Deny if Membership is Inactive/Expired
							</Label>
							<p className="text-xs text-muted-foreground">
								Always enforced for security
							</p>
						</div>
						<Switch checked={config.denyIfInactive} disabled />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex flex-col">
							<Label>
								Deny if Outstanding Balance Exceeds Limit
							</Label>
							<span className="text-xs text-muted-foreground">
								Blocks entry if user owes money.
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm">$</span>
								<Input
									type="number"
									className="w-20"
									value={config.balanceLimit}
									onChange={(e) =>
										setConfig({
											...config,
											balanceLimit:
												parseInt(e.target.value) || 0,
										})
									}
									disabled={!config.denyIfBalanceExceeds}
								/>
							</div>
							<Switch
								checked={config.denyIfBalanceExceeds}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										denyIfBalanceExceeds: c,
									})
								}
							/>
						</div>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Deny if Liability Waiver Unsigned</Label>
							<p className="text-xs text-muted-foreground">
								Member must sign waiver first
							</p>
						</div>
						<Switch
							checked={config.denyIfNoWaiver}
							onCheckedChange={(c) =>
								setConfig({ ...config, denyIfNoWaiver: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Deny if Profile Photo Missing</Label>
							<p className="text-xs text-muted-foreground">
								Require photo for visual verification
							</p>
						</div>
						<Switch
							checked={config.denyIfNoPhoto}
							onCheckedChange={(c) =>
								setConfig({ ...config, denyIfNoPhoto: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Anti-Passback Card */}
			<Card>
				<CardHeader>
					<CardTitle>Anti-Passback Protection</CardTitle>
					<CardDescription>
						Prevent members from sharing access cards or passing
						back.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Anti-Passback</Label>
							<p className="text-xs text-muted-foreground">
								Require exit before re-entry
							</p>
						</div>
						<Switch
							checked={config.antiPassbackEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, antiPassbackEnabled: c })
							}
						/>
					</div>
					{config.antiPassbackEnabled && (
						<>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Cooldown Period (minutes)</Label>
									<p className="text-xs text-muted-foreground">
										Minimum time between scans if no exit
										recorded
									</p>
								</div>
								<Input
									type="number"
									className="w-20"
									value={config.antiPassbackCooldown}
									onChange={(e) =>
										setConfig({
											...config,
											antiPassbackCooldown:
												parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Visual Verification Card */}
			<Card>
				<CardHeader>
					<CardTitle>Visual Verification</CardTitle>
					<CardDescription>
						Configure what staff sees and hears during check-in.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-primary/10">
								<Camera className="h-4 w-4 text-primary" />
							</div>
							<div className="space-y-0.5">
								<Label>Show Member Photo on Scan</Label>
								<p className="text-xs text-muted-foreground">
									Display photo for staff visual verification
								</p>
							</div>
						</div>
						<Switch
							checked={config.showPhotoOnScan}
							onCheckedChange={(c) =>
								setConfig({ ...config, showPhotoOnScan: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-green-500/10">
								<Volume2 className="h-4 w-4 text-green-500" />
							</div>
							<div className="space-y-0.5">
								<Label>Play Sound on Scan</Label>
								<p className="text-xs text-muted-foreground">
									Audible feedback (green = pass, red = deny)
								</p>
							</div>
						</div>
						<Switch
							checked={config.playSoundOnScan}
							onCheckedChange={(c) =>
								setConfig({ ...config, playSoundOnScan: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Guest Policy Card */}
			<Card>
				<CardHeader>
					<CardTitle>Guest Policy</CardTitle>
					<CardDescription>
						Manage guest access rules.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Max Guests Per Member Per Month</Label>
							<p className="text-xs text-muted-foreground">
								Limit how many guests a member can bring
							</p>
						</div>
						<Input
							type="number"
							value={config.maxGuestsPerMemberPerMonth}
							onChange={(e) =>
								setConfig({
									...config,
									maxGuestsPerMemberPerMonth:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-20"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
