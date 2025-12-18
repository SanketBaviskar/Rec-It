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
	Award,
	Plus,
	Edit,
	AlertTriangle,
	CheckCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Certification Types
const CERT_TYPES = [
	{
		id: 1,
		name: "CPR/AED",
		validityMonths: 24,
		required: true,
		active: true,
	},
	{
		id: 2,
		name: "First Aid",
		validityMonths: 24,
		required: true,
		active: true,
	},
	{
		id: 3,
		name: "Lifeguard",
		validityMonths: 24,
		required: false,
		active: true,
	},
	{
		id: 4,
		name: "Personal Trainer",
		validityMonths: 12,
		required: false,
		active: true,
	},
	{
		id: 5,
		name: "Group Fitness Instructor",
		validityMonths: 24,
		required: false,
		active: true,
	},
	{
		id: 6,
		name: "Swim Instructor",
		validityMonths: 24,
		required: false,
		active: true,
	},
];

// Mock Staff Certifications
const STAFF_CERTS = [
	{
		id: 1,
		staff: "John Doe",
		cert: "CPR/AED",
		expires: "2024-06-15",
		status: "Active",
	},
	{
		id: 2,
		staff: "Jane Smith",
		cert: "Lifeguard",
		expires: "2024-02-01",
		status: "Expiring Soon",
	},
	{
		id: 3,
		staff: "Bob Johnson",
		cert: "First Aid",
		expires: "2023-12-01",
		status: "Expired",
	},
	{
		id: 4,
		staff: "Alice Brown",
		cert: "Personal Trainer",
		expires: "2024-08-20",
		status: "Active",
	},
];

const DEFAULT_CONFIG = {
	// Notifications
	expirationReminderEnabled: true,
	reminderDays: [90, 60, 30, 14, 7],
	notifyManager: true,
	notifyStaff: true,

	// Enforcement
	blockSchedulingIfExpired: true,
	gracePeriorDays: 7,
	requireUploadProof: true,

	// Tracking
	trackCPD: true,
	cpdHoursRequired: 20,
	cpdPeriodMonths: 12,
};

export default function CertificationConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [certTypes] = useState(CERT_TYPES);
	const [staffCerts] = useState(STAFF_CERTS);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description:
				"Certification tracking configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Certification settings restored to defaults.",
		});
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "Active":
				return <Badge className="bg-green-600">{status}</Badge>;
			case "Expiring Soon":
				return <Badge className="bg-orange-600">{status}</Badge>;
			case "Expired":
				return <Badge variant="destructive">{status}</Badge>;
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Staff Certifications</h1>
					<p className="text-muted-foreground mt-1">
						Track staff credentials, expirations, and continuing
						education.
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

			{/* Quick Stats */}
			<div className="grid grid-cols-3 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-4">
							<CheckCircle className="h-8 w-8 text-green-600" />
							<div>
								<p className="text-2xl font-bold">24</p>
								<p className="text-sm text-muted-foreground">
									Active Certs
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-4">
							<AlertTriangle className="h-8 w-8 text-orange-600" />
							<div>
								<p className="text-2xl font-bold">5</p>
								<p className="text-sm text-muted-foreground">
									Expiring Soon
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-4">
							<AlertTriangle className="h-8 w-8 text-red-600" />
							<div>
								<p className="text-2xl font-bold">2</p>
								<p className="text-sm text-muted-foreground">
									Expired
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Certification Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Award className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Certification Types</CardTitle>
								<CardDescription>
									Define required and optional certifications.
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
								<TableHead>Certification</TableHead>
								<TableHead>Validity Period</TableHead>
								<TableHead>Required</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{certTypes.map((cert) => (
								<TableRow key={cert.id}>
									<TableCell className="font-medium">
										{cert.name}
									</TableCell>
									<TableCell>
										{cert.validityMonths} months
									</TableCell>
									<TableCell>
										<Badge
											variant={
												cert.required
													? "default"
													: "outline"
											}
										>
											{cert.required
												? "Required"
												: "Optional"}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												cert.active
													? "default"
													: "secondary"
											}
										>
											{cert.active
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

			{/* Staff Cert Status */}
			<Card>
				<CardHeader>
					<CardTitle>Staff Certification Status</CardTitle>
					<CardDescription>
						Current status of all staff certifications.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Staff Member</TableHead>
								<TableHead>Certification</TableHead>
								<TableHead>Expires</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{staffCerts.map((cert) => (
								<TableRow key={cert.id}>
									<TableCell className="font-medium">
										{cert.staff}
									</TableCell>
									<TableCell>{cert.cert}</TableCell>
									<TableCell>{cert.expires}</TableCell>
									<TableCell>
										{getStatusBadge(cert.status)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Notification Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Notification Settings</CardTitle>
					<CardDescription>
						Configure expiration reminders and alerts.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Expiration Reminders</Label>
							<p className="text-xs text-muted-foreground">
								Send automated reminders before certs expire.
							</p>
						</div>
						<Switch
							checked={config.expirationReminderEnabled}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									expirationReminderEnabled: c,
								})
							}
						/>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<Label>Notify Staff Member</Label>
							<Switch
								checked={config.notifyStaff}
								onCheckedChange={(c) =>
									setConfig({ ...config, notifyStaff: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label>Notify Manager</Label>
							<Switch
								checked={config.notifyManager}
								onCheckedChange={(c) =>
									setConfig({ ...config, notifyManager: c })
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enforcement */}
			<Card>
				<CardHeader>
					<CardTitle>Enforcement Rules</CardTitle>
					<CardDescription>
						Configure how expired certifications are handled.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Block Scheduling if Expired</Label>
							<p className="text-xs text-muted-foreground">
								Prevent scheduling staff with expired certs.
							</p>
						</div>
						<Switch
							checked={config.blockSchedulingIfExpired}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									blockSchedulingIfExpired: c,
								})
							}
						/>
					</div>

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
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Proof Upload</Label>
							<p className="text-xs text-muted-foreground">
								Staff must upload cert document/card.
							</p>
						</div>
						<Switch
							checked={config.requireUploadProof}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireUploadProof: c })
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
