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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Save,
	RotateCcw,
	AlertTriangle,
	Bell,
	FileText,
	Plus,
	Edit,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Incident Types
const INCIDENT_TYPES = [
	{
		id: 1,
		name: "Injury - Minor",
		severity: "Low",
		requiresReport: true,
		active: true,
	},
	{
		id: 2,
		name: "Injury - Major",
		severity: "High",
		requiresReport: true,
		active: true,
	},
	{
		id: 3,
		name: "Equipment Damage",
		severity: "Medium",
		requiresReport: true,
		active: true,
	},
	{
		id: 4,
		name: "Behavioral Issue",
		severity: "Medium",
		requiresReport: true,
		active: true,
	},
	{
		id: 5,
		name: "Medical Emergency",
		severity: "Critical",
		requiresReport: true,
		active: true,
	},
	{
		id: 6,
		name: "Property Theft",
		severity: "High",
		requiresReport: true,
		active: true,
	},
	{
		id: 7,
		name: "Near Miss",
		severity: "Low",
		requiresReport: false,
		active: true,
	},
];

const DEFAULT_CONFIG = {
	// Reporting Requirements
	requirePhotoEvidence: true,
	requireWitnessInfo: false,
	requireBodyMap: true,
	requireFollowUp: true,
	followUpDays: 7,

	// Notifications
	notifyManager: true,
	notifyRiskOfficer: true,
	notifyOnCritical: true,
	criticalNotifyEmail: "risk@university.edu",

	// Escalation
	autoEscalateHigh: true,
	escalationTimeHours: 24,

	// Documentation
	retentionYears: 7,
	requireSignature: true,
	allowAnonymous: false,

	// Workflow
	requireReview: true,
	reviewerRole: "manager",
	requireClosure: true,
};

export default function IncidentConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [incidentTypes, setIncidentTypes] = useState(INCIDENT_TYPES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Incident reporting configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Incident settings restored to defaults.",
		});
	};

	const getSeverityBadge = (severity: string) => {
		switch (severity) {
			case "Critical":
				return <Badge variant="destructive">{severity}</Badge>;
			case "High":
				return <Badge className="bg-orange-600">{severity}</Badge>;
			case "Medium":
				return <Badge className="bg-yellow-600">{severity}</Badge>;
			default:
				return <Badge variant="secondary">{severity}</Badge>;
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Incident Reporting</h1>
					<p className="text-muted-foreground mt-1">
						Configure incident types, reporting requirements, and
						workflows.
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

			{/* Incident Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-destructive" />
							<div>
								<CardTitle>Incident Types</CardTitle>
								<CardDescription>
									Define categories and severity levels for
									incidents.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Type
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Incident Type</TableHead>
								<TableHead>Severity</TableHead>
								<TableHead>Report Required</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{incidentTypes.map((type) => (
								<TableRow key={type.id}>
									<TableCell className="font-medium">
										{type.name}
									</TableCell>
									<TableCell>
										{getSeverityBadge(type.severity)}
									</TableCell>
									<TableCell>
										{type.requiresReport
											? "Yes"
											: "Optional"}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												type.active
													? "default"
													: "secondary"
											}
										>
											{type.active
												? "Active"
												: "Inactive"}
										</Badge>
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
										>
											<Edit className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Reporting Requirements */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<FileText className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Reporting Requirements</CardTitle>
							<CardDescription>
								Configure what information is required when
								logging incidents.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Photo Evidence</Label>
								<p className="text-xs text-muted-foreground">
									Staff must upload photos.
								</p>
							</div>
							<Switch
								checked={config.requirePhotoEvidence}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										requirePhotoEvidence: c,
									})
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Body Map</Label>
								<p className="text-xs text-muted-foreground">
									Mark injury location on diagram.
								</p>
							</div>
							<Switch
								checked={config.requireBodyMap}
								onCheckedChange={(c) =>
									setConfig({ ...config, requireBodyMap: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Witness Information</Label>
								<p className="text-xs text-muted-foreground">
									Must record witness names.
								</p>
							</div>
							<Switch
								checked={config.requireWitnessInfo}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										requireWitnessInfo: c,
									})
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Signature</Label>
								<p className="text-xs text-muted-foreground">
									Staff must sign the report.
								</p>
							</div>
							<Switch
								checked={config.requireSignature}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										requireSignature: c,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Anonymous Reports</Label>
							<p className="text-xs text-muted-foreground">
								Members can report incidents anonymously.
							</p>
						</div>
						<Switch
							checked={config.allowAnonymous}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowAnonymous: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Notifications */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Bell className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>
								Configure who gets notified when incidents are
								reported.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Notify Manager</Label>
								<p className="text-xs text-muted-foreground">
									Email shift supervisor.
								</p>
							</div>
							<Switch
								checked={config.notifyManager}
								onCheckedChange={(c) =>
									setConfig({ ...config, notifyManager: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Notify Risk Officer</Label>
								<p className="text-xs text-muted-foreground">
									Email risk management.
								</p>
							</div>
							<Switch
								checked={config.notifyRiskOfficer}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										notifyRiskOfficer: c,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>
									Special Alert for Critical Incidents
								</Label>
								<p className="text-xs text-muted-foreground">
									Send immediate notification for critical
									severity.
								</p>
							</div>
							<Switch
								checked={config.notifyOnCritical}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										notifyOnCritical: c,
									})
								}
							/>
						</div>

						{config.notifyOnCritical && (
							<div className="space-y-2">
								<Label>Critical Alert Email</Label>
								<Input
									type="email"
									value={config.criticalNotifyEmail}
									onChange={(e) =>
										setConfig({
											...config,
											criticalNotifyEmail: e.target.value,
										})
									}
									placeholder="risk@university.edu"
								/>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Follow-up & Workflow */}
			<Card>
				<CardHeader>
					<CardTitle>Follow-up & Workflow</CardTitle>
					<CardDescription>
						Configure incident review and closure requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Follow-up</Label>
							<p className="text-xs text-muted-foreground">
								Incidents need follow-up action within deadline.
							</p>
						</div>
						<Switch
							checked={config.requireFollowUp}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireFollowUp: c })
							}
						/>
					</div>

					{config.requireFollowUp && (
						<div className="space-y-2">
							<Label>Follow-up Deadline (days)</Label>
							<Input
								type="number"
								value={config.followUpDays}
								onChange={(e) =>
									setConfig({
										...config,
										followUpDays:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Manager Review</Label>
							<p className="text-xs text-muted-foreground">
								Incidents must be reviewed by manager.
							</p>
						</div>
						<Switch
							checked={config.requireReview}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireReview: c })
							}
						/>
					</div>

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
							How long to keep incident records for compliance.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
