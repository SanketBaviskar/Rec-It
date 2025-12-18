import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Search,
	AlertTriangle,
	Clock,
	DollarSign,
	Mail,
	Phone,
	Ban,
	MoreHorizontal,
	User,
	Package,
	Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

interface OverdueItem {
	id: string;
	serialNumber: string;
	equipmentName: string;
	memberId: string;
	memberName: string;
	memberEmail: string;
	memberPhone?: string;
	checkedOutAt: string;
	dueAt: string;
	daysOverdue: number;
	lateFee: number;
	notificationsSent: number;
	lastNotified?: string;
}

// Mock overdue data
const MOCK_OVERDUE_ITEMS: OverdueItem[] = [
	{
		id: "1",
		serialNumber: "BB001",
		equipmentName: "Basketball",
		memberId: "12345",
		memberName: "John Smith",
		memberEmail: "john.smith@university.edu",
		memberPhone: "555-0101",
		checkedOutAt: "2024-01-15",
		dueAt: "2024-01-22",
		daysOverdue: 5,
		lateFee: 25.0,
		notificationsSent: 2,
		lastNotified: "2024-01-25",
	},
	{
		id: "2",
		serialNumber: "RW003",
		equipmentName: "Climbing Harness",
		memberId: "23456",
		memberName: "Jane Doe",
		memberEmail: "jane.doe@university.edu",
		checkedOutAt: "2024-01-18",
		dueAt: "2024-01-25",
		daysOverdue: 2,
		lateFee: 10.0,
		notificationsSent: 1,
		lastNotified: "2024-01-26",
	},
	{
		id: "3",
		serialNumber: "VB005",
		equipmentName: "Volleyball",
		memberId: "34567",
		memberName: "Mike Johnson",
		memberEmail: "mike.j@university.edu",
		memberPhone: "555-0303",
		checkedOutAt: "2024-01-10",
		dueAt: "2024-01-17",
		daysOverdue: 10,
		lateFee: 50.0,
		notificationsSent: 3,
		lastNotified: "2024-01-24",
	},
	{
		id: "4",
		serialNumber: "KEY012",
		equipmentName: "Locker Key #12",
		memberId: "45678",
		memberName: "Sarah Williams",
		memberEmail: "sarah.w@university.edu",
		checkedOutAt: "2024-01-20",
		dueAt: "2024-01-27",
		daysOverdue: 1,
		lateFee: 5.0,
		notificationsSent: 0,
	},
];

export function OverdueDashboard() {
	const [overdueItems, setOverdueItems] =
		useState<OverdueItem[]>(MOCK_OVERDUE_ITEMS);
	const [searchQuery, setSearchQuery] = useState("");
	const [severityFilter, setSeverityFilter] = useState<string>("all");
	const { toast } = useToast();

	// Calculate stats
	const totalItems = overdueItems.length;
	const totalLateFees = overdueItems.reduce(
		(sum, item) => sum + item.lateFee,
		0
	);
	const severeCount = overdueItems.filter(
		(item) => item.daysOverdue >= 7
	).length;
	const needsNotification = overdueItems.filter(
		(item) => item.notificationsSent === 0
	).length;

	// Filter items
	const filteredItems = overdueItems.filter((item) => {
		const matchesSearch =
			item.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.serialNumber
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			item.equipmentName
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

		const matchesSeverity =
			severityFilter === "all" ||
			(severityFilter === "severe" && item.daysOverdue >= 7) ||
			(severityFilter === "moderate" &&
				item.daysOverdue >= 3 &&
				item.daysOverdue < 7) ||
			(severityFilter === "mild" && item.daysOverdue < 3);

		return matchesSearch && matchesSeverity;
	});

	// Get severity badge
	const getSeverityBadge = (daysOverdue: number) => {
		if (daysOverdue >= 7) {
			return (
				<Badge variant="destructive" className="gap-1">
					<AlertTriangle className="h-3 w-3" />
					Severe ({daysOverdue} days)
				</Badge>
			);
		} else if (daysOverdue >= 3) {
			return (
				<Badge className="bg-amber-500 hover:bg-amber-600 gap-1">
					<Clock className="h-3 w-3" />
					Moderate ({daysOverdue} days)
				</Badge>
			);
		} else {
			return (
				<Badge variant="secondary" className="gap-1">
					<Clock className="h-3 w-3" />
					{daysOverdue} day(s)
				</Badge>
			);
		}
	};

	// Handle actions
	const handleSendReminder = async (item: OverdueItem) => {
		toast({
			title: "Reminder Sent",
			description: `Email reminder sent to ${item.memberEmail}`,
		});
		// Update notification count
		setOverdueItems((prev) =>
			prev.map((i) =>
				i.id === item.id
					? {
							...i,
							notificationsSent: i.notificationsSent + 1,
							lastNotified: new Date().toISOString(),
					  }
					: i
			)
		);
	};

	const handleSuspendMember = (item: OverdueItem) => {
		toast({
			title: "Member Suspended",
			description: `${item.memberName}'s equipment privileges have been suspended.`,
			variant: "destructive",
		});
	};

	const handleWaiveFee = (item: OverdueItem) => {
		setOverdueItems((prev) =>
			prev.map((i) => (i.id === item.id ? { ...i, lateFee: 0 } : i))
		);
		toast({
			title: "Fee Waived",
			description: `Late fee for ${item.equipmentName} has been waived.`,
		});
	};

	return (
		<div className="h-full flex flex-col p-4 gap-4 overflow-hidden">
			{/* Stats Cards */}
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-destructive/10">
							<Package className="h-5 w-5 text-destructive" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Overdue
							</p>
							<p className="text-2xl font-bold">{totalItems}</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-green-500/10">
							<DollarSign className="h-5 w-5 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Late Fees
							</p>
							<p className="text-2xl font-bold text-green-600">
								${totalLateFees.toFixed(2)}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-red-500/10">
							<AlertTriangle className="h-5 w-5 text-red-600" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Severe (7+ days)
							</p>
							<p className="text-2xl font-bold text-red-600">
								{severeCount}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-blue-500/10">
							<Mail className="h-5 w-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Needs Reminder
							</p>
							<p className="text-2xl font-bold text-blue-600">
								{needsNotification}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-4">
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Search by member, equipment, or serial..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						<Select
							value={severityFilter}
							onValueChange={setSeverityFilter}
						>
							<SelectTrigger className="w-[180px]">
								<Filter className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Filter by severity" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Items</SelectItem>
								<SelectItem value="severe">
									Severe (7+ days)
								</SelectItem>
								<SelectItem value="moderate">
									Moderate (3-6 days)
								</SelectItem>
								<SelectItem value="mild">
									Mild (1-2 days)
								</SelectItem>
							</SelectContent>
						</Select>

						<Button variant="outline">
							<Mail className="h-4 w-4 mr-2" />
							Send Bulk Reminders
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Table */}
			<Card className="flex-1 overflow-hidden">
				<div className="h-full overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 bg-card z-10">
							<TableRow>
								<TableHead>Equipment</TableHead>
								<TableHead>Member</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Late Fee</TableHead>
								<TableHead>Notified</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredItems.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-12"
									>
										<Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
										<p className="text-muted-foreground">
											No overdue items found
										</p>
									</TableCell>
								</TableRow>
							) : (
								filteredItems.map((item) => (
									<TableRow
										key={item.id}
										className={
											item.daysOverdue >= 7
												? "bg-destructive/5"
												: ""
										}
									>
										<TableCell>
											<div>
												<p className="font-medium">
													{item.equipmentName}
												</p>
												<p className="text-xs text-muted-foreground font-mono">
													{item.serialNumber}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
													<User className="h-4 w-4 text-muted-foreground" />
												</div>
												<div>
													<p className="font-medium">
														{item.memberName}
													</p>
													<p className="text-xs text-muted-foreground">
														{item.memberEmail}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{item.dueAt}
										</TableCell>
										<TableCell>
											{getSeverityBadge(item.daysOverdue)}
										</TableCell>
										<TableCell>
											<span className="font-semibold text-green-600">
												${item.lateFee.toFixed(2)}
											</span>
										</TableCell>
										<TableCell>
											{item.notificationsSent > 0 ? (
												<Badge
													variant="outline"
													className="gap-1"
												>
													<Mail className="h-3 w-3" />
													×{item.notificationsSent}
												</Badge>
											) : (
												<Badge
													variant="secondary"
													className="text-amber-600 bg-amber-500/10"
												>
													Not Sent
												</Badge>
											)}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
													>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() =>
															handleSendReminder(
																item
															)
														}
													>
														<Mail className="h-4 w-4 mr-2" />
														Send Reminder
													</DropdownMenuItem>
													{item.memberPhone && (
														<DropdownMenuItem>
															<Phone className="h-4 w-4 mr-2" />
															Call Member
														</DropdownMenuItem>
													)}
													<DropdownMenuItem
														onClick={() =>
															handleWaiveFee(item)
														}
													>
														<DollarSign className="h-4 w-4 mr-2" />
														Waive Fee
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-destructive"
														onClick={() =>
															handleSuspendMember(
																item
															)
														}
													>
														<Ban className="h-4 w-4 mr-2" />
														Suspend Privileges
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
			</Card>
		</div>
	);
}
