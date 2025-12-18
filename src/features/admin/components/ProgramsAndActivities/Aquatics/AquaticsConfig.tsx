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
	Waves,
	Clock,
	Users,
	Plus,
	Edit,
	AlertTriangle,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Pool Configurations
const POOLS = [
	{
		id: 1,
		name: "Main Competition Pool",
		lanes: 8,
		depth: "4-12 ft",
		active: true,
	},
	{ id: 2, name: "Recreation Pool", lanes: 4, depth: "3-5 ft", active: true },
	{ id: 3, name: "Diving Well", lanes: 0, depth: "14 ft", active: true },
	{ id: 4, name: "Hot Tub", lanes: 0, depth: "4 ft", active: true },
];

const LESSON_LEVELS = [
	{ id: 1, name: "Parent & Tot", minAge: 0, maxAge: 3, active: true },
	{ id: 2, name: "Preschool", minAge: 3, maxAge: 5, active: true },
	{ id: 3, name: "Beginner", minAge: 6, maxAge: 12, active: true },
	{ id: 4, name: "Intermediate", minAge: 6, maxAge: 17, active: true },
	{ id: 5, name: "Advanced", minAge: 10, maxAge: 17, active: true },
	{ id: 6, name: "Adult Beginner", minAge: 18, maxAge: 99, active: true },
];

const DEFAULT_CONFIG = {
	// Lane Reservations
	allowLaneReservations: true,
	maxLanesPerPerson: 1,
	reservationLimitMinutes: 60,
	advanceBookingHours: 48,

	// Swim Lessons
	lessonsEnabled: true,
	lessonDurationMinutes: 30,
	studentsPerInstructor: 4,
	requireSwimTest: true,

	// Safety Requirements
	lifeguardRatio: 25,
	maxCapacityPerPool: 50,
	requireWaiver: true,
	minAgeUnaccompanied: 14,

	// Chemical Logging
	chemicalLoggingEnabled: true,
	loggingIntervalHours: 2,
	alertOnAbnormal: true,

	// Access Control
	memberOnlyLapSwim: true,
	guestAccessAllowed: true,
	guestFee: 5.0,
};

export default function AquaticsConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [pools, setPools] = useState(POOLS);
	const [lessonLevels, setLessonLevels] = useState(LESSON_LEVELS);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Aquatics configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Aquatics settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Aquatics</h1>
					<p className="text-muted-foreground mt-1">
						Configure pools, swim lessons, lane reservations, and
						safety rules.
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

			{/* Pools */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Waves className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Pool Facilities</CardTitle>
								<CardDescription>
									Manage available pools and their
									configurations.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Pool
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Pool Name</TableHead>
								<TableHead>Lanes</TableHead>
								<TableHead>Depth</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pools.map((pool) => (
								<TableRow key={pool.id}>
									<TableCell className="font-medium">
										{pool.name}
									</TableCell>
									<TableCell>{pool.lanes || "N/A"}</TableCell>
									<TableCell>{pool.depth}</TableCell>
									<TableCell>
										<Badge
											variant={
												pool.active
													? "default"
													: "secondary"
											}
										>
											{pool.active ? "Open" : "Closed"}
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

			{/* Lane Reservations */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Lane Reservations</CardTitle>
							<CardDescription>
								Configure lap swim lane booking rules.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Lane Reservations</Label>
							<p className="text-xs text-muted-foreground">
								Members can reserve lanes for lap swimming.
							</p>
						</div>
						<Switch
							checked={config.allowLaneReservations}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									allowLaneReservations: c,
								})
							}
						/>
					</div>

					{config.allowLaneReservations && (
						<>
							<Separator />
							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label>Max Lanes Per Person</Label>
									<Input
										type="number"
										value={config.maxLanesPerPerson}
										onChange={(e) =>
											setConfig({
												...config,
												maxLanesPerPerson:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Reservation Limit (minutes)</Label>
									<Input
										type="number"
										value={config.reservationLimitMinutes}
										onChange={(e) =>
											setConfig({
												...config,
												reservationLimitMinutes:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Advance Booking (hours)</Label>
									<Input
										type="number"
										value={config.advanceBookingHours}
										onChange={(e) =>
											setConfig({
												...config,
												advanceBookingHours:
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

			{/* Swim Lessons */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Users className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Swim Lessons</CardTitle>
								<CardDescription>
									Configure lesson levels and instructor
									ratios.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Level
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Swim Lessons Enabled</Label>
							<p className="text-xs text-muted-foreground">
								Offer swim instruction programs.
							</p>
						</div>
						<Switch
							checked={config.lessonsEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, lessonsEnabled: c })
							}
						/>
					</div>

					{config.lessonsEnabled && (
						<>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Lesson Duration (minutes)</Label>
									<Input
										type="number"
										value={config.lessonDurationMinutes}
										onChange={(e) =>
											setConfig({
												...config,
												lessonDurationMinutes:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Students Per Instructor</Label>
									<Input
										type="number"
										value={config.studentsPerInstructor}
										onChange={(e) =>
											setConfig({
												...config,
												studentsPerInstructor:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
							</div>

							<Separator />

							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Level</TableHead>
										<TableHead>Age Range</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-20">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{lessonLevels.map((level) => (
										<TableRow key={level.id}>
											<TableCell className="font-medium">
												{level.name}
											</TableCell>
											<TableCell>
												{level.minAge} - {level.maxAge}{" "}
												years
											</TableCell>
											<TableCell>
												<Badge
													variant={
														level.active
															? "default"
															: "secondary"
													}
												>
													{level.active
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
						</>
					)}
				</CardContent>
			</Card>

			{/* Safety Requirements */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						<div>
							<CardTitle>Safety Requirements</CardTitle>
							<CardDescription>
								Configure lifeguard ratios and capacity limits.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>
								Lifeguard Ratio (swimmers per lifeguard)
							</Label>
							<Input
								type="number"
								value={config.lifeguardRatio}
								onChange={(e) =>
									setConfig({
										...config,
										lifeguardRatio:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Max Capacity Per Pool</Label>
							<Input
								type="number"
								value={config.maxCapacityPerPool}
								onChange={(e) =>
									setConfig({
										...config,
										maxCapacityPerPool:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label>Minimum Age for Unaccompanied Swimmers</Label>
						<Input
							type="number"
							value={config.minAgeUnaccompanied}
							onChange={(e) =>
								setConfig({
									...config,
									minAgeUnaccompanied:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
						<p className="text-xs text-muted-foreground">
							Children under this age must have adult supervision.
						</p>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Pool-Specific Waiver</Label>
							<p className="text-xs text-muted-foreground">
								Members must sign aquatics waiver.
							</p>
						</div>
						<Switch
							checked={config.requireWaiver}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireWaiver: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Chemical Logging */}
			<Card>
				<CardHeader>
					<CardTitle>Chemical Logging</CardTitle>
					<CardDescription>
						Configure water quality monitoring requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Chemical Logging</Label>
							<p className="text-xs text-muted-foreground">
								Require staff to log pool chemical levels.
							</p>
						</div>
						<Switch
							checked={config.chemicalLoggingEnabled}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									chemicalLoggingEnabled: c,
								})
							}
						/>
					</div>

					{config.chemicalLoggingEnabled && (
						<>
							<div className="space-y-2">
								<Label>Logging Interval (hours)</Label>
								<Input
									type="number"
									value={config.loggingIntervalHours}
									onChange={(e) =>
										setConfig({
											...config,
											loggingIntervalHours:
												parseInt(e.target.value) || 0,
										})
									}
									className="w-32"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Alert on Abnormal Readings</Label>
									<p className="text-xs text-muted-foreground">
										Notify manager if levels are out of
										range.
									</p>
								</div>
								<Switch
									checked={config.alertOnAbnormal}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											alertOnAbnormal: c,
										})
									}
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
