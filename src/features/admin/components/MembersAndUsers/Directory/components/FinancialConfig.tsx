import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, RotateCcw, CreditCard, Building2, Banknote } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Billing Logic
	prorateFirstMonth: true,
	retryFailedPayments: true,
	retryIntervalDays: 3,

	// Fees & Taxes
	salesTaxRate: 8.25,
	serviceTaxRate: 0.0,
	latePaymentFee: 15.0,
	latePaymentDays: 5,

	// Grace Period
	gracePeriodDays: 7,

	// Cancellation
	cancellationFee: 25.0,
	refundPercentage: 50,

	// Hold / Freeze
	allowFreeze: true,
	maxFreezeDuration: 3,
	freezeFee: 10.0,

	// Payment Methods
	acceptCredit: true,
	acceptACH: true,
	acceptCash: true,
};

export default function FinancialConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving financial config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Financial configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Financial configuration restored to defaults.",
		});
	};

	return (
		<div className="space-y-6">
			{/* Action Buttons */}
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={handleReset}>
					<RotateCcw className="w-4 h-4 mr-2" />
					Reset
				</Button>
				<Button onClick={handleSave} disabled={isSaving}>
					<Save className="w-4 h-4 mr-2" />
					{isSaving ? "Saving..." : "Save Settings"}
				</Button>
			</div>

			{/* Payment Methods Card */}
			<Card>
				<CardHeader>
					<CardTitle>Accepted Payment Methods</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-blue-500/10">
								<CreditCard className="h-4 w-4 text-blue-500" />
							</div>
							<div className="space-y-0.5">
								<Label>Credit/Debit Cards</Label>
								<p className="text-xs text-muted-foreground">
									Visa, Mastercard, Amex, Discover
								</p>
							</div>
						</div>
						<Switch
							checked={config.acceptCredit}
							onCheckedChange={(c) =>
								setConfig({ ...config, acceptCredit: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-green-500/10">
								<Building2 className="h-4 w-4 text-green-500" />
							</div>
							<div className="space-y-0.5">
								<Label>ACH / Bank Transfer</Label>
								<p className="text-xs text-muted-foreground">
									Direct debit from bank account
								</p>
							</div>
						</div>
						<Switch
							checked={config.acceptACH}
							onCheckedChange={(c) =>
								setConfig({ ...config, acceptACH: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-yellow-500/10">
								<Banknote className="h-4 w-4 text-yellow-600" />
							</div>
							<div className="space-y-0.5">
								<Label>Cash (In-Person)</Label>
								<p className="text-xs text-muted-foreground">
									Accept cash at front desk
								</p>
							</div>
						</div>
						<Switch
							checked={config.acceptCash}
							onCheckedChange={(c) =>
								setConfig({ ...config, acceptCash: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Billing Logic Card */}
			<Card>
				<CardHeader>
					<CardTitle>Billing Logic</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Prorate First Month?</Label>
							<p className="text-xs text-muted-foreground">
								Charge partial amount if joining mid-cycle.
							</p>
						</div>
						<Switch
							checked={config.prorateFirstMonth}
							onCheckedChange={(c) =>
								setConfig({ ...config, prorateFirstMonth: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Retry Failed Payments</Label>
							<p className="text-xs text-muted-foreground">
								Automatically retry declined cards every{" "}
								{config.retryIntervalDays} days.
							</p>
						</div>
						<Switch
							checked={config.retryFailedPayments}
							onCheckedChange={(c) =>
								setConfig({ ...config, retryFailedPayments: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Grace Period Before Suspension</Label>
							<p className="text-xs text-muted-foreground">
								Days after failed payment before blocking access
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Input
								type="number"
								className="w-20"
								value={config.gracePeriodDays}
								onChange={(e) =>
									setConfig({
										...config,
										gracePeriodDays:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<span className="text-sm text-muted-foreground">
								days
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Fees & Taxes Card */}
			<Card>
				<CardHeader>
					<CardTitle>Fees & Taxes</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Sales Tax Rate (%)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.salesTaxRate}
								onChange={(e) =>
									setConfig({
										...config,
										salesTaxRate:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Service Tax Rate (%)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.serviceTaxRate}
								onChange={(e) =>
									setConfig({
										...config,
										serviceTaxRate:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Late Payment Fee</Label>
							<p className="text-xs text-muted-foreground">
								Applied {config.latePaymentDays} days after
								failed payment.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">$</span>
							<Input
								type="number"
								step="0.01"
								value={config.latePaymentFee}
								onChange={(e) =>
									setConfig({
										...config,
										latePaymentFee:
											parseFloat(e.target.value) || 0,
									})
								}
								className="w-24"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Cancellation Policy Card */}
			<Card>
				<CardHeader>
					<CardTitle>Cancellation Policy</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Cancellation Fee ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.cancellationFee}
								onChange={(e) =>
									setConfig({
										...config,
										cancellationFee:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								One-time fee charged on cancellation
							</p>
						</div>
						<div className="space-y-2">
							<Label>Refund Percentage (%)</Label>
							<Input
								type="number"
								value={config.refundPercentage}
								onChange={(e) =>
									setConfig({
										...config,
										refundPercentage:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								Percentage of remaining term refunded
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Hold / Freeze Policy Card */}
			<Card>
				<CardHeader>
					<CardTitle>Hold / Freeze Policy</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Members to Freeze Membership</Label>
							<p className="text-xs text-muted-foreground">
								Temporarily pause billing and access
							</p>
						</div>
						<Switch
							checked={config.allowFreeze}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowFreeze: c })
							}
						/>
					</div>
					{config.allowFreeze && (
						<>
							<Separator />
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Max Freeze Duration (Months)</Label>
									<Input
										type="number"
										value={config.maxFreezeDuration}
										onChange={(e) =>
											setConfig({
												...config,
												maxFreezeDuration:
													parseInt(e.target.value) ||
													0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Freeze Fee (One-time)</Label>
									<div className="flex items-center gap-2">
										<span className="text-sm text-muted-foreground">
											$
										</span>
										<Input
											type="number"
											step="0.01"
											value={config.freezeFee}
											onChange={(e) =>
												setConfig({
													...config,
													freezeFee:
														parseFloat(
															e.target.value
														) || 0,
												})
											}
										/>
									</div>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
