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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload, Save, RotateCcw, FileText } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Required Information
	emergencyContactRequired: true,
	medicalConditionsRequired: true,
	referralSourceRequired: false,
	photoIdRequired: true,
	emailVerificationRequired: true,
	termsAcceptanceRequired: true,

	// ID Format
	idFormat: "auto" as "auto" | "random" | "custom",
	customPrefix: "MEM-",

	// Waiver
	waiverRequired: true,
	waiverFileName: "current_waiver_v2.pdf",
	waiverVersion: "2.0",
};

export default function RegistrationConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving registration config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Registration configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Registration configuration restored to defaults.",
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

			{/* Required Information Card */}
			<Card>
				<CardHeader>
					<CardTitle>Required Information</CardTitle>
					<CardDescription>
						Select which fields are mandatory during sign-up.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Emergency Contact</Label>
							<p className="text-xs text-muted-foreground">
								Name and phone number of emergency contact
							</p>
						</div>
						<Switch
							checked={config.emergencyContactRequired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									emergencyContactRequired: c,
								})
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Medical Conditions / Allergies</Label>
							<p className="text-xs text-muted-foreground">
								Important health information for safety
							</p>
						</div>
						<Switch
							checked={config.medicalConditionsRequired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									medicalConditionsRequired: c,
								})
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Referral Source</Label>
							<p className="text-xs text-muted-foreground">
								How did you hear about us?
							</p>
						</div>
						<Switch
							checked={config.referralSourceRequired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									referralSourceRequired: c,
								})
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Photo ID Upload</Label>
							<p className="text-xs text-muted-foreground">
								Require government-issued photo ID
							</p>
						</div>
						<Switch
							checked={config.photoIdRequired}
							onCheckedChange={(c) =>
								setConfig({ ...config, photoIdRequired: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Email Verification</Label>
							<p className="text-xs text-muted-foreground">
								Members must verify email before first check-in
							</p>
						</div>
						<Switch
							checked={config.emailVerificationRequired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									emailVerificationRequired: c,
								})
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Terms & Conditions Acceptance</Label>
							<p className="text-xs text-muted-foreground">
								Must accept terms before completing registration
							</p>
						</div>
						<Switch
							checked={config.termsAcceptanceRequired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									termsAcceptanceRequired: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Member ID Formatting Card */}
			<Card>
				<CardHeader>
					<CardTitle>Member ID Formatting</CardTitle>
					<CardDescription>
						Define how system IDs are generated for new accounts.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<RadioGroup
						value={config.idFormat}
						onValueChange={(v) =>
							setConfig({
								...config,
								idFormat: v as "auto" | "random" | "custom",
							})
						}
					>
						<div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
							<RadioGroupItem value="auto" id="auto" />
							<Label
								htmlFor="auto"
								className="flex-1 cursor-pointer"
							>
								<div>Auto-Increment (e.g. 1001, 1002)</div>
								<p className="text-xs text-muted-foreground font-normal">
									Simple sequential numbering
								</p>
							</Label>
						</div>
						<div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
							<RadioGroupItem value="random" id="random" />
							<Label
								htmlFor="random"
								className="flex-1 cursor-pointer"
							>
								<div>Random Alphanumeric (e.g. A7X-92B)</div>
								<p className="text-xs text-muted-foreground font-normal">
									Harder to guess, more secure
								</p>
							</Label>
						</div>
						<div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
							<RadioGroupItem value="custom" id="custom" />
							<Label
								htmlFor="custom"
								className="flex-1 cursor-pointer"
							>
								<div>Custom Prefix Format</div>
								<p className="text-xs text-muted-foreground font-normal">
									Use your own prefix with auto-increment
								</p>
							</Label>
						</div>
					</RadioGroup>

					{config.idFormat === "custom" && (
						<div className="space-y-2 pt-2">
							<Label htmlFor="custom-prefix">Custom Prefix</Label>
							<Input
								id="custom-prefix"
								value={config.customPrefix}
								onChange={(e) =>
									setConfig({
										...config,
										customPrefix: e.target.value,
									})
								}
								placeholder="MEM-"
								className="w-32"
							/>
							<p className="text-xs text-muted-foreground">
								Preview: {config.customPrefix}1001
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Liability Waiver Card */}
			<Card>
				<CardHeader>
					<CardTitle>Liability Waiver</CardTitle>
					<CardDescription>
						Manage the legal agreement members must sign.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>
								Require Signature Before First Check-in
							</Label>
							<p className="text-xs text-muted-foreground">
								Members cannot check-in without signed waiver
							</p>
						</div>
						<Switch
							checked={config.waiverRequired}
							onCheckedChange={(c) =>
								setConfig({ ...config, waiverRequired: c })
							}
						/>
					</div>
					<Separator />
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Current Waiver Document</Label>
							<span className="text-xs text-muted-foreground">
								Version {config.waiverVersion}
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="border border-dashed rounded-md p-4 flex-1 flex items-center gap-3 bg-muted/20">
								<FileText className="h-8 w-8 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">
										{config.waiverFileName}
									</p>
									<p className="text-xs text-muted-foreground">
										PDF Document
									</p>
								</div>
							</div>
							<Button variant="outline">
								<Upload className="h-4 w-4 mr-2" /> Upload New
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
