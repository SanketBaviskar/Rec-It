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
import { Save, RotateCcw, Mountain, Plus, Edit, FileText } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Trip Types
const TRIP_TYPES = [
	{
		id: 1,
		name: "Day Hike",
		duration: "1 day",
		difficulty: "Beginner",
		active: true,
	},
	{
		id: 2,
		name: "Overnight Backpacking",
		duration: "2 days",
		difficulty: "Intermediate",
		active: true,
	},
	{
		id: 3,
		name: "Rock Climbing",
		duration: "1 day",
		difficulty: "Advanced",
		active: true,
	},
	{
		id: 4,
		name: "Kayaking",
		duration: "1 day",
		difficulty: "Beginner",
		active: true,
	},
	{
		id: 5,
		name: "Ski Weekend",
		duration: "2-3 days",
		difficulty: "Intermediate",
		active: true,
	},
];

const DEFAULT_CONFIG = {
	// Registration
	registrationOpenDays: 30,
	registrationCloseHours: 48,
	allowWaitlist: true,
	maxWaitlistSize: 10,

	// Pricing
	memberDiscount: 20,
	nonMemberAllowed: true,
	depositRequired: true,
	depositPercent: 50,

	// Requirements
	requireWaiver: true,
	requireHealthForm: true,
	minimumAge: 18,
	allowMinorsWithParent: true,
	minorParentWaiver: true,

	// Cancellation
	fullRefundDays: 14,
	partialRefundDays: 7,
	partialRefundPercent: 50,

	// Group Size
	minGroupSize: 4,
	maxGroupSize: 12,
	cancelIfMinNotMet: true,

	// Leader Requirements
	requireFirstAid: true,
	requireWFA: true,
	leaderToParticipantRatio: 8,
};

export default function OutdoorAdventuresConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [tripTypes] = useState(TRIP_TYPES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Outdoor adventures configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Outdoor adventure settings restored to defaults.",
		});
	};

	const getDifficultyBadge = (difficulty: string) => {
		switch (difficulty) {
			case "Beginner":
				return <Badge className="bg-green-600">{difficulty}</Badge>;
			case "Intermediate":
				return <Badge className="bg-yellow-600">{difficulty}</Badge>;
			case "Advanced":
				return <Badge className="bg-red-600">{difficulty}</Badge>;
			default:
				return <Badge variant="secondary">{difficulty}</Badge>;
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Outdoor Adventures</h1>
					<p className="text-muted-foreground mt-1">
						Configure trips, waivers, pricing, and leader
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

			{/* Trip Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Mountain className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Trip Types</CardTitle>
								<CardDescription>
									Define available outdoor adventure
									categories.
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
								<TableHead>Trip Type</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Difficulty</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{tripTypes.map((trip) => (
								<TableRow key={trip.id}>
									<TableCell className="font-medium">
										{trip.name}
									</TableCell>
									<TableCell>{trip.duration}</TableCell>
									<TableCell>
										{getDifficultyBadge(trip.difficulty)}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												trip.active
													? "default"
													: "secondary"
											}
										>
											{trip.active
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

			{/* Registration Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Registration Settings</CardTitle>
					<CardDescription>
						Configure trip registration windows and waitlist.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Registration Opens (days before trip)</Label>
							<Input
								type="number"
								value={config.registrationOpenDays}
								onChange={(e) =>
									setConfig({
										...config,
										registrationOpenDays:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Registration Closes (hours before trip)
							</Label>
							<Input
								type="number"
								value={config.registrationCloseHours}
								onChange={(e) =>
									setConfig({
										...config,
										registrationCloseHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Waitlist</Label>
							<p className="text-xs text-muted-foreground">
								Allow waitlist when trips are full.
							</p>
						</div>
						<Switch
							checked={config.allowWaitlist}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowWaitlist: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Waiver & Safety Requirements */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<FileText className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Safety Requirements</CardTitle>
							<CardDescription>
								Configure waivers and health documentation.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<Label>Require Waiver</Label>
							<Switch
								checked={config.requireWaiver}
								onCheckedChange={(c) =>
									setConfig({ ...config, requireWaiver: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label>Require Health Form</Label>
							<Switch
								checked={config.requireHealthForm}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										requireHealthForm: c,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label>Minimum Participant Age</Label>
						<Input
							type="number"
							value={config.minimumAge}
							onChange={(e) =>
								setConfig({
									...config,
									minimumAge: parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Minors with Parent/Guardian</Label>
							<p className="text-xs text-muted-foreground">
								Under-age participants can join with adult
								supervision.
							</p>
						</div>
						<Switch
							checked={config.allowMinorsWithParent}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									allowMinorsWithParent: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Pricing & Deposits */}
			<Card>
				<CardHeader>
					<CardTitle>Pricing & Deposits</CardTitle>
					<CardDescription>
						Configure trip pricing and payment requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Member Discount (%)</Label>
						<Input
							type="number"
							value={config.memberDiscount}
							onChange={(e) =>
								setConfig({
									...config,
									memberDiscount:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Non-Members</Label>
							<p className="text-xs text-muted-foreground">
								Non-members can register at full price.
							</p>
						</div>
						<Switch
							checked={config.nonMemberAllowed}
							onCheckedChange={(c) =>
								setConfig({ ...config, nonMemberAllowed: c })
							}
						/>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Deposit</Label>
							<p className="text-xs text-muted-foreground">
								Collect partial payment at registration.
							</p>
						</div>
						<Switch
							checked={config.depositRequired}
							onCheckedChange={(c) =>
								setConfig({ ...config, depositRequired: c })
							}
						/>
					</div>

					{config.depositRequired && (
						<div className="space-y-2">
							<Label>Deposit Percentage (%)</Label>
							<Input
								type="number"
								value={config.depositPercent}
								onChange={(e) =>
									setConfig({
										...config,
										depositPercent:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Group Size */}
			<Card>
				<CardHeader>
					<CardTitle>Group Size Limits</CardTitle>
					<CardDescription>
						Configure minimum and maximum participants.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Minimum Group Size</Label>
							<Input
								type="number"
								value={config.minGroupSize}
								onChange={(e) =>
									setConfig({
										...config,
										minGroupSize:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
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
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Cancel if Minimum Not Met</Label>
							<p className="text-xs text-muted-foreground">
								Automatically cancel trip if below minimum.
							</p>
						</div>
						<Switch
							checked={config.cancelIfMinNotMet}
							onCheckedChange={(c) =>
								setConfig({ ...config, cancelIfMinNotMet: c })
							}
						/>
					</div>

					<div className="space-y-2">
						<Label>
							Leader to Participant Ratio (1 leader per X
							participants)
						</Label>
						<Input
							type="number"
							value={config.leaderToParticipantRatio}
							onChange={(e) =>
								setConfig({
									...config,
									leaderToParticipantRatio:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
