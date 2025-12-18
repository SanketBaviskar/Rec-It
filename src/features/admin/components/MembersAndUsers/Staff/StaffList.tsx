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
import {
	MoreHorizontal,
	Pencil,
	Trash2,
	Search,
	Plus,
	ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffMemberDialog from "./StaffMemberDialog";

// Mock Data
const INITIAL_STAFF = [
	{
		id: 1,
		firstName: "Sarah",
		lastName: "Connor",
		email: "sarah@rec-it.edu",
		phoneNumber: "(555) 123-4567",
		role: "General Manager",
		status: "Active",
		lastActive: "Now",
		payRate: 45.0,
	},
	{
		id: 2,
		firstName: "Mike",
		lastName: "Ross",
		email: "mike@rec-it.edu",
		phoneNumber: "(555) 987-6543",
		role: "Front Desk Lead",
		status: "Active",
		lastActive: "2h ago",
		payRate: 22.5,
	},
	{
		id: 3,
		firstName: "Jessica",
		lastName: "Pearson",
		email: "jessica@rec-it.edu",
		phoneNumber: "(555) 555-5555",
		role: "Aquatics Director",
		status: "On Leave",
		lastActive: "3d ago",
		payRate: 55.0,
	},
];

export default function StaffList() {
	const [staff, setStaff] = useState(INITIAL_STAFF);
	const [searchTerm, setSearchTerm] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState<any>(null);

	const filteredStaff = staff.filter(
		(s) =>
			s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			s.role.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddStaff = () => {
		setSelectedStaff(null);
		setIsDialogOpen(true);
	};

	const handleEditStaff = (staffMember: any) => {
		setSelectedStaff(staffMember);
		setIsDialogOpen(true);
	};

	const handleSaveStaff = (data: any) => {
		console.log("Saving staff data:", data);
		// Logic to update or add staff would go here
		setIsDialogOpen(false);
	};

	return (
		<div className="space-y-6 h-full p-8 md:p-10 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">
						Staff Directory
					</h2>
					<p className="text-muted-foreground">
						Manage staff access, roles, and payroll details.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline">
						<ShieldAlert className="mr-2 h-4 w-4" /> Expiring Certs
					</Button>
					<Button onClick={handleAddStaff}>
						<Plus className="mr-2 h-4 w-4" /> Add Staff Member
					</Button>
				</div>
			</div>

			<div className="flex items-center py-4">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search staff..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[80px]">ID</TableHead>
							<TableHead>Staff Member</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Pay Rate</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Last Active</TableHead>
							<TableHead className="text-right">
								Ordered Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredStaff.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="h-24 text-center"
								>
									No staff found.
								</TableCell>
							</TableRow>
						) : (
							filteredStaff.map((person) => (
								<TableRow key={person.id}>
									<TableCell className="font-medium">
										{person.id}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-8 w-8">
												<AvatarFallback>
													{person.firstName[0]}
													{person.lastName[0]}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="font-medium leading-none">
													{person.firstName}{" "}
													{person.lastName}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{person.role}
										</Badge>
									</TableCell>
									<TableCell>{person.email}</TableCell>
									<TableCell>
										${person.payRate.toFixed(2)}/hr
									</TableCell>
									<TableCell>
										<Badge
											variant={
												person.status === "Active"
													? "default"
													: "secondary"
											}
										>
											{person.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground text-sm">
										{person.lastActive}
									</TableCell>
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
														handleEditStaff(person)
													}
												>
													<Pencil className="mr-2 h-4 w-4" />{" "}
													Edit Details
												</DropdownMenuItem>
												<DropdownMenuItem className="text-destructive focus:text-destructive">
													<Trash2 className="mr-2 h-4 w-4" />{" "}
													Deactivate
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

			<StaffMemberDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSave={handleSaveStaff}
				staffMember={selectedStaff}
			/>
		</div>
	);
}
