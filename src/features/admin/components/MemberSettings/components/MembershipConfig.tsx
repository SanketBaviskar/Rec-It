import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

export default function MembershipConfig() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-medium">Membership Tiers</h3>
					<p className="text-sm text-muted-foreground">
						Define the products and plans available for purchase.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" /> Add New Plan
				</Button>
			</div>

			<div className="grid gap-4">
				{/* Example Plan Card */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="space-y-1">
							<CardTitle className="text-base">
								Gold Membership
							</CardTitle>
							<CardDescription>
								Full facility access, billed annually.
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-bold text-lg">$499.00</span>
							<span className="text-muted-foreground text-sm">
								/ yr
							</span>
						</div>
					</CardHeader>
					<CardContent className="pt-4 grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label>Billing Frequency</Label>
								<Input
									value="Annual"
									readOnly
									className="bg-muted"
								/>
							</div>
							<div className="grid gap-2">
								<Label>Family Plan?</Label>
								<div className="flex items-center space-x-2 pt-2">
									<Switch />
									<span className="text-sm text-muted-foreground">
										Allow dependents
									</span>
								</div>
							</div>
						</div>
						<div className="flex justify-end pt-2">
							<Button
								variant="ghost"
								size="sm"
								className="text-destructive hover:text-destructive hover:bg-destructive/10"
							>
								<Trash2 className="mr-2 h-4 w-4" /> Delete Plan
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Example Plan Card 2 */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="space-y-1">
							<CardTitle className="text-base">
								Student Monthly
							</CardTitle>
							<CardDescription>
								Valid with student ID, billed monthly.
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-bold text-lg">$29.99</span>
							<span className="text-muted-foreground text-sm">
								/ mo
							</span>
						</div>
					</CardHeader>
					<CardContent className="pt-4 grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label>Billing Frequency</Label>
								<Input
									value="Monthly"
									readOnly
									className="bg-muted"
								/>
							</div>
							<div className="grid gap-2">
								<Label>Family Plan?</Label>
								<div className="flex items-center space-x-2 pt-2">
									<Switch />
									<span className="text-sm text-muted-foreground">
										Allow dependents
									</span>
								</div>
							</div>
						</div>
						<div className="flex justify-end pt-2">
							<Button
								variant="ghost"
								size="sm"
								className="text-destructive hover:text-destructive hover:bg-destructive/10"
							>
								<Trash2 className="mr-2 h-4 w-4" /> Delete Plan
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
