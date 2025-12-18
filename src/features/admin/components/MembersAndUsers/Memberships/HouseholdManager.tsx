import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Plus,
	Trash2,
	User,
	Users,
	AlertTriangle,
	Edit,
	UserCheck,
	Calendar,
	Settings,
} from "lucide-react";
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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Dependent = {
	id: number;
	name: string;
	relation: "Child" | "Spouse" | "Partner";
	dob: string;
	email: string;
	phone: string;
	status: "Active" | "Inactive";
};

// Mock data for dependents
const INITIAL_DEPENDENTS: Dependent[] = [
	{
		id: 1,
		name: "Timmy Turner",
		relation: "Child",
		dob: "2010-03-21",
		email: "",
		phone: "",
		status: "Active",
	},
	{
		id: 2,
		name: "Vicky Turner",
		relation: "Spouse",
		dob: "1985-06-15",
		email: "vicky@email.com",
		phone: "555-1234",
		status: "Active",
	},
];

const HouseholdManager = () => {
	const [dependents, setDependents] =
		useState<Dependent[]>(INITIAL_DEPENDENTS);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingDependent, setEditingDependent] = useState<Dependent | null>(
		null
	);
	const [newDependent, setNewDependent] = useState<Omit<Dependent, "id">>({
		name: "",
		relation: "Child",
		dob: "",
		email: "",
		phone: "",
		status: "Active",
	});

	// Configurable aging rules
	const [agingRules, setAgingRules] = useState({
		childMaxAge: 18,
		warningDaysBefore: 60,
	});
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	// Calculate age from DOB
	const calculateAge = (dob: string) => {
		const birthDate = new Date(dob);
		const ageDiffMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDiffMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	// Check aging out status
	const checkAgingOut = (dob: string, relation: string) => {
		if (relation !== "Child") return { isAgingOut: false, daysUntil: null };
		const age = calculateAge(dob);
		if (age >= agingRules.childMaxAge) {
			return { isAgingOut: true, daysUntil: 0 };
		}
		// Check if aging out soon
		const birthDate = new Date(dob);
		const nextBirthday = new Date(
			birthDate.setFullYear(
				new Date().getFullYear() +
					(birthDate.getMonth() > new Date().getMonth() ||
					(birthDate.getMonth() === new Date().getMonth() &&
						birthDate.getDate() > new Date().getDate())
						? 0
						: 1)
			)
		);
		const daysUntil = Math.ceil(
			(nextBirthday.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
		);
		return {
			isAgingOut: false,
			daysUntil: age === agingRules.childMaxAge - 1 ? daysUntil : null,
		};
	};

	// Statistics
	const stats = useMemo(() => {
		const activeCount = dependents.filter(
			(d) => d.status === "Active"
		).length;
		const childCount = dependents.filter(
			(d) => d.relation === "Child"
		).length;
		const agingOutCount = dependents.filter(
			(d) => checkAgingOut(d.dob, d.relation).isAgingOut
		).length;
		return { activeCount, childCount, agingOutCount };
	}, [dependents, agingRules]);

	const handleOpenDialog = (dependent?: Dependent) => {
		if (dependent) {
			setEditingDependent(dependent);
			setNewDependent({
				name: dependent.name,
				relation: dependent.relation,
				dob: dependent.dob,
				email: dependent.email,
				phone: dependent.phone,
				status: dependent.status,
			});
		} else {
			setEditingDependent(null);
			setNewDependent({
				name: "",
				relation: "Child",
				dob: "",
				email: "",
				phone: "",
				status: "Active",
			});
		}
		setIsDialogOpen(true);
	};

	const handleSaveDependent = () => {
		if (!newDependent.name || !newDependent.dob) return;

		const dependentData: Dependent = {
			id: editingDependent?.id || Date.now(),
			...newDependent,
		};

		if (editingDependent) {
			setDependents(
				dependents.map((d) =>
					d.id === editingDependent.id ? dependentData : d
				)
			);
		} else {
			setDependents([...dependents, dependentData]);
		}

		setIsDialogOpen(false);
		setEditingDependent(null);
	};

	const handleDelete = (id: number) => {
		setDependents(dependents.filter((d) => d.id !== id));
	};

	const handleConvertToAdult = (id: number) => {
		// In a real app, this would create a new adult membership
		// For now, we just remove them from dependents
		setDependents(dependents.filter((d) => d.id !== id));
	};

	const agingOutDependents = dependents.filter(
		(d) => checkAgingOut(d.dob, d.relation).isAgingOut
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Households
					</h2>
					<p className="text-muted-foreground">
						Manage family members and dependents linked to
						memberships.
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => setIsSettingsOpen(!isSettingsOpen)}
					>
						<Settings className="w-4 h-4" />
					</Button>
					<Button onClick={() => handleOpenDialog()}>
						<Plus className="w-4 h-4 mr-2" />
						Add Dependent
					</Button>
				</div>
			</div>

			{/* Aging Rules Configuration */}
			<Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
				<CollapsibleContent>
					<div className="p-4 border rounded-lg bg-muted/50 space-y-4">
						<h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
							<Settings className="w-4 h-4" />
							Aging Rules Configuration
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="max-age">Child Max Age</Label>
								<Input
									id="max-age"
									type="number"
									value={agingRules.childMaxAge}
									onChange={(e) =>
										setAgingRules({
											...agingRules,
											childMaxAge:
												parseInt(e.target.value) || 18,
										})
									}
									className="w-24"
								/>
								<p className="text-xs text-muted-foreground">
									Children exceeding this age will be flagged
									for upgrade.
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="warning-days">
									Warning Days Before
								</Label>
								<Input
									id="warning-days"
									type="number"
									value={agingRules.warningDaysBefore}
									onChange={(e) =>
										setAgingRules({
											...agingRules,
											warningDaysBefore:
												parseInt(e.target.value) || 60,
										})
									}
									className="w-24"
								/>
								<p className="text-xs text-muted-foreground">
									Days before birthday to start showing
									warnings.
								</p>
							</div>
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>

			{/* Aging Out Warnings */}
			{agingOutDependents.length > 0 && (
				<Alert variant="destructive">
					<AlertTriangle className="h-4 w-4" />
					<AlertTitle>Aging Out Alert</AlertTitle>
					<AlertDescription>
						{agingOutDependents.length} dependent(s) have exceeded
						the age limit of {agingRules.childMaxAge} for "Child"
						classification. Review their status below.
					</AlertDescription>
				</Alert>
			)}

			{/* Statistics Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-primary/10">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Active Dependents
							</p>
							<p className="text-2xl font-bold">
								{stats.activeCount}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-green-500/10">
							<User className="h-5 w-5 text-green-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Children
							</p>
							<p className="text-2xl font-bold">
								{stats.childCount}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div
							className={`p-2 rounded-full ${
								stats.agingOutCount > 0
									? "bg-destructive/10"
									: "bg-muted"
							}`}
						>
							<Calendar
								className={`h-5 w-5 ${
									stats.agingOutCount > 0
										? "text-destructive"
										: "text-muted-foreground"
								}`}
							/>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Aging Out
							</p>
							<p className="text-2xl font-bold">
								{stats.agingOutCount}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Primary Account Holder */}
			<div className="flex items-center justify-between p-4 border rounded-lg bg-card">
				<div className="flex items-center gap-3">
					<Avatar className="h-10 w-10">
						<AvatarFallback className="bg-primary/10 text-primary">
							P
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">Primary Account Holder</p>
						<p className="text-sm text-muted-foreground">
							Self (Membership Owner)
						</p>
					</div>
				</div>
				<Badge variant="outline">Primary</Badge>
			</div>

			{/* Dependents Table */}
			<div className="border rounded-lg overflow-hidden bg-card">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead>Dependent</TableHead>
							<TableHead>Relation</TableHead>
							<TableHead>Age</TableHead>
							<TableHead>Contact</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[140px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dependents.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="h-32 text-center"
								>
									<div className="text-muted-foreground">
										<Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No dependents added.</p>
										<p className="text-sm">
											Click "Add Dependent" to link family
											members.
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							dependents.map((dep) => {
								const agingStatus = checkAgingOut(
									dep.dob,
									dep.relation
								);
								const age = calculateAge(dep.dob);
								return (
									<TableRow
										key={dep.id}
										className={
											agingStatus.isAgingOut
												? "bg-destructive/5"
												: ""
										}
									>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-muted-foreground" />
												{dep.name}
											</div>
										</TableCell>
										<TableCell>{dep.relation}</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												{age} yrs
												{agingStatus.isAgingOut && (
													<Badge
														variant="destructive"
														className="text-[10px]"
													>
														Aging Out
													</Badge>
												)}
											</div>
										</TableCell>
										<TableCell>
											<div className="text-sm">
												{dep.email || dep.phone ? (
													<span className="text-muted-foreground">
														{dep.email || dep.phone}
													</span>
												) : (
													<span className="text-muted-foreground">
														—
													</span>
												)}
											</div>
										</TableCell>
										<TableCell>
											<Badge
												variant={
													dep.status === "Active"
														? "default"
														: "secondary"
												}
											>
												{dep.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														handleOpenDialog(dep)
													}
													title="Edit"
												>
													<Edit className="w-4 h-4" />
												</Button>

												{agingStatus.isAgingOut && (
													<Button
														variant="ghost"
														size="icon"
														onClick={() =>
															handleConvertToAdult(
																dep.id
															)
														}
														title="Convert to Adult"
														className="text-green-600"
													>
														<UserCheck className="w-4 h-4" />
													</Button>
												)}

												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															title="Remove"
														>
															<Trash2 className="w-4 h-4" />
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Remove
																Dependent?
															</AlertDialogTitle>
															<AlertDialogDescription>
																This will remove
																"{dep.name}"
																from this
																household. This
																action cannot be
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
																		dep.id
																	)
																}
																className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
															>
																Remove
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>
							{editingDependent
								? "Edit Dependent"
								: "Add Dependent"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 pt-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2 col-span-2">
								<Label htmlFor="dep-name">Full Name</Label>
								<Input
									id="dep-name"
									value={newDependent.name}
									onChange={(e) =>
										setNewDependent({
											...newDependent,
											name: e.target.value,
										})
									}
									placeholder="e.g., Jenny Doe"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="dep-relation">Relation</Label>
								<Select
									value={newDependent.relation}
									onValueChange={(v) =>
										setNewDependent({
											...newDependent,
											relation: v as
												| "Child"
												| "Spouse"
												| "Partner",
										})
									}
								>
									<SelectTrigger id="dep-relation">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Child">
											Child
										</SelectItem>
										<SelectItem value="Spouse">
											Spouse
										</SelectItem>
										<SelectItem value="Partner">
											Partner
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="dep-dob">Date of Birth</Label>
								<Input
									id="dep-dob"
									type="date"
									value={newDependent.dob}
									onChange={(e) =>
										setNewDependent({
											...newDependent,
											dob: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="dep-email">
									Email (Optional)
								</Label>
								<Input
									id="dep-email"
									type="email"
									value={newDependent.email}
									onChange={(e) =>
										setNewDependent({
											...newDependent,
											email: e.target.value,
										})
									}
									placeholder="email@example.com"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="dep-phone">
									Phone (Optional)
								</Label>
								<Input
									id="dep-phone"
									value={newDependent.phone}
									onChange={(e) =>
										setNewDependent({
											...newDependent,
											phone: e.target.value,
										})
									}
									placeholder="555-1234"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-2 pt-4">
							<Button
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleSaveDependent}>
								{editingDependent
									? "Save Changes"
									: "Add Dependent"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HouseholdManager;
