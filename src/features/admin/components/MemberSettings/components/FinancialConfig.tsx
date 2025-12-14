import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function FinancialConfig() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">
					Billing & Financial Rules
				</h3>
				<p className="text-sm text-muted-foreground">
					Manage payments, taxes, and fees.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Billing Logic</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<Label>Prorate First Month?</Label>
							<p className="text-sm text-muted-foreground">
								Charge partial amount if joining mid-cycle.
							</p>
						</div>
						<Switch defaultChecked />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<Label>Retry Failed Payments</Label>
							<p className="text-sm text-muted-foreground">
								Automatically retry declined cards every 3 days.
							</p>
						</div>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Fees & Taxes</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Sales Tax Rate (%)</Label>
							<Input type="number" defaultValue="8.25" />
						</div>
						<div className="space-y-2">
							<Label>Service Tax Rate (%)</Label>
							<Input type="number" defaultValue="0.00" />
						</div>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<Label>Late Payment Fee</Label>
							<p className="text-sm text-muted-foreground">
								Applied 5 days after failed payment.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">$</span>
							<Input
								type="number"
								defaultValue="15.00"
								className="w-24"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Hold / Freeze Policy</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Allow Members to Freeze Membership</Label>
						<Switch defaultChecked />
					</div>
					<div className="grid grid-cols-2 gap-4 pt-2">
						<div className="space-y-2">
							<Label>Max Freeze Duration (Months)</Label>
							<Input type="number" defaultValue="3" />
						</div>
						<div className="space-y-2">
							<Label>Freeze Fee (One-time)</Label>
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									$
								</span>
								<Input type="number" defaultValue="10.00" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
