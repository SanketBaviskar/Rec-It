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
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Save,
	RotateCcw,
	CreditCard,
	Receipt,
	DollarSign,
	Printer,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Tax Settings
	taxEnabled: true,
	taxRate: 8.25,
	taxOnMemberships: false,
	taxOnFood: true,
	taxOnMerchandise: true,
	taxOnServices: false,

	// Payment Methods
	acceptCash: true,
	acceptCard: true,
	acceptStudentAccount: true,
	acceptPayrollDeduction: false,

	// Receipt Settings
	printReceiptByDefault: true,
	emailReceiptEnabled: true,
	receiptHeader: "University Recreation Center",
	receiptFooter: "Thank you for your visit!",

	// Refund Policy
	allowRefunds: true,
	refundWindowDays: 30,
	requireManagerApproval: true,
	approvalThreshold: 50.0,

	// Daily Operations
	requireCloseout: true,
	closeoutReminderTime: "21:00",
	varianceAlertThreshold: 5.0,

	// Proration
	prorationEnabled: true,
	prorationMethod: "daily",
};

export default function POSConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving POS config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Point of Sale configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "POS settings restored to defaults.",
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

			{/* Tax Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<DollarSign className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Tax Configuration</CardTitle>
							<CardDescription>
								Configure sales tax rules for transactions.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Sales Tax</Label>
							<p className="text-xs text-muted-foreground">
								Apply tax to applicable transactions.
							</p>
						</div>
						<Switch
							checked={config.taxEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, taxEnabled: c })
							}
						/>
					</div>

					{config.taxEnabled && (
						<>
							<div className="space-y-2">
								<Label htmlFor="tax-rate">Tax Rate (%)</Label>
								<Input
									id="tax-rate"
									type="number"
									step="0.01"
									value={config.taxRate}
									onChange={(e) =>
										setConfig({
											...config,
											taxRate:
												parseFloat(e.target.value) || 0,
										})
									}
									className="w-32"
								/>
							</div>

							<Separator />

							<div className="space-y-3">
								<Label className="text-sm font-medium">
									Apply Tax To Categories:
								</Label>
								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center justify-between">
										<Label className="font-normal">
											Memberships
										</Label>
										<Switch
											checked={config.taxOnMemberships}
											onCheckedChange={(c) =>
												setConfig({
													...config,
													taxOnMemberships: c,
												})
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label className="font-normal">
											Food & Beverages
										</Label>
										<Switch
											checked={config.taxOnFood}
											onCheckedChange={(c) =>
												setConfig({
													...config,
													taxOnFood: c,
												})
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label className="font-normal">
											Merchandise
										</Label>
										<Switch
											checked={config.taxOnMerchandise}
											onCheckedChange={(c) =>
												setConfig({
													...config,
													taxOnMerchandise: c,
												})
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Label className="font-normal">
											Services
										</Label>
										<Switch
											checked={config.taxOnServices}
											onCheckedChange={(c) =>
												setConfig({
													...config,
													taxOnServices: c,
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

			{/* Payment Methods */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<CreditCard className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Payment Methods</CardTitle>
							<CardDescription>
								Configure accepted payment types.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Cash</Label>
								<p className="text-xs text-muted-foreground">
									Accept cash payments
								</p>
							</div>
							<Switch
								checked={config.acceptCash}
								onCheckedChange={(c) =>
									setConfig({ ...config, acceptCash: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Credit/Debit Card</Label>
								<p className="text-xs text-muted-foreground">
									Accept card payments
								</p>
							</div>
							<Switch
								checked={config.acceptCard}
								onCheckedChange={(c) =>
									setConfig({ ...config, acceptCard: c })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Student Account</Label>
								<p className="text-xs text-muted-foreground">
									Charge to bursar account
								</p>
							</div>
							<Switch
								checked={config.acceptStudentAccount}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										acceptStudentAccount: c,
									})
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Payroll Deduction</Label>
								<p className="text-xs text-muted-foreground">
									Faculty/staff payroll
								</p>
							</div>
							<Switch
								checked={config.acceptPayrollDeduction}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										acceptPayrollDeduction: c,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Receipt Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Receipt className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Receipt Configuration</CardTitle>
							<CardDescription>
								Customize receipt appearance and delivery.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Print Receipt by Default</Label>
								<p className="text-xs text-muted-foreground">
									Auto-print after transactions
								</p>
							</div>
							<Switch
								checked={config.printReceiptByDefault}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										printReceiptByDefault: c,
									})
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Email Receipt Option</Label>
								<p className="text-xs text-muted-foreground">
									Offer email receipt to customers
								</p>
							</div>
							<Switch
								checked={config.emailReceiptEnabled}
								onCheckedChange={(c) =>
									setConfig({
										...config,
										emailReceiptEnabled: c,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label htmlFor="receipt-header">
							Receipt Header Text
						</Label>
						<Input
							id="receipt-header"
							value={config.receiptHeader}
							onChange={(e) =>
								setConfig({
									...config,
									receiptHeader: e.target.value,
								})
							}
							placeholder="Organization name"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="receipt-footer">
							Receipt Footer Text
						</Label>
						<Textarea
							id="receipt-footer"
							value={config.receiptFooter}
							onChange={(e) =>
								setConfig({
									...config,
									receiptFooter: e.target.value,
								})
							}
							placeholder="Thank you message, return policy, etc."
							rows={2}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Refund Policy */}
			<Card>
				<CardHeader>
					<CardTitle>Refund Policy</CardTitle>
					<CardDescription>
						Configure refund rules and approval requirements.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Refunds</Label>
							<p className="text-xs text-muted-foreground">
								Enable refund functionality in POS.
							</p>
						</div>
						<Switch
							checked={config.allowRefunds}
							onCheckedChange={(c) =>
								setConfig({ ...config, allowRefunds: c })
							}
						/>
					</div>

					{config.allowRefunds && (
						<>
							<Separator />
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="refund-window">
										Refund Window (days)
									</Label>
									<Input
										id="refund-window"
										type="number"
										value={config.refundWindowDays}
										onChange={(e) =>
											setConfig({
												...config,
												refundWindowDays:
													parseInt(e.target.value) ||
													0,
											})
										}
										className="w-32"
									/>
									<p className="text-xs text-muted-foreground">
										Days after purchase to allow refund.
									</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="approval-threshold">
										Manager Approval Above ($)
									</Label>
									<Input
										id="approval-threshold"
										type="number"
										step="0.01"
										value={config.approvalThreshold}
										onChange={(e) =>
											setConfig({
												...config,
												approvalThreshold:
													parseFloat(
														e.target.value
													) || 0,
											})
										}
										className="w-32"
										disabled={
											!config.requireManagerApproval
										}
									/>
									<div className="flex items-center gap-2">
										<Switch
											checked={
												config.requireManagerApproval
											}
											onCheckedChange={(c) =>
												setConfig({
													...config,
													requireManagerApproval: c,
												})
											}
										/>
										<Label className="font-normal text-xs">
											Require manager approval
										</Label>
									</div>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Proration */}
			<Card>
				<CardHeader>
					<CardTitle>Membership Proration</CardTitle>
					<CardDescription>
						Configure how mid-cycle purchases are calculated.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Proration</Label>
							<p className="text-xs text-muted-foreground">
								Calculate partial charges for mid-period
								signups.
							</p>
						</div>
						<Switch
							checked={config.prorationEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, prorationEnabled: c })
							}
						/>
					</div>

					{config.prorationEnabled && (
						<div className="space-y-2">
							<Label>Proration Method</Label>
							<Select
								value={config.prorationMethod}
								onValueChange={(v) =>
									setConfig({ ...config, prorationMethod: v })
								}
							>
								<SelectTrigger className="w-48">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="daily">
										Daily (Exact Days)
									</SelectItem>
									<SelectItem value="weekly">
										Weekly (Round to Week)
									</SelectItem>
									<SelectItem value="halfMonth">
										Half-Month
									</SelectItem>
									<SelectItem value="none">
										No Proration (Full Price)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
