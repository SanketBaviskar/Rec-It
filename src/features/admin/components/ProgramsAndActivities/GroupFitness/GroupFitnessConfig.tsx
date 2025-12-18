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
	Dumbbell,
	Clock,
	Users,
	Plus,
	Edit,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Class Types
const CLASS_TYPES = [
	{ id: 1, name: "Yoga", duration: 60, capacity: 25, active: true },
	{ id: 2, name: "Spinning", duration: 45, capacity: 20, active: true },
	{ id: 3, name: "HIIT", duration: 30, capacity: 30, active: true },
	{ id: 4, name: "Pilates", duration: 60, capacity: 20, active: true },
	{ id: 5, name: "Zumba", duration: 60, capacity: 40, active: true },
	{ id: 6, name: "Body Pump", duration: 45, capacity: 25, active: false },
];

const DEFAULT_CONFIG = {
	// Registration Settings
	allowOnlineRegistration: true,
	registrationOpensHours: 48,
	registrationClosesMinutes: 30,
	allowWaitlist: true,
	maxWaitlistSize: 10,

	// Cancellation Policy
	lateCancelMinutes: 120,
	lateCancelFee: 5.0,
	noShowFee: 10.0,
	maxNoShowsPerMonth: 3,

	// Class Settings
	defaultClassDuration: 60,
	timeBetweenClasses: 15,
	requireCheckIn: true,
	checkInWindowMinutes: 15,
	releaseSpotIfNotCheckedIn: true,

	// Instructor Settings
	requireCertification: true,
	allowSubstitutes: true,
	notifyOnSubstitute: true,

	// Capacity
	memberOnlyClasses: false,
	allowGuestAccess: true,
	guestFeePerClass: 5.0,
};

export default function GroupFitnessConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [classTypes, setClassTypes] = useState(CLASS_TYPES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Group fitness configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Group fitness settings restored to defaults.",
		});
	};

	const toggleClassType = (id: number) => {
		setClassTypes(
			classTypes.map((c) =>
				c.id === id ? { ...c, active: !c.active } : c
			)
		);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Group Fitness</h1>
					<p className="text-muted-foreground mt-1">
						Configure class types, registration, and instructor
						settings.
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

			{/* Class Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Dumbbell className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Class Types</CardTitle>
								<CardDescription>
									Manage available group fitness classes.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Class Type
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Class</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Capacity</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{classTypes.map((cls) => (
								<TableRow key={cls.id}>
									<TableCell className="font-medium">
										{cls.name}
									</TableCell>
									<TableCell>{cls.duration} min</TableCell>
									<TableCell>{cls.capacity}</TableCell>
									<TableCell>
										<Badge
											variant={
												cls.active
													? "default"
													: "secondary"
											}
										>
											{cls.active ? "Active" : "Inactive"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Switch
												checked={cls.active}
												onCheckedChange={() =>
													toggleClassType(cls.id)
												}
											/>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Registration Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Registration Settings</CardTitle>
							<CardDescription>
								Configure class booking windows and waitlist.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Online Registration</Label>
							<p className="text-xs text-muted-foreground">
								Members can book classes through the
								app/website.
							</p>
						</div>
						<Switch
							checked={config.allowOnlineRegistration}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									allowOnlineRegistration: c,
								})
							}
						/>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>
								Registration Opens (hours before class)
							</Label>
							<Input
								type="number"
								value={config.registrationOpensHours}
								onChange={(e) =>
									setConfig({
										...config,
										registrationOpensHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Registration Closes (minutes before class)
							</Label>
							<Input
								type="number"
								value={config.registrationClosesMinutes}
								onChange={(e) =>
									setConfig({
										...config,
										registrationClosesMinutes:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Waitlist</Label>
							<p className="text-xs text-muted-foreground">
								Members can join waitlist when class is full.
							</p>
						</div>
						<Switch
							checked={config.allowWaitlist}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowWaitlist: c })
							}
						/>
					</div>

					{config.allowWaitlist && (
						<div className="space-y-2">
							<Label>Maximum Waitlist Size</Label>
							<Input
								type="number"
								value={config.maxWaitlistSize}
								onChange={(e) =>
									setConfig({
										...config,
										maxWaitlistSize:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Cancellation Policy */}
			<Card>
				<CardHeader>
					<CardTitle>Cancellation Policy</CardTitle>
					<CardDescription>
						Configure penalties for late cancellations and no-shows.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Late Cancel Window (minutes before)</Label>
							<Input
								type="number"
								value={config.lateCancelMinutes}
								onChange={(e) =>
									setConfig({
										...config,
										lateCancelMinutes:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								Cancellations within this window are "late."
							</p>
						</div>
						<div className="space-y-2">
							<Label>Late Cancel Fee ($)</Label>
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
					</div>

					<div className="grid grid-cols-2 gap-4">
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
						<div className="space-y-2">
							<Label>Max No-Shows Per Month</Label>
							<Input
								type="number"
								value={config.maxNoShowsPerMonth}
								onChange={(e) =>
									setConfig({
										...config,
										maxNoShowsPerMonth:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								Before booking privileges suspended.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Check-in Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Check-in Settings</CardTitle>
					<CardDescription>
						Configure class check-in requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Check-in</Label>
							<p className="text-xs text-muted-foreground">
								Members must check in before class starts.
							</p>
						</div>
						<Switch
							checked={config.requireCheckIn}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireCheckIn: c })
							}
						/>
					</div>

					{config.requireCheckIn && (
						<>
							<div className="space-y-2">
								<Label>
									Check-in Window (minutes before class)
								</Label>
								<Input
									type="number"
									value={config.checkInWindowMinutes}
									onChange={(e) =>
										setConfig({
											...config,
											checkInWindowMinutes:
												parseInt(e.target.value) || 0,
										})
									}
									className="w-32"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>
										Release Spot if Not Checked In
									</Label>
									<p className="text-xs text-muted-foreground">
										Give unclaimed spots to waitlist
										members.
									</p>
								</div>
								<Switch
									checked={config.releaseSpotIfNotCheckedIn}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											releaseSpotIfNotCheckedIn: c,
										})
									}
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Guest Access */}
			<Card>
				<CardHeader>
					<CardTitle>Guest Access</CardTitle>
					<CardDescription>
						Configure non-member class access.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Guest Access to Classes</Label>
							<p className="text-xs text-muted-foreground">
								Non-members can attend classes for a fee.
							</p>
						</div>
						<Switch
							checked={config.allowGuestAccess}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowGuestAccess: c })
							}
						/>
					</div>

					{config.allowGuestAccess && (
						<div className="space-y-2">
							<Label>Guest Fee Per Class ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.guestFeePerClass}
								onChange={(e) =>
									setConfig({
										...config,
										guestFeePerClass:
											parseFloat(e.target.value) || 0,
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
