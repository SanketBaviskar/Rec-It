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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Save, RotateCcw, FileText, Plus, Edit, Eye, Copy } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Waiver Templates
const WAIVER_TEMPLATES = [
	{
		id: 1,
		name: "General Liability Waiver",
		version: "3.2",
		lastUpdated: "2024-01-15",
		required: true,
		active: true,
	},
	{
		id: 2,
		name: "Intramural Sports Waiver",
		version: "2.1",
		lastUpdated: "2024-02-20",
		required: true,
		active: true,
	},
	{
		id: 3,
		name: "Climbing Wall Waiver",
		version: "1.5",
		lastUpdated: "2023-11-10",
		required: true,
		active: true,
	},
	{
		id: 4,
		name: "Pool / Aquatics Waiver",
		version: "2.0",
		lastUpdated: "2024-03-01",
		required: true,
		active: true,
	},
	{
		id: 5,
		name: "Outdoor Adventures Waiver",
		version: "1.2",
		lastUpdated: "2023-09-15",
		required: true,
		active: true,
	},
	{
		id: 6,
		name: "Minor Participation Waiver",
		version: "1.8",
		lastUpdated: "2024-01-30",
		required: true,
		active: true,
	},
];

const DEFAULT_CONFIG = {
	// Expiration Settings
	waiverExpirationEnabled: true,
	expirationMonths: 12,
	sendExpirationReminder: true,
	reminderDaysBefore: 30,

	// Signature Requirements
	requireDigitalSignature: true,
	requireWitnessForMinors: true,
	minorAgeThreshold: 18,
	parentSignatureRequired: true,

	// Access Control
	blockAccessIfExpired: true,
	gracePeriorDays: 7,
	allowTemporaryAccess: false,

	// Storage & Compliance
	retentionYears: 7,
	encryptStorage: true,
	auditTrailEnabled: true,

	// Versioning
	requireResignOnUpdate: true,
	trackVersionHistory: true,
};

export default function WaiverConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [templates, setTemplates] = useState(WAIVER_TEMPLATES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Waiver configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Waiver settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Waiver Management</h1>
					<p className="text-muted-foreground mt-1">
						Configure waiver templates, expiration, and signature
						requirements.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleReset}>
						<RotateCcw className="w-4 h-4 mr-2" />
						Reset
					</Button>
					<Button onClick={handleSave} disabled={isSaving}>
						<Save className="w-4 h-4 mr-2" />
						{isSaving ? "Saving..." : "Save Settings"}
					</Button>
				</div>
			</div>

			{/* Waiver Templates */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<FileText className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Waiver Templates</CardTitle>
								<CardDescription>
									Manage waiver documents and versions.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							New Template
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Template Name</TableHead>
								<TableHead>Version</TableHead>
								<TableHead>Last Updated</TableHead>
								<TableHead>Required</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-32">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{templates.map((template) => (
								<TableRow key={template.id}>
									<TableCell className="font-medium">
										{template.name}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											v{template.version}
										</Badge>
									</TableCell>
									<TableCell>
										{template.lastUpdated}
									</TableCell>
									<TableCell>
										{template.required ? "Yes" : "No"}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												template.active
													? "default"
													: "secondary"
											}
										>
											{template.active
												? "Active"
												: "Inactive"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												title="Preview"
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												title="Edit"
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												title="Duplicate"
											>
												<Copy className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Expiration Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Expiration Settings</CardTitle>
					<CardDescription>
						Configure when waivers expire and renewal reminders.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Waiver Expiration</Label>
							<p className="text-xs text-muted-foreground">
								Waivers expire after a set period.
							</p>
						</div>
						<Switch
							checked={config.waiverExpirationEnabled}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									waiverExpirationEnabled: c,
								})
							}
						/>
					</div>

					{config.waiverExpirationEnabled && (
						<>
							<div className="space-y-2">
								<Label>Expiration Period (months)</Label>
								<Input
									type="number"
									value={config.expirationMonths}
									onChange={(e) =>
										setConfig({
											...config,
											expirationMonths:
												parseInt(e.target.value) || 0,
										})
									}
									className="w-32"
								/>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Send Expiration Reminders</Label>
									<p className="text-xs text-muted-foreground">
										Email members before waiver expires.
									</p>
								</div>
								<Switch
									checked={config.sendExpirationReminder}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											sendExpirationReminder: c,
										})
									}
								/>
							</div>

							{config.sendExpirationReminder && (
								<div className="space-y-2">
									<Label>
										Reminder Days Before Expiration
									</Label>
									<Input
										type="number"
										value={config.reminderDaysBefore}
										onChange={(e) =>
											setConfig({
												...config,
												reminderDaysBefore:
													parseInt(e.target.value) ||
													0,
											})
										}
										className="w-32"
									/>
								</div>
							)}
						</>
					)}
				</CardContent>
			</Card>

			{/* Signature Requirements */}
			<Card>
				<CardHeader>
					<CardTitle>Signature Requirements</CardTitle>
					<CardDescription>
						Configure digital signature and minor consent rules.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Digital Signature</Label>
							<p className="text-xs text-muted-foreground">
								Members must sign electronically.
							</p>
						</div>
						<Switch
							checked={config.requireDigitalSignature}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									requireDigitalSignature: c,
								})
							}
						/>
					</div>

					<Separator />

					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Minor Age Threshold</Label>
							<Input
								type="number"
								value={config.minorAgeThreshold}
								onChange={(e) =>
									setConfig({
										...config,
										minorAgeThreshold:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
							<p className="text-xs text-muted-foreground">
								Age under which parent signature is required.
							</p>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>
									Parent/Guardian Signature for Minors
								</Label>
								<p className="text-xs text-muted-foreground">
									Require parent to sign for children.
								</p>
							</div>
							<Switch
								checked={config.parentSignatureRequired}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										parentSignatureRequired: c,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Access Control */}
			<Card>
				<CardHeader>
					<CardTitle>Access Control</CardTitle>
					<CardDescription>
						Configure how expired waivers affect facility access.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Block Access if Waiver Expired</Label>
							<p className="text-xs text-muted-foreground">
								Prevent entry until waiver is renewed.
							</p>
						</div>
						<Switch
							checked={config.blockAccessIfExpired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									blockAccessIfExpired: c,
								})
							}
						/>
					</div>

					{config.blockAccessIfExpired && (
						<div className="space-y-2">
							<Label>Grace Period (days)</Label>
							<Input
								type="number"
								value={config.gracePeriorDays}
								onChange={(e) =>
									setConfig({
										...config,
										gracePeriorDays:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
							<p className="text-xs text-muted-foreground">
								Allow access for this many days after
								expiration.
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Versioning */}
			<Card>
				<CardHeader>
					<CardTitle>Versioning & Compliance</CardTitle>
					<CardDescription>
						Configure version tracking and re-signature
						requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>
								Require Re-signature on Template Update
							</Label>
							<p className="text-xs text-muted-foreground">
								Members must sign again when waiver content
								changes.
							</p>
						</div>
						<Switch
							checked={config.requireResignOnUpdate}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									requireResignOnUpdate: c,
								})
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Audit Trail</Label>
							<p className="text-xs text-muted-foreground">
								Track all signature and viewing events.
							</p>
						</div>
						<Switch
							checked={config.auditTrailEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, auditTrailEnabled: c })
							}
						/>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label>Record Retention (years)</Label>
						<Input
							type="number"
							value={config.retentionYears}
							onChange={(e) =>
								setConfig({
									...config,
									retentionYears:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
						<p className="text-xs text-muted-foreground">
							How long to keep signed waivers for legal
							compliance.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
