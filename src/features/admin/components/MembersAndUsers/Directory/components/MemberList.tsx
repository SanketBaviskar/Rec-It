import { useState, useMemo } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import EditMemberDialog from "./EditMemberDialog";

// Member Type Definition
interface Member {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	membershipType: string;
	status: "Active" | "Inactive" | "Suspended" | "Expired";
	joinDate: string;
}

// Mock Data
const INITIAL_MEMBERS: Member[] = [
	{
		id: 1001,
		firstName: "John",
		lastName: "Doe",
		email: "john@example.com",
		phoneNumber: "555-0101",
		membershipType: "Gold Membership",
		status: "Active",
		joinDate: "2023-01-15",
	},
	{
		id: 1002,
		firstName: "Jane",
		lastName: "Smith",
		email: "jane@example.com",
		phoneNumber: "555-0102",
		membershipType: "Student Monthly",
		status: "Active",
		joinDate: "2023-02-20",
	},
	{
		id: 1003,
		firstName: "Bob",
		lastName: "Johnson",
		email: "bob@example.com",
		phoneNumber: "555-0103",
		membershipType: "Gold Membership",
		status: "Suspended",
		joinDate: "2022-11-05",
	},
	{
		id: 1004,
		firstName: "Alice",
		lastName: "Brown",
		email: "alice@example.com",
		phoneNumber: "555-0104",
		membershipType: "Day Pass",
		status: "Expired",
		joinDate: "2023-10-10",
	},
	{
		id: 1005,
		firstName: "Charlie",
		lastName: "Davis",
		email: "charlie@example.com",
		phoneNumber: "555-0105",
		membershipType: "Student Monthly",
		status: "Active",
		joinDate: "2023-05-12",
	},
];

export default function MemberList() {
	const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [editingMember, setEditingMember] = useState<Member | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [newMember, setNewMember] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		membershipType: "Gold Membership",
	});

	// Statistics
	const stats = useMemo(() => {
		const total = members.length;
		const active = members.filter((m) => m.status === "Active").length;
		const suspended = members.filter(
			(m) => m.status === "Suspended"
		).length;
		const expired = members.filter((m) => m.status === "Expired").length;
		return { total, active, suspended, expired };
	}, [members]);

	// Filtered members
	const filteredMembers = useMemo(() => {
		return members.filter((member) => {
			const matchesSearch =
				member.firstName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				member.lastName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				member.email.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus =
				statusFilter === "all" || member.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [members, searchTerm, statusFilter]);

	const handleDelete = (id: number) => {
		setMembers(members.filter((m) => m.id !== id));
	};

	const handleEditClick = (member: Member) => {
		setEditingMember(member);
		setIsEditOpen(true);
	};

	const handleSaveEdit = (updatedMember: Member) => {
		setMembers(
			members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
		);
	};

	const handleAddMember = () => {
		if (!newMember.firstName || !newMember.email) return;

		const member: Member = {
			id: Date.now(),
			firstName: newMember.firstName,
			lastName: newMember.lastName,
			email: newMember.email,
			phoneNumber: newMember.phoneNumber,
			membershipType: newMember.membershipType,
			status: "Active",
			joinDate: new Date().toISOString().split("T")[0],
		};

		setMembers([...members, member]);
		setIsAddOpen(false);
		setNewMember({
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			membershipType: "Gold Membership",
		});
	};

	const handleStatusChange = (id: number, newStatus: Member["status"]) => {
		setMembers(
			members.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
		);
	};

	const handleExportCSV = () => {
		const headers = [
			"ID",
			"First Name",
			"Last Name",
			"Email",
			"Phone",
			"Membership",
			"Status",
			"Join Date",
		];
		const rows = members.map((m) => [
			m.id,
			m.firstName,
			m.lastName,
			m.email,
			m.phoneNumber,
			m.membershipType,
			m.status,
			m.joinDate,
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
		switch (status) {
			case "Active":
				return "default";
			case "Inactive":
				return "secondary";
			case "Suspended":
				return "destructive";
			case "Expired":
				return "outline";
			default:
				return "secondary";
		}
	};

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
								Active
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
								Suspended
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
								Expired
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
							<SelectItem value="Active">Active</SelectItem>
							<SelectItem value="Suspended">Suspended</SelectItem>
							<SelectItem value="Expired">Expired</SelectItem>
							<SelectItem value="Inactive">Inactive</SelectItem>
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
							<TableHead>Status</TableHead>
							<TableHead>Join Date</TableHead>
							<TableHead className="w-[80px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredMembers.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
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
													{member.firstName[0]}
													{member.lastName[0]}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="font-medium leading-none">
													{member.firstName}{" "}
													{member.lastName}
												</span>
												<span className="text-xs text-muted-foreground">
													{member.phoneNumber}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{member.email}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{member.membershipType}
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
											{member.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{member.joinDate}
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
												{member.status !== "Active" && (
													<DropdownMenuItem
														onClick={() =>
															handleStatusChange(
																member.id,
																"Active"
															)
														}
													>
														<CheckCircle className="mr-2 h-4 w-4 text-green-500" />
														Activate
													</DropdownMenuItem>
												)}
												{member.status !==
													"Suspended" && (
													<DropdownMenuItem
														onClick={() =>
															handleStatusChange(
																member.id,
																"Suspended"
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

			{/* Showing count */}
			<p className="text-sm text-muted-foreground">
				Showing {filteredMembers.length} of {members.length} members
			</p>

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
							<Label htmlFor="membership">Membership Type</Label>
							<Select
								value={newMember.membershipType}
								onValueChange={(v) =>
									setNewMember({
										...newMember,
										membershipType: v,
									})
								}
							>
								<SelectTrigger id="membership">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Gold Membership">
										Gold Membership
									</SelectItem>
									<SelectItem value="Student Monthly">
										Student Monthly
									</SelectItem>
									<SelectItem value="Day Pass">
										Day Pass
									</SelectItem>
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
