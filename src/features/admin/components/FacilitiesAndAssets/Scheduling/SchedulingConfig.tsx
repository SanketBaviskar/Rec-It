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
import { Save, RotateCcw, Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Booking Window
	advanceBookingDays: 14,
	minBookingHours: 1,
	maxBookingHours: 4,
	sameDayBookingAllowed: true,
	sameDayBookingCutoffHours: 2,

	// Cancellation Policy
	freeCancellationHours: 24,
	lateCancelFee: 25.0,
	noShowFee: 50.0,

	// Recurring Bookings
	recurringAllowed: true,
	maxRecurringWeeks: 16,
	requireApprovalForRecurring: true,

	// Approval Workflow
	requireApprovalAboveHours: 2,
	autoApproveMembers: true,
	autoApproveStaff: true,

	// Conflict Resolution
	allowOverlap: false,
	bufferMinutes: 15,
	prioritySystem: "firstComeFirstServed",

	// Pricing
	memberRate: 0,
	nonMemberRate: 25.0,
	peakHourMultiplier: 1.5,
	peakHoursStart: "17:00",
	peakHoursEnd: "21:00",
};

export default function SchedulingConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Facility scheduling configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Scheduling settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Facility Scheduling</h1>
					<p className="text-muted-foreground mt-1">
						Configure booking rules, approval workflows, and
						pricing.
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

			{/* Booking Window */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Booking Window</CardTitle>
							<CardDescription>
								Configure how far in advance bookings can be
								made.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label>Advance Booking (days)</Label>
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
							<Label>Min Booking Duration (hours)</Label>
							<Input
								type="number"
								value={config.minBookingHours}
								onChange={(e) =>
									setConfig({
										...config,
										minBookingHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Max Booking Duration (hours)</Label>
							<Input
								type="number"
								value={config.maxBookingHours}
								onChange={(e) =>
									setConfig({
										...config,
										maxBookingHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Same-Day Booking</Label>
							<p className="text-xs text-muted-foreground">
								Users can book facilities on the same day.
							</p>
						</div>
						<Switch
							checked={config.sameDayBookingAllowed}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									sameDayBookingAllowed: c,
								})
							}
						/>
					</div>

					{config.sameDayBookingAllowed && (
						<div className="space-y-2">
							<Label>Same-Day Cutoff (hours before)</Label>
							<Input
								type="number"
								value={config.sameDayBookingCutoffHours}
								onChange={(e) =>
									setConfig({
										...config,
										sameDayBookingCutoffHours:
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
						Configure cancellation windows and fees.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Free Cancellation Window (hours before)</Label>
						<Input
							type="number"
							value={config.freeCancellationHours}
							onChange={(e) =>
								setConfig({
									...config,
									freeCancellationHours:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

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

			{/* Recurring Bookings */}
			<Card>
				<CardHeader>
					<CardTitle>Recurring Bookings</CardTitle>
					<CardDescription>
						Configure recurring reservation settings.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Recurring Bookings</Label>
							<p className="text-xs text-muted-foreground">
								Users can schedule weekly/monthly recurring
								reservations.
							</p>
						</div>
						<Switch
							checked={config.recurringAllowed}
							onCheckedChange={(c) =>
								setConfig({ ...config, recurringAllowed: c })
							}
						/>
					</div>

					{config.recurringAllowed && (
						<>
							<div className="space-y-2">
								<Label>Max Recurring Duration (weeks)</Label>
								<Input
									type="number"
									value={config.maxRecurringWeeks}
									onChange={(e) =>
										setConfig({
											...config,
											maxRecurringWeeks:
												parseInt(e.target.value) || 0,
										})
									}
									className="w-32"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>
										Require Approval for Recurring
									</Label>
									<p className="text-xs text-muted-foreground">
										Admin must approve recurring
										reservations.
									</p>
								</div>
								<Switch
									checked={config.requireApprovalForRecurring}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											requireApprovalForRecurring: c,
										})
									}
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Approval Workflow */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Approval Workflow</CardTitle>
							<CardDescription>
								Configure when bookings require admin approval.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>
							Require Approval for Bookings Over (hours)
						</Label>
						<Input
							type="number"
							value={config.requireApprovalAboveHours}
							onChange={(e) =>
								setConfig({
									...config,
									requireApprovalAboveHours:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<Label>Auto-Approve Members</Label>
							<Switch
								checked={config.autoApproveMembers}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										autoApproveMembers: c,
									})
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label>Auto-Approve Staff</Label>
							<Switch
								checked={config.autoApproveStaff}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										autoApproveStaff: c,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Conflict Resolution */}
			<Card>
				<CardHeader>
					<CardTitle>Conflict Resolution</CardTitle>
					<CardDescription>
						Configure how overlapping bookings are handled.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Priority System</Label>
						<Select
							value={config.prioritySystem}
							onValueChange={(v) =>
								setConfig({ ...config, prioritySystem: v })
							}
						>
							<SelectTrigger className="w-64">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="firstComeFirstServed">
									First Come, First Served
								</SelectItem>
								<SelectItem value="memberPriority">
									Member Priority
								</SelectItem>
								<SelectItem value="staffPriority">
									Staff Priority
								</SelectItem>
								<SelectItem value="departmentPriority">
									Department Priority
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Buffer Time Between Bookings (minutes)</Label>
						<Input
							type="number"
							value={config.bufferMinutes}
							onChange={(e) =>
								setConfig({
									...config,
									bufferMinutes:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Pricing */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Pricing</CardTitle>
							<CardDescription>
								Configure hourly rates and peak pricing.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Member Hourly Rate ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.memberRate}
								onChange={(e) =>
									setConfig({
										...config,
										memberRate:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Non-Member Hourly Rate ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.nonMemberRate}
								onChange={(e) =>
									setConfig({
										...config,
										nonMemberRate:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label>Peak Hour Multiplier</Label>
						<Input
							type="number"
							step="0.1"
							value={config.peakHourMultiplier}
							onChange={(e) =>
								setConfig({
									...config,
									peakHourMultiplier:
										parseFloat(e.target.value) || 1,
								})
							}
							className="w-32"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Peak Hours Start</Label>
							<Input
								type="time"
								value={config.peakHoursStart}
								onChange={(e) =>
									setConfig({
										...config,
										peakHoursStart: e.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Peak Hours End</Label>
							<Input
								type="time"
								value={config.peakHoursEnd}
								onChange={(e) =>
									setConfig({
										...config,
										peakHoursEnd: e.target.value,
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
