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
import { Save, RotateCcw, Lock, Plus, Edit, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Locker Banks
const LOCKER_BANKS = [
	{
		id: 1,
		name: "Men's Main",
		location: "Locker Room A",
		total: 100,
		available: 23,
		active: true,
	},
	{
		id: 2,
		name: "Women's Main",
		location: "Locker Room B",
		total: 100,
		available: 31,
		active: true,
	},
	{
		id: 3,
		name: "Day Use - Pool",
		location: "Pool Deck",
		total: 50,
		available: 50,
		active: true,
	},
	{
		id: 4,
		name: "VIP Lockers",
		location: "Premium Area",
		total: 20,
		available: 5,
		active: true,
	},
];

const DEFAULT_CONFIG = {
	// Rental Periods
	dailyRentalEnabled: true,
	dailyRate: 2.0,
	semesterRentalEnabled: true,
	semesterRate: 50.0,
	annualRentalEnabled: true,
	annualRate: 100.0,

	// Assignment Rules
	autoAssign: true,
	allowPreference: true,
	requireDeposit: true,
	depositAmount: 25.0,

	// Cleanout Policy
	cleanoutAfterDays: 14,
	sendCleanoutWarning: true,
	warningDaysBefore: 7,
	chargeCleanoutFee: true,
	cleanoutFee: 25.0,

	// Access
	requireMembership: true,
	allowGuestLockers: false,
};

export default function LockerConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [lockerBanks] = useState(LOCKER_BANKS);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Locker services configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Locker settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Locker Services</h1>
					<p className="text-muted-foreground mt-1">
						Configure locker banks, rental rates, and cleanout
						policies.
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

			{/* Locker Banks */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Lock className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Locker Banks</CardTitle>
								<CardDescription>
									Manage locker locations and availability.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Bank
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Bank Name</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Available</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{lockerBanks.map((bank) => (
								<TableRow key={bank.id}>
									<TableCell className="font-medium">
										{bank.name}
									</TableCell>
									<TableCell>{bank.location}</TableCell>
									<TableCell>{bank.total}</TableCell>
									<TableCell>
										<Badge
											variant={
												bank.available > 10
													? "default"
													: "destructive"
											}
										>
											{bank.available}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												bank.active
													? "default"
													: "secondary"
											}
										>
											{bank.active
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

			{/* Rental Rates */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<DollarSign className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Rental Rates</CardTitle>
							<CardDescription>
								Configure pricing for different rental periods.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-3 gap-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label>Daily Rental</Label>
								<Switch
									checked={config.dailyRentalEnabled}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											dailyRentalEnabled: c,
										})
									}
								/>
							</div>
							{config.dailyRentalEnabled && (
								<div className="space-y-2">
									<Label>Daily Rate ($)</Label>
									<Input
										type="number"
										step="0.01"
										value={config.dailyRate}
										onChange={(e) =>
											setConfig({
												...config,
												dailyRate:
													parseFloat(
														e.target.value
													) || 0,
											})
										}
									/>
								</div>
							)}
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label>Semester Rental</Label>
								<Switch
									checked={config.semesterRentalEnabled}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											semesterRentalEnabled: c,
										})
									}
								/>
							</div>
							{config.semesterRentalEnabled && (
								<div className="space-y-2">
									<Label>Semester Rate ($)</Label>
									<Input
										type="number"
										step="0.01"
										value={config.semesterRate}
										onChange={(e) =>
											setConfig({
												...config,
												semesterRate:
													parseFloat(
														e.target.value
													) || 0,
											})
										}
									/>
								</div>
							)}
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label>Annual Rental</Label>
								<Switch
									checked={config.annualRentalEnabled}
									onCheckedChange={(c) =>
										setConfig({
											...config,
											annualRentalEnabled: c,
										})
									}
								/>
							</div>
							{config.annualRentalEnabled && (
								<div className="space-y-2">
									<Label>Annual Rate ($)</Label>
									<Input
										type="number"
										step="0.01"
										value={config.annualRate}
										onChange={(e) =>
											setConfig({
												...config,
												annualRate:
													parseFloat(
														e.target.value
													) || 0,
											})
										}
									/>
								</div>
							)}
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Deposit</Label>
							<p className="text-xs text-muted-foreground">
								Collect refundable deposit on rental.
							</p>
						</div>
						<Switch
							checked={config.requireDeposit}
							onCheckedChange={(c) =>
								setConfig({ ...config, requireDeposit: c })
							}
						/>
					</div>

					{config.requireDeposit && (
						<div className="space-y-2">
							<Label>Deposit Amount ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.depositAmount}
								onChange={(e) =>
									setConfig({
										...config,
										depositAmount:
											parseFloat(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Cleanout Policy */}
			<Card>
				<CardHeader>
					<CardTitle>Cleanout Policy</CardTitle>
					<CardDescription>
						Configure abandoned locker handling.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Cleanout After (days past expiration)</Label>
						<Input
							type="number"
							value={config.cleanoutAfterDays}
							onChange={(e) =>
								setConfig({
									...config,
									cleanoutAfterDays:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Send Cleanout Warning</Label>
							<p className="text-xs text-muted-foreground">
								Email member before cleanout.
							</p>
						</div>
						<Switch
							checked={config.sendCleanoutWarning}
							onCheckedChange={(c) =>
								setConfig({ ...config, sendCleanoutWarning: c })
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Charge Cleanout Fee</Label>
							<p className="text-xs text-muted-foreground">
								Bill member for staff time to clean out.
							</p>
						</div>
						<Switch
							checked={config.chargeCleanoutFee}
							onCheckedChange={(c) =>
								setConfig({ ...config, chargeCleanoutFee: c })
							}
						/>
					</div>

					{config.chargeCleanoutFee && (
						<div className="space-y-2">
							<Label>Cleanout Fee ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.cleanoutFee}
								onChange={(e) =>
									setConfig({
										...config,
										cleanoutFee:
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
