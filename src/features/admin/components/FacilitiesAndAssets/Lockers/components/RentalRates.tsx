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
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";
import { useLockerConfig } from "../useLockerConfig";

export default function RentalRates() {
	const { config, updateConfig } = useLockerConfig();

	return (
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
					{/* Daily Rental */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Daily Rental</Label>
							<Switch
								checked={config.dailyRentalEnabled}
								onCheckedChange={(c) =>
									updateConfig({ dailyRentalEnabled: c })
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
										updateConfig({
											dailyRate:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						)}
					</div>

					{/* Semester Rental */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Semester Rental</Label>
							<Switch
								checked={config.semesterRentalEnabled}
								onCheckedChange={(c) =>
									updateConfig({ semesterRentalEnabled: c })
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
										updateConfig({
											semesterRate:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						)}
					</div>

					{/* Annual Rental */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Annual Rental</Label>
							<Switch
								checked={config.annualRentalEnabled}
								onCheckedChange={(c) =>
									updateConfig({ annualRentalEnabled: c })
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
										updateConfig({
											annualRate:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						)}
					</div>
				</div>

				<Separator />

				{/* Deposit Settings */}
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
							updateConfig({ requireDeposit: c })
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
								updateConfig({
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
	);
}
