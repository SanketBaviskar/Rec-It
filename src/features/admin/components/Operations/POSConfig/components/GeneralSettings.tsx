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
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreditCard, Receipt, DollarSign } from "lucide-react";
import { usePOSConfig, POSGeneralConfig } from "../usePOSConfig";

export default function GeneralSettings() {
	const { config, updateGeneralConfig } = usePOSConfig();

	return (
		<div className="space-y-6">
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
								updateGeneralConfig({
									taxEnabled: c,
								})
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
										updateGeneralConfig({
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
												updateGeneralConfig({
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
												updateGeneralConfig({
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
												updateGeneralConfig({
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
												updateGeneralConfig({
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
									updateGeneralConfig({
										acceptCash: c,
									})
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
									updateGeneralConfig({
										acceptCard: c,
									})
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
									updateGeneralConfig({
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
									updateGeneralConfig({
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
									updateGeneralConfig({
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
									updateGeneralConfig({
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
								updateGeneralConfig({
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
								updateGeneralConfig({
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
								updateGeneralConfig({
									allowRefunds: c,
								})
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
											updateGeneralConfig({
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
											updateGeneralConfig({
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
												updateGeneralConfig({
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
								updateGeneralConfig({
									prorationEnabled: c,
								})
							}
						/>
					</div>

					{config.prorationEnabled && (
						<div className="space-y-2">
							<Label>Proration Method</Label>
							<Select
								value={config.prorationMethod}
								onValueChange={(
									v: POSGeneralConfig["prorationMethod"]
								) =>
									updateGeneralConfig({
										prorationMethod: v,
									})
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
