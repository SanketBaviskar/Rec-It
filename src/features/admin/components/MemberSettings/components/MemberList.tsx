import { useState } from "react";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EditMemberDialog from "./EditMemberDialog";

// Mock Data
const INITIAL_MEMBERS = [
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
	const [members, setMembers] = useState(INITIAL_MEMBERS);
	const [searchTerm, setSearchTerm] = useState("");
	const [editingMember, setEditingMember] = useState<any>(null); // Using any for simplicity with mock data interface locally defined
	const [isEditOpen, setIsEditOpen] = useState(false);

	const filteredMembers = members.filter(
		(member) =>
			member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = (id: number) => {
		if (
			confirm(
				"Are you sure you want to delete this member? This action cannot be undone."
			)
		) {
			setMembers(members.filter((m) => m.id !== id));
		}
	};

	const handleEditClick = (member: any) => {
		setEditingMember(member);
		setIsEditOpen(true);
	};

	const handleSaveEdit = (updatedMember: any) => {
		setMembers(
			members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
		);
	};

	const getStatusVariant = (status: string) => {
		switch (status) {
			case "Active":
				return "default"; // green-ish usually in default shadcn theme or primary
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
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-medium">Member Database</h3>
					<p className="text-sm text-muted-foreground">
						View and manage all registered members.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search members..."
							className="pl-8 w-[250px]"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					{/* Add Member button could go here if needed, distinct from Registration */}
				</div>
			</div>

			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Membership</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Join Date</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredMembers.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="h-24 text-center"
								>
									No members found.
								</TableCell>
							</TableRow>
						) : (
							filteredMembers.map((member) => (
								<TableRow key={member.id}>
									<TableCell className="font-medium">
										{member.id}
									</TableCell>
									<TableCell>
										{member.firstName} {member.lastName}
									</TableCell>
									<TableCell>{member.email}</TableCell>
									<TableCell>
										{member.membershipType}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												getStatusVariant(
													member.status
												) as any
											}
										>
											{member.status}
										</Badge>
									</TableCell>
									<TableCell>{member.joinDate}</TableCell>
									<TableCell className="text-right">
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
													<Pencil className="mr-2 h-4 w-4" />{" "}
													Edit Details
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleDelete(member.id)
													}
													className="text-destructive focus:text-destructive"
												>
													<Trash2 className="mr-2 h-4 w-4" />{" "}
													Delete Member
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<EditMemberDialog
				member={editingMember}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSave={handleSaveEdit}
			/>
		</div>
	);
}
