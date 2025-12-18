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
import MultiVisitPassList from "./MultiVisitPassList";
import GuestPassConfig from "./GuestPassConfig";
import HouseholdManager from "./HouseholdManager";
import MembershipLayout from "./Layout/MembershipLayout";

type MembershipType = {
	id: string;
	name: string;
	description: string;
	duration: "Monthly" | "Semester" | "Annual" | "One-Time";
	price: number;
	status: "Active" | "Archived";
	accessLevel: "Full" | "Limited" | "Student-Only";
	isFamilyPlan: boolean;
	maxYouthAge: number | null;
};

interface MembershipSettingsProps {
	onComplete?: () => void;
}

const MembershipSettings = ({ onComplete }: MembershipSettingsProps = {}) => {
	const [activeSection, setActiveSection] = useState("plans");
	const [membershipTypes, setMembershipTypes] = useState<MembershipType[]>([
		{
			id: "1",
			name: "Basic Monthly",
			description:
				"Access to basic facilities including gym and cardio deck.",
			duration: "Monthly",
			price: 29.99,
			status: "Active",
			accessLevel: "Full",
			isFamilyPlan: false,
			maxYouthAge: null,
		},
		{
			id: "2",
			name: "Student Semester",
			description:
				"Discounted rate for enrolled students. Valid for one semester.",
			duration: "Semester",
			price: 120.0,
			status: "Active",
			accessLevel: "Student-Only",
			isFamilyPlan: false,
			maxYouthAge: null,
		},
		{
			id: "3",
			name: "Family Annual",
			description:
				"Full access for the whole family. Includes up to 4 dependents.",
			duration: "Annual",
			price: 599.0,
			status: "Active",
			accessLevel: "Full",
			isFamilyPlan: true,
			maxYouthAge: 18,
		},
		{
			id: "4",
			name: "Summer Pass",
			description: "Limited summer access for community members.",
			duration: "One-Time",
			price: 150.0,
			status: "Archived",
			accessLevel: "Limited",
			isFamilyPlan: false,
			maxYouthAge: null,
		},
	]);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingMembership, setEditingMembership] =
		useState<MembershipType | null>(null);

	// Calculate statistics
	const stats = useMemo(() => {
		const activePlans = membershipTypes.filter(
			(m) => m.status === "Active"
		);
		const monthlyRevenue = activePlans.reduce((sum, m) => {
			if (m.duration === "Monthly") return sum + m.price;
			if (m.duration === "Annual") return sum + m.price / 12;
			if (m.duration === "Semester") return sum + m.price / 4;
			return sum;
		}, 0);

		return {
			totalPlans: membershipTypes.length,
			activePlans: activePlans.length,
			monthlyRevenue: monthlyRevenue.toFixed(2),
		};
	}, [membershipTypes]);

	const handleFormSubmit = (values: MembershipFormValues) => {
		const newMembership: MembershipType = {
			id: editingMembership?.id || Date.now().toString(),
			name: values.name,
			description: values.description,
			duration: values.duration,
			price: values.price,
			status: values.status,
			accessLevel: values.accessLevel,
			isFamilyPlan: values.isFamilyPlan,
			maxYouthAge: values.maxYouthAge,
		};

		if (editingMembership) {
			setMembershipTypes(
				membershipTypes.map((m) =>
					m.id === editingMembership.id ? newMembership : m
				)
			);
		} else {
			setMembershipTypes([...membershipTypes, newMembership]);
		}

		setIsDialogOpen(false);
		setEditingMembership(null);
		if (onComplete) onComplete();
	};

	const handleEdit = (membership: MembershipType) => {
		setEditingMembership(membership);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: string) => {
		setMembershipTypes(membershipTypes.filter((m) => m.id !== id));
		if (onComplete) onComplete();
	};

	const handleToggleArchive = (id: string) => {
		setMembershipTypes(
			membershipTypes.map((m) =>
				m.id === id
					? {
							...m,
							status:
								m.status === "Active" ? "Archived" : "Active",
					  }
					: m
			)
		);
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
										initialData={
											editingMembership || undefined
										}
									/>
								</DialogContent>
							</Dialog>
						</div>

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
									{membershipTypes.length === 0 ? (
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
										membershipTypes.map((membership) => (
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
													{membership.price.toFixed(
														2
													)}
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
																	membership.id
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
				return <MultiVisitPassList />;
			case "guest":
				return <GuestPassConfig />;
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
				plans: membershipTypes.filter((m) => m.status === "Active")
					.length,
			}}
		>
			{renderContent()}
		</MembershipLayout>
	);
};

export default MembershipSettings;
