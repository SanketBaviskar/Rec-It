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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Save, RotateCcw, Clock, User, Plus, Edit } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Trainer Types
const TRAINER_TYPES = [
	{
		id: 1,
		name: "Certified Personal Trainer",
		rate: 60,
		sessions: 1,
		active: true,
	},
	{ id: 2, name: "Senior Trainer", rate: 80, sessions: 1, active: true },
	{
		id: 3,
		name: "Specialist (Sport-Specific)",
		rate: 90,
		sessions: 1,
		active: true,
	},
	{ id: 4, name: "Nutrition Coaching", rate: 50, sessions: 1, active: true },
];

const DEFAULT_CONFIG = {
	// Session Settings
	defaultSessionLength: 60,
	allowHalfSessions: true,
	halfSessionLength: 30,
	timeBetweenSessions: 15,

	// Booking Rules
	advanceBookingDays: 14,
	cancellationHours: 24,
	lateCancelFee: 25.0,
	noShowFee: 50.0,

	// Packages
	packagesEnabled: true,
	package5Discount: 10,
	package10Discount: 15,
	packageExpireDays: 180,

	// Trainer Settings
	trainerCanSetRates: false,
	trainerCanSetSchedule: true,
	requireCertification: true,

	// Client Limits
	maxClientsPerTrainer: 30,
	allowGroupSessions: true,
	maxGroupSize: 4,
};

export default function PersonalTrainingConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [trainerTypes] = useState(TRAINER_TYPES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Personal training configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Personal training settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Personal Training</h1>
					<p className="text-muted-foreground mt-1">
						Configure session types, packages, and trainer settings.
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

			{/* Trainer Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<User className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Trainer Categories</CardTitle>
								<CardDescription>
									Define trainer types and hourly rates.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Category
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Trainer Type</TableHead>
								<TableHead>Hourly Rate</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{trainerTypes.map((type) => (
								<TableRow key={type.id}>
									<TableCell className="font-medium">
										{type.name}
									</TableCell>
									<TableCell>${type.rate}/hr</TableCell>
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

			{/* Session Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Session Settings</CardTitle>
							<CardDescription>
								Configure session durations and scheduling.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Default Session Length (minutes)</Label>
							<Input
								type="number"
								value={config.defaultSessionLength}
								onChange={(e) =>
									setConfig({
										...config,
										defaultSessionLength:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Time Between Sessions (minutes)</Label>
							<Input
								type="number"
								value={config.timeBetweenSessions}
								onChange={(e) =>
									setConfig({
										...config,
										timeBetweenSessions:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Half Sessions</Label>
							<p className="text-xs text-muted-foreground">
								Offer shorter session options.
							</p>
						</div>
						<Switch
							checked={config.allowHalfSessions}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowHalfSessions: c })
							}
						/>
					</div>

					{config.allowHalfSessions && (
						<div className="space-y-2">
							<Label>Half Session Length (minutes)</Label>
							<Input
								type="number"
								value={config.halfSessionLength}
								onChange={(e) =>
									setConfig({
										...config,
										halfSessionLength:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Booking & Cancellation */}
			<Card>
				<CardHeader>
					<CardTitle>Booking & Cancellation Policy</CardTitle>
					<CardDescription>
						Configure booking windows and cancellation fees.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Advance Booking Window (days)</Label>
							<Input
								type="number"
								value={config.advanceBookingDays}
								onChange={(e) =>
									setConfig({
										...config,
										advanceBookingDays:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Cancellation Notice (hours)</Label>
							<Input
								type="number"
								value={config.cancellationHours}
								onChange={(e) =>
									setConfig({
										...config,
										cancellationHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Late Cancellation Fee ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.lateCancelFee}
								onChange={(e) =>
									setConfig({
										...config,
										lateCancelFee:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>No-Show Fee ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.noShowFee}
								onChange={(e) =>
									setConfig({
										...config,
										noShowFee:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Packages */}
			<Card>
				<CardHeader>
					<CardTitle>Session Packages</CardTitle>
					<CardDescription>
						Configure bulk session discounts.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Packages</Label>
							<p className="text-xs text-muted-foreground">
								Allow clients to purchase session bundles.
							</p>
						</div>
						<Switch
							checked={config.packagesEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, packagesEnabled: c })
							}
						/>
					</div>

					{config.packagesEnabled && (
						<>
							<Separator />
							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label>5-Pack Discount (%)</Label>
									<Input
										type="number"
										value={config.package5Discount}
										onChange={(e) =>
											setConfig({
												...config,
												package5Discount:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>10-Pack Discount (%)</Label>
									<Input
										type="number"
										value={config.package10Discount}
										onChange={(e) =>
											setConfig({
												...config,
												package10Discount:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Package Expiration (days)</Label>
									<Input
										type="number"
										value={config.packageExpireDays}
										onChange={(e) =>
											setConfig({
												...config,
												packageExpireDays:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Group Sessions */}
			<Card>
				<CardHeader>
					<CardTitle>Group Training</CardTitle>
					<CardDescription>
						Configure small group personal training options.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Group Sessions</Label>
							<p className="text-xs text-muted-foreground">
								Enable semi-private training with multiple
								clients.
							</p>
						</div>
						<Switch
							checked={config.allowGroupSessions}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowGroupSessions: c })
							}
						/>
					</div>

					{config.allowGroupSessions && (
						<div className="space-y-2">
							<Label>Maximum Group Size</Label>
							<Input
								type="number"
								value={config.maxGroupSize}
								onChange={(e) =>
									setConfig({
										...config,
										maxGroupSize:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
