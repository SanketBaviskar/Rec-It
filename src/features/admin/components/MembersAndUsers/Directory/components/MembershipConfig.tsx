import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Plus,
	Edit,
	Trash2,
	Archive,
	ArchiveRestore,
	CreditCard,
	DollarSign,
	Users,
} from "lucide-react";

// Plan Type Definition
interface MembershipPlan {
	id: number;
	name: string;
	description: string;
	price: number;
	period: "day" | "mo" | "yr" | "semester";
	billingFrequency: "One-time" | "Monthly" | "Annual" | "Semester";
	familyPlan: boolean;
	status: "Active" | "Archived";
}

// Mock Data
const INITIAL_PLANS: MembershipPlan[] = [
	{
		id: 1,
		name: "Gold Membership",
		description:
			"Full facility access, billed annually. Includes all amenities.",
		price: 499.0,
		period: "yr",
		billingFrequency: "Annual",
		familyPlan: true,
		status: "Active",
	},
	{
		id: 2,
		name: "Student Monthly",
		description:
			"Valid with student ID, billed monthly. Great for college students.",
		price: 29.99,
		period: "mo",
		billingFrequency: "Monthly",
		familyPlan: false,
		status: "Active",
	},
	{
		id: 3,
		name: "Day Pass",
		description: "Single day access to all areas. Perfect for visitors.",
		price: 15.0,
		period: "day",
		billingFrequency: "One-time",
		familyPlan: false,
		status: "Active",
	},
	{
		id: 4,
		name: "Summer Special",
		description: "Limited time offer for summer months only.",
		price: 199.0,
		period: "mo",
		billingFrequency: "One-time",
		familyPlan: false,
		status: "Archived",
	},
];

export default function MembershipConfig() {
	const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_PLANS);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: 0,
		period: "mo" as "day" | "mo" | "yr" | "semester",
		billingFrequency: "Monthly" as
			| "One-time"
			| "Monthly"
			| "Annual"
			| "Semester",
		familyPlan: false,
	});

	// Statistics
	const stats = useMemo(() => {
		const activePlans = plans.filter((p) => p.status === "Active");
		const totalPlans = plans.length;
		const avgPrice =
			activePlans.length > 0
				? activePlans.reduce((sum, p) => sum + p.price, 0) /
				  activePlans.length
				: 0;
		return {
			totalPlans,
			activePlans: activePlans.length,
			avgPrice: avgPrice.toFixed(2),
		};
	}, [plans]);

	const handleOpenDialog = (plan?: MembershipPlan) => {
		if (plan) {
			setEditingPlan(plan);
			setFormData({
				name: plan.name,
				description: plan.description,
				price: plan.price,
				period: plan.period,
				billingFrequency: plan.billingFrequency,
				familyPlan: plan.familyPlan,
			});
		} else {
			setEditingPlan(null);
			setFormData({
				name: "",
				description: "",
				price: 0,
				period: "mo",
				billingFrequency: "Monthly",
				familyPlan: false,
			});
		}
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		if (!formData.name) return;

		const planData: MembershipPlan = {
			id: editingPlan?.id || Date.now(),
			name: formData.name,
			description: formData.description,
			price: formData.price,
			period: formData.period,
			billingFrequency: formData.billingFrequency,
			familyPlan: formData.familyPlan,
			status: editingPlan?.status || "Active",
		};

		if (editingPlan) {
			setPlans(
				plans.map((p) => (p.id === editingPlan.id ? planData : p))
			);
		} else {
			setPlans([...plans, planData]);
		}

		setIsDialogOpen(false);
		setEditingPlan(null);
	};

	const handleDelete = (id: number) => {
		setPlans(plans.filter((p) => p.id !== id));
	};

	const handleToggleArchive = (id: number) => {
		setPlans(
			plans.map((p) =>
				p.id === id
					? {
							...p,
							status:
								p.status === "Active" ? "Archived" : "Active",
					  }
					: p
			)
		);
	};

	return (
		<div className="space-y-6">
			{/* Statistics Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-primary/10">
							<CreditCard className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Plans
							</p>
							<p className="text-2xl font-bold">
								{stats.totalPlans}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-green-500/10">
							<Users className="h-5 w-5 text-green-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Active Plans
							</p>
							<p className="text-2xl font-bold">
								{stats.activePlans}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-blue-500/10">
							<DollarSign className="h-5 w-5 text-blue-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Avg. Price
							</p>
							<p className="text-2xl font-bold">
								${stats.avgPrice}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Action Bar */}
			<div className="flex items-center justify-end">
				<Button onClick={() => handleOpenDialog()}>
					<Plus className="mr-2 h-4 w-4" /> Add New Plan
				</Button>
			</div>

			{/* Plans Table */}
			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead>Plan Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Billing Cycle</TableHead>
							<TableHead>Family Plan</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[120px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{plans.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="h-32 text-center"
								>
									<div className="text-muted-foreground">
										<CreditCard className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No membership plans defined.</p>
										<p className="text-sm">
											Click "Add New Plan" to create one.
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							plans.map((plan) => (
								<TableRow
									key={plan.id}
									className={
										plan.status === "Archived"
											? "opacity-60"
											: ""
									}
								>
									<TableCell>
										<div>
											<div className="font-medium">
												{plan.name}
											</div>
											<div className="text-xs text-muted-foreground max-w-[250px] truncate">
												{plan.description}
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium">
										${plan.price.toFixed(2)} / {plan.period}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{plan.billingFrequency}
										</Badge>
									</TableCell>
									<TableCell>
										{plan.familyPlan ? (
											<Badge variant="secondary">
												Enabled
											</Badge>
										) : (
											<span className="text-muted-foreground text-sm">
												—
											</span>
										)}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												plan.status === "Active"
													? "default"
													: "secondary"
											}
										>
											{plan.status}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleOpenDialog(plan)
												}
												title="Edit"
											>
												<Edit className="w-4 h-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleToggleArchive(plan.id)
												}
												title={
													plan.status === "Active"
														? "Archive"
														: "Restore"
												}
											>
												{plan.status === "Active" ? (
													<Archive className="w-4 h-4" />
												) : (
													<ArchiveRestore className="w-4 h-4" />
												)}
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="text-destructive"
														title="Delete"
													>
														<Trash2 className="w-4 h-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete Plan?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This will
															permanently delete "
															{plan.name}".
															Members on this plan
															will need to be
															migrated.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={() =>
																handleDelete(
																	plan.id
																)
															}
															className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>
							{editingPlan
								? "Edit Membership Plan"
								: "Create Membership Plan"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 pt-4">
						<div className="space-y-2">
							<Label htmlFor="plan-name">Plan Name</Label>
							<Input
								id="plan-name"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								placeholder="e.g., Premium Annual"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="plan-desc">Description</Label>
							<Textarea
								id="plan-desc"
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								placeholder="Describe the plan benefits..."
								className="min-h-[80px]"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="plan-price">Price ($)</Label>
								<Input
									id="plan-price"
									type="number"
									step="0.01"
									value={formData.price}
									onChange={(e) =>
										setFormData({
											...formData,
											price:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="plan-period">Period</Label>
								<Select
									value={formData.period}
									onValueChange={(v) =>
										setFormData({
											...formData,
											period: v as
												| "day"
												| "mo"
												| "yr"
												| "semester",
										})
									}
								>
									<SelectTrigger id="plan-period">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="day">Day</SelectItem>
										<SelectItem value="mo">
											Month
										</SelectItem>
										<SelectItem value="yr">Year</SelectItem>
										<SelectItem value="semester">
											Semester
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="billing-freq">
								Billing Frequency
							</Label>
							<Select
								value={formData.billingFrequency}
								onValueChange={(v) =>
									setFormData({
										...formData,
										billingFrequency: v as
											| "One-time"
											| "Monthly"
											| "Annual"
											| "Semester",
									})
								}
							>
								<SelectTrigger id="billing-freq">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="One-time">
										One-time
									</SelectItem>
									<SelectItem value="Monthly">
										Monthly
									</SelectItem>
									<SelectItem value="Annual">
										Annual
									</SelectItem>
									<SelectItem value="Semester">
										Semester
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<Label htmlFor="family-plan">Family Plan</Label>
								<p className="text-sm text-muted-foreground">
									Allow dependents to be linked to this
									membership.
								</p>
							</div>
							<Switch
								id="family-plan"
								checked={formData.familyPlan}
								onCheckedChange={(c) =>
									setFormData({ ...formData, familyPlan: c })
								}
							/>
						</div>
						<div className="flex justify-end gap-2 pt-4">
							<Button
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleSave}>
								{editingPlan ? "Save Changes" : "Create Plan"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
