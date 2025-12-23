import { useState, useMemo, useEffect, useCallback } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	MoreHorizontal,
	Pencil,
	Trash2,
	Search,
	Plus,
	Users,
	UserCheck,
	UserX,
	Download,
	Ban,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import EditMemberDialog from "./EditMemberDialog";
import {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	updateUserStatus,
	User,
} from "@/services/Api/User/userApi";
import {
	getAllMemberships,
	Membership,
} from "@/services/Api/Membership/membershipApi";
import { toast } from "sonner";

interface PaginationState {
	cursors: (number | null)[]; // Stack of cursors for each page
	currentPage: number;
}

const ITEMS_PER_PAGE = 100;

export default function MemberList() {
	const [members, setMembers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [editingMember, setEditingMember] = useState<User | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [nextCursor, setNextCursor] = useState<number | null>(null);
	const [pagination, setPagination] = useState<PaginationState>({
		cursors: [null], // First page has no cursor
		currentPage: 1,
	});

	// Dynamic membership types
	const [membershipTypes, setMembershipTypes] = useState<Membership[]>([]);

	const [newMember, setNewMember] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		membershipId: "",
	});

	// Fetch members from API
	const fetchMembers = useCallback(
		async (cursor: number | null = null, search: string = "") => {
			setLoading(true);
			try {
				const data = await getAllUsers({
					limit: ITEMS_PER_PAGE,
					cursor,
					search,
					status: statusFilter !== "all" ? statusFilter : undefined,
				});

				setMembers(data.users);
				setTotalCount(data.totalCount);
				setHasMore(data.hasMore);
				setNextCursor(data.nextCursor);
			} catch (error) {
				console.error("Failed to fetch members:", error);
				setMembers([]);
			} finally {
				setLoading(false);
			}
		},
		[statusFilter]
	);

	// Initial fetch - load memberships and members
	useEffect(() => {
		const loadData = async () => {
			try {
				// Load members
				await fetchMembers(null, searchTerm);
				// Load memberships for dropdown
				const memberships = await getAllMemberships();
				setMembershipTypes(memberships);
			} catch (err) {
				console.error("Error loading initial data", err);
			}
		};

		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Run once on mount

	// Debounced search
	useEffect(() => {
		const timer = setTimeout(() => {
			setPagination({ cursors: [null], currentPage: 1 });
			fetchMembers(null, searchTerm);
		}, 500);
		return () => clearTimeout(timer);
	}, [searchTerm, fetchMembers]); // Removed fetchMembers from dependency to avoid loop if it changes (though it shouldn't)

	// Handle page navigation
	const goToNextPage = () => {
		if (hasMore && nextCursor) {
			const newCursors = [...pagination.cursors, nextCursor];
			setPagination({
				cursors: newCursors,
				currentPage: pagination.currentPage + 1,
			});
			fetchMembers(nextCursor, searchTerm);
		}
	};

	const goToPreviousPage = () => {
		if (pagination.currentPage > 1) {
			const newCursors = pagination.cursors.slice(0, -1);
			const previousCursor = newCursors[newCursors.length - 1];
			setPagination({
				cursors: newCursors,
				currentPage: pagination.currentPage - 1,
			});
			fetchMembers(previousCursor, searchTerm);
		}
	};

	// Statistics based on current page
	const stats = useMemo(() => {
		const total = totalCount;
		const active = members.filter((m) => m.status === "active").length;
		const suspended = members.filter(
			(m) => m.status === "suspended"
		).length;
		const expired = members.filter((m) => m.status === "expired").length;
		return { total, active, suspended, expired };
	}, [members, totalCount]);

	// Filter by status (client-side for current page)
	const filteredMembers = useMemo(() => {
		if (statusFilter === "all") return members;
		return members.filter((member) => member.status === statusFilter);
	}, [members, statusFilter]);

	const handleDelete = async (id: number) => {
		try {
			await deleteUser(id);
			setMembers((prev) => prev.filter((m) => m.id !== id));
			toast.success("Member deleted successfully");
		} catch {
			toast.error("Failed to delete member");
		}
	};

	const handleEditClick = (member: User) => {
		setEditingMember(member);
		setIsEditOpen(true);
	};

	const handleSaveEdit = async (updatedMember: User) => {
		try {
			const updated = await updateUser(updatedMember.id, {
				firstName: updatedMember.firstName,
				lastName: updatedMember.lastName,
				email: updatedMember.email,
				phoneNumber: updatedMember.phoneNumber,
				status: updatedMember.status,
			});
			setMembers((prev) =>
				prev.map((m) => (m.id === updated.id ? updated : m))
			);
			toast.success("Member updated successfully");
		} catch {
			toast.error("Failed to update member");
		}
	};

	const handleAddMember = async () => {
		if (!newMember.firstName || !newMember.email) {
			toast.error("Please fill in required fields");
			return;
		}

		try {
			await createUser({
				firstName: newMember.firstName,
				lastName: newMember.lastName,
				email: newMember.email,
				phoneNumber: newMember.phoneNumber,
				membershipId: newMember.membershipId
					? parseInt(newMember.membershipId)
					: undefined,
			});

			setIsAddOpen(false);
			setNewMember({
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				membershipId: "",
			});
			toast.success("Member added successfully");
			fetchMembers(null, searchTerm);
		} catch {
			toast.error("Failed to add member");
		}
	};

	const handleStatusChange = async (id: number, newStatus: string) => {
		try {
			const updated = await updateUserStatus(id, newStatus);
			setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
			toast.success(`Member status updated to ${newStatus}`);
		} catch {
			toast.error("Failed to update status");
		}
	};

	const handleExportCSV = () => {
		const headers = [
			"ID",
			"First Name",
			"Last Name",
			"Email",
			"Phone",
			"Status",
			"Join Date",
		];
		const rows = members.map((m) => [
			m.id,
			m.firstName,
			m.lastName,
			m.email,
			m.phoneNumber || "",
			m.status,
			m.createdAt,
		]);
		const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "members.csv";
		a.click();
	};

	const getStatusVariant = (status: string) => {
		switch (status?.toLowerCase()) {
			case "active":
				return "default";
			case "inactive":
				return "secondary";
			case "suspended":
				return "destructive";
			case "expired":
				return "outline";
			default:
				return "secondary";
		}
	};

	// Calculate page info
	const startIndex = (pagination.currentPage - 1) * ITEMS_PER_PAGE + 1;
	const endIndex = Math.min(startIndex + members.length - 1, totalCount);
	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

	return (
		<div className="space-y-6">
			{/* Statistics Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-primary/10">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Members
							</p>
							<p className="text-2xl font-bold">{stats.total}</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-green-500/10">
							<UserCheck className="h-5 w-5 text-green-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Active (this page)
							</p>
							<p className="text-2xl font-bold">{stats.active}</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-destructive/10">
							<Ban className="h-5 w-5 text-destructive" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Suspended (this page)
							</p>
							<p className="text-2xl font-bold">
								{stats.suspended}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-muted">
							<UserX className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Expired (this page)
							</p>
							<p className="text-2xl font-bold">
								{stats.expired}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Actions Bar */}
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 flex-1">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search members..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select
						value={statusFilter}
						onValueChange={setStatusFilter}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="suspended">Suspended</SelectItem>
							<SelectItem value="expired">Expired</SelectItem>
							<SelectItem value="inactive">Inactive</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={handleExportCSV}>
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button onClick={() => setIsAddOpen(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Member
					</Button>
				</div>
			</div>

			{/* Members Table */}
			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead className="w-[80px]">ID</TableHead>
							<TableHead>Member</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Membership</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Join Date</TableHead>
							<TableHead className="w-[80px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="h-32 text-center"
								>
									<div className="flex items-center justify-center gap-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										<span>Loading members...</span>
									</div>
								</TableCell>
							</TableRow>
						) : filteredMembers.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="h-32 text-center"
								>
									<div className="text-muted-foreground">
										<Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No members found.</p>
										{searchTerm && (
											<p className="text-sm">
												Try adjusting your search or
												filters.
											</p>
										)}
									</div>
								</TableCell>
							</TableRow>
						) : (
							filteredMembers.map((member) => (
								<TableRow key={member.id}>
									<TableCell className="font-mono text-sm">
										{member.id}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-8 w-8">
												<AvatarFallback>
													{member.firstName?.[0] ||
														"?"}
													{member.lastName?.[0] || ""}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="font-medium leading-none">
													{member.firstName}{" "}
													{member.lastName}
												</span>
												<span className="text-xs text-muted-foreground">
													{member.phoneNumber ||
														"No phone"}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{member.email}
									</TableCell>
									<TableCell>
										{member.memberships &&
										member.memberships.length > 0 ? (
											<Badge
												variant="secondary"
												className="bg-primary/10 text-primary"
											>
												{
													member.memberships[0]
														.membership.name
												}
											</Badge>
										) : (
											<span className="text-muted-foreground text-sm">
												No membership
											</span>
										)}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{member.role === "0"
												? "Member"
												: `Staff L${member.role}`}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												getStatusVariant(
													member.status
												) as
													| "default"
													| "secondary"
													| "destructive"
													| "outline"
											}
										>
											{member.status || "Unknown"}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{new Date(
											member.createdAt
										).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<span className="sr-only">
														Open menu
													</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>
													Actions
												</DropdownMenuLabel>
												<DropdownMenuItem
													onClick={() =>
														handleEditClick(member)
													}
												>
													<Pencil className="mr-2 h-4 w-4" />
													Edit Details
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												{member.status !== "active" && (
													<DropdownMenuItem
														onClick={() =>
															handleStatusChange(
																member.id,
																"active"
															)
														}
													>
														<CheckCircle className="mr-2 h-4 w-4 text-green-500" />
														Activate
													</DropdownMenuItem>
												)}
												{member.status !==
													"suspended" && (
													<DropdownMenuItem
														onClick={() =>
															handleStatusChange(
																member.id,
																"suspended"
															)
														}
													>
														<Ban className="mr-2 h-4 w-4 text-orange-500" />
														Suspend
													</DropdownMenuItem>
												)}
												<DropdownMenuSeparator />
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<DropdownMenuItem
															onSelect={(e) =>
																e.preventDefault()
															}
															className="text-destructive focus:text-destructive"
														>
															<Trash2 className="mr-2 h-4 w-4" />
															Delete Member
														</DropdownMenuItem>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Delete Member?
															</AlertDialogTitle>
															<AlertDialogDescription>
																This will
																permanently
																delete{" "}
																{
																	member.firstName
																}{" "}
																{
																	member.lastName
																}
																. This action
																cannot be
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
																		member.id
																	)
																}
																className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
															>
																Delete
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing {members.length > 0 ? startIndex : 0} - {endIndex}{" "}
					of {totalCount} members
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={goToPreviousPage}
						disabled={pagination.currentPage === 1 || loading}
					>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Previous
					</Button>
					<span className="text-sm text-muted-foreground px-2">
						Page {pagination.currentPage} of {totalPages || 1}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={goToNextPage}
						disabled={!hasMore || loading}
					>
						Next
						<ChevronRight className="h-4 w-4 ml-1" />
					</Button>
				</div>
			</div>

			{/* Edit Member Dialog */}
			<EditMemberDialog
				member={editingMember}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSave={handleSaveEdit}
			/>

			{/* Add Member Dialog */}
			<Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>Add New Member</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 pt-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									value={newMember.firstName}
									onChange={(e) =>
										setNewMember({
											...newMember,
											firstName: e.target.value,
										})
									}
									placeholder="John"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									value={newMember.lastName}
									onChange={(e) =>
										setNewMember({
											...newMember,
											lastName: e.target.value,
										})
									}
									placeholder="Doe"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={newMember.email}
								onChange={(e) =>
									setNewMember({
										...newMember,
										email: e.target.value,
									})
								}
								placeholder="john@example.com"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input
								id="phone"
								value={newMember.phoneNumber}
								onChange={(e) =>
									setNewMember({
										...newMember,
										phoneNumber: e.target.value,
									})
								}
								placeholder="555-0100"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="membership">Membership Plan</Label>
							<Select
								value={newMember.membershipId}
								onValueChange={(v) =>
									setNewMember({
										...newMember,
										membershipId: v,
									})
								}
							>
								<SelectTrigger id="membership">
									<SelectValue placeholder="Select a plan" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">
										No Membership
									</SelectItem>
									{membershipTypes.map((plan) => (
										<SelectItem
											key={plan.id}
											value={plan.id.toString()}
										>
											{plan.name} (${plan.price})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex justify-end gap-2 pt-4">
							<Button
								variant="outline"
								onClick={() => setIsAddOpen(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleAddMember}>
								Add Member
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
