import { useState, useMemo } from "react";
import {
	Edit,
	Trash2,
	Plus,
	Archive,
	ArchiveRestore,
	CreditCard,
	Users,
	DollarSign,
	Loader2,
	RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
	DialogTrigger,
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
import { Card, CardContent } from "@/components/ui/card";
import AddMembershipTypeForm, {
	MembershipFormValues,
} from "./AddMembershipTypeForm";
import PassesManager from "./PassesManager";
import HouseholdManager from "./HouseholdManager";
import MembershipLayout from "./Layout/MembershipLayout";
import { useMemberships } from "./hooks/useMemberships";
import { Membership } from "@/services/Api/Membership/membershipApi";

interface MembershipSettingsProps {
	onComplete?: () => void;
}

const MembershipSettings = ({ onComplete }: MembershipSettingsProps = {}) => {
	const [activeSection, setActiveSection] = useState("plans");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingMembership, setEditingMembership] =
		useState<Membership | null>(null);

	// Use the API hook instead of static state
	const {
		memberships,
		isLoading,
		error,
		refetch,
		addMembership,
		editMembership,
		removeMembership,
	} = useMemberships();

	// Calculate statistics
	const stats = useMemo(() => {
		const activePlans = memberships.filter((m) => m.status === "Active");
		const monthlyRevenue = activePlans.reduce((sum, m) => {
			const price = m.price || 0;
			if (m.duration === "Monthly") return sum + price;
			if (m.duration === "Annual") return sum + price / 12;
			if (m.duration === "Semester") return sum + price / 4;
			return sum;
		}, 0);

		return {
			totalPlans: memberships.length,
			activePlans: activePlans.length,
			monthlyRevenue: monthlyRevenue.toFixed(2),
		};
	}, [memberships]);

	const handleFormSubmit = async (values: MembershipFormValues) => {
		const membershipData = {
			name: values.name,
			description: values.description,
			price: values.price,
			duration: values.duration,
			status: values.status,
			accessLevel: values.accessLevel,
			isFamilyPlan: values.isFamilyPlan,
			maxYouthAge: values.maxYouthAge,
			// Billing & Renewal
			billingType: values.billingType,
			isAutoRenew: values.isAutoRenew,
			renewalReminderDays: values.renewalReminderDays,
			gracePeriodDays: values.gracePeriodDays,
			prorationEnabled: values.prorationEnabled,
			// Rules & Security
			requiresWaiver: values.requiresWaiver,
			allowGuestPasses: values.allowGuestPasses,
			maxGuestsPerVisit: values.maxGuestsPerVisit,
			requiresPhotoId: values.requiresPhotoId,
			allowsPlusOne: values.allowsPlusOne,
			// Access Hours
			hasRestrictedHours: values.hasRestrictedHours,
			allowedDays: values.allowedDays,
			accessStartTime: values.accessStartTime,
			accessEndTime: values.accessEndTime,
			// Kiosk Settings
			kioskCheckInEnabled: values.kioskCheckInEnabled,
			kioskSelfRegistration: values.kioskSelfRegistration,
			kioskDisplayMessage: values.kioskDisplayMessage,
			// Access Zones
			accessAllZones: values.accessAllZones,
		};

		if (editingMembership) {
			await editMembership(editingMembership.id, membershipData);
		} else {
			await addMembership(membershipData);
		}

		setIsDialogOpen(false);
		setEditingMembership(null);
		if (onComplete) onComplete();
	};

	const handleEdit = (membership: Membership) => {
		setEditingMembership(membership);
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: number) => {
		await removeMembership(id);
		if (onComplete) onComplete();
	};

	const handleToggleArchive = async (membership: Membership) => {
		const newStatus =
			membership.status === "Active" ? "Archived" : "Active";
		await editMembership(membership.id, { status: newStatus });
	};

	// Convert Membership to form values for editing
	const getFormInitialData = (
		membership: Membership | null
	): Partial<MembershipFormValues> | undefined => {
		if (!membership) return undefined;
		return {
			name: membership.name,
			description: membership.description || "",
			duration: membership.duration,
			price: membership.price || 0,
			status: membership.status,
			accessLevel: membership.accessLevel,
			isFamilyPlan: membership.isFamilyPlan,
			maxYouthAge: membership.maxYouthAge,
			// Billing & Renewal
			billingType: membership.billingType,
			isAutoRenew: membership.isAutoRenew,
			renewalReminderDays: membership.renewalReminderDays,
			gracePeriodDays: membership.gracePeriodDays,
			prorationEnabled: membership.prorationEnabled,
			// Rules & Security
			requiresWaiver: membership.requiresWaiver,
			allowGuestPasses: membership.allowGuestPasses,
			maxGuestsPerVisit: membership.maxGuestsPerVisit,
			requiresPhotoId: membership.requiresPhotoId,
			allowsPlusOne: membership.allowsPlusOne,
			// Access Hours
			hasRestrictedHours: membership.hasRestrictedHours,
			allowedDays: membership.allowedDays,
			accessStartTime: membership.accessStartTime,
			accessEndTime: membership.accessEndTime,
			// Kiosk Settings
			kioskCheckInEnabled: membership.kioskCheckInEnabled,
			kioskSelfRegistration: membership.kioskSelfRegistration,
			kioskDisplayMessage: membership.kioskDisplayMessage,
			// Access Zones
			accessAllZones: membership.accessAllZones,
		};
	};

	const renderContent = () => {
		switch (activeSection) {
			case "plans":
				return (
					<div className="space-y-6">
						{/* Header */}
						<div className="flex justify-between items-center">
							<div>
								<h2 className="text-2xl font-bold tracking-tight">
									Memberships
								</h2>
								<p className="text-muted-foreground">
									Manage membership tiers, billing cycles, and
									pricing.
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="icon"
									onClick={() => refetch()}
									disabled={isLoading}
								>
									<RefreshCw
										className={`w-4 h-4 ${
											isLoading ? "animate-spin" : ""
										}`}
									/>
								</Button>
								<Dialog
									open={isDialogOpen}
									onOpenChange={(open) => {
										setIsDialogOpen(open);
										if (!open) setEditingMembership(null);
									}}
								>
									<DialogTrigger asChild>
										<Button>
											<Plus className="w-4 h-4 mr-2" />
											Add Plan
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
										<DialogHeader>
											<DialogTitle className="text-lg font-semibold">
												{editingMembership
													? "Edit Membership Plan"
													: "Create New Membership Plan"}
											</DialogTitle>
										</DialogHeader>
										<AddMembershipTypeForm
											onSubmit={handleFormSubmit}
											onCancel={() => {
												setIsDialogOpen(false);
												setEditingMembership(null);
											}}
											initialData={getFormInitialData(
												editingMembership
											)}
										/>
									</DialogContent>
								</Dialog>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-destructive/10 text-destructive p-4 rounded-lg">
								{error}
							</div>
						)}

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
											Est. Monthly Revenue
										</p>
										<p className="text-2xl font-bold">
											${stats.monthlyRevenue}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Memberships Table */}
						<div className="border rounded-lg overflow-hidden bg-card">
							<Table>
								<TableHeader className="bg-muted/50">
									<TableRow>
										<TableHead className="w-[250px]">
											Plan
										</TableHead>
										<TableHead>Duration</TableHead>
										<TableHead>Access</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-[120px]">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isLoading ? (
										<TableRow>
											<TableCell
												colSpan={6}
												className="h-32 text-center"
											>
												<Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
											</TableCell>
										</TableRow>
									) : memberships.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={6}
												className="h-32 text-center"
											>
												<div className="text-muted-foreground">
													<CreditCard className="mx-auto h-8 w-8 mb-2 opacity-50" />
													<p>
														No membership plans yet.
													</p>
													<p className="text-sm">
														Click "Add Plan" to
														create your first.
													</p>
												</div>
											</TableCell>
										</TableRow>
									) : (
										memberships.map((membership) => (
											<TableRow
												key={membership.id}
												className={
													membership.status ===
													"Archived"
														? "opacity-60"
														: ""
												}
											>
												<TableCell className="font-medium">
													<div className="flex items-center gap-2">
														<div>
															<div className="flex items-center gap-2">
																{
																	membership.name
																}
																{membership.isFamilyPlan && (
																	<Badge
																		variant="outline"
																		className="text-[10px]"
																	>
																		Family
																	</Badge>
																)}
															</div>
															<div className="text-xs text-muted-foreground max-w-[200px] truncate">
																{
																	membership.description
																}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge variant="secondary">
														{membership.duration}
													</Badge>
												</TableCell>
												<TableCell>
													<span className="text-sm">
														{membership.accessLevel}
													</span>
												</TableCell>
												<TableCell className="font-medium">
													$
													{(
														membership.price || 0
													).toFixed(2)}
												</TableCell>
												<TableCell>
													<Badge
														variant={
															membership.status ===
															"Active"
																? "default"
																: "secondary"
														}
													>
														{membership.status}
													</Badge>
												</TableCell>
												<TableCell>
													<div className="flex gap-1">
														<Button
															variant="ghost"
															size="icon"
															onClick={() =>
																handleEdit(
																	membership
																)
															}
															title="Edit"
														>
															<Edit className="w-4 h-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															onClick={() =>
																handleToggleArchive(
																	membership
																)
															}
															title={
																membership.status ===
																"Active"
																	? "Archive"
																	: "Restore"
															}
														>
															{membership.status ===
															"Active" ? (
																<Archive className="w-4 h-4" />
															) : (
																<ArchiveRestore className="w-4 h-4" />
															)}
														</Button>
														<AlertDialog>
															<AlertDialogTrigger
																asChild
															>
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
																		Delete
																		Membership
																		Plan?
																	</AlertDialogTitle>
																	<AlertDialogDescription>
																		This
																		will
																		permanently
																		delete "
																		{
																			membership.name
																		}
																		". This
																		action
																		cannot
																		be
																		undone.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>
																		Cancel
																	</AlertDialogCancel>
																	<AlertDialogAction
																		onClick={() =>
																			handleDelete(
																				membership.id
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
					</div>
				);
			case "passes":
				return <PassesManager />;
			case "households":
				return <HouseholdManager />;
			default:
				return <div>Section not found</div>;
		}
	};

	return (
		<MembershipLayout
			activeSection={activeSection}
			onSectionChange={setActiveSection}
			counts={{
				plans: memberships.filter((m) => m.status === "Active").length,
			}}
		>
			{renderContent()}
		</MembershipLayout>
	);
};

export default MembershipSettings;
