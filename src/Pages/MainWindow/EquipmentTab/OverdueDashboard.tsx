import { useState, useEffect } from "react";
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
	Ban,
	MoreHorizontal,
	User,
	Package,
	Filter,
	RefreshCw,
	Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import {
	fetchOverdueCheckouts,
	CheckoutRecord,
} from "@/services/Api/Equipment/checkoutApi";

// Helper to calculate days overdue
const calculateDaysOverdue = (dueAt: string | null): number => {
	if (!dueAt) return 0;
	const due = new Date(dueAt);
	const now = new Date();
	const diffTime = now.getTime() - due.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return Math.max(0, diffDays);
};

// Helper to calculate late fee ($2.50/hour, capped at $50)
const calculateLateFee = (dueAt: string | null): number => {
	if (!dueAt) return 0;
	const due = new Date(dueAt);
	const now = new Date();
	const diffHours = Math.max(
		0,
		(now.getTime() - due.getTime()) / (1000 * 60 * 60)
	);
	return Math.min(50, diffHours * 2.5);
};

export function OverdueDashboard() {
	const [checkouts, setCheckouts] = useState<CheckoutRecord[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [severityFilter, setSeverityFilter] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const { toast } = useToast();

	// Fetch overdue items from API
	const loadOverdueItems = async () => {
		try {
			const response = await fetchOverdueCheckouts();
			if (response.status === "success" && response.data) {
				const data = Array.isArray(response.data) ? response.data : [];
				setCheckouts(data);
			} else {
				setCheckouts([]);
			}
		} catch (error) {
			console.error("Failed to load overdue items:", error);
			toast({
				title: "Error",
				description: "Failed to load overdue items",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Load on mount
	useEffect(() => {
		loadOverdueItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle refresh
	const handleRefresh = async () => {
		setRefreshing(true);
		await loadOverdueItems();
		setRefreshing(false);
		toast({
			title: "Refreshed",
			description: "Overdue items list updated",
		});
	};

	// Calculate stats
	const totalItems = checkouts.length;
	const totalLateFees = checkouts.reduce(
		(sum, item) => sum + calculateLateFee(item.dueAt),
		0
	);
	const severeCount = checkouts.filter(
		(item) => calculateDaysOverdue(item.dueAt) >= 7
	).length;

	// Filter items
	const filteredItems = checkouts.filter((checkout) => {
		const equipmentName =
			checkout.equipmentItem?.equipment?.name?.toLowerCase() || "";
		const serialNumber =
			checkout.equipmentItem?.serialNumber?.toLowerCase() || "";
		const memberName = `${checkout.user?.firstName || ""} ${
			checkout.user?.lastName || ""
		}`.toLowerCase();
		const matchesSearch =
			memberName.includes(searchQuery.toLowerCase()) ||
			serialNumber.includes(searchQuery.toLowerCase()) ||
			equipmentName.includes(searchQuery.toLowerCase());

		const daysOverdue = calculateDaysOverdue(checkout.dueAt);
		const matchesSeverity =
			severityFilter === "all" ||
			(severityFilter === "severe" && daysOverdue >= 7) ||
			(severityFilter === "moderate" &&
				daysOverdue >= 3 &&
				daysOverdue < 7) ||
			(severityFilter === "mild" && daysOverdue < 3);

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
	const handleSendReminder = async (checkout: CheckoutRecord) => {
		const email = checkout.user?.email || "unknown";
		toast({
			title: "Reminder Sent",
			description: `Email reminder sent to ${email}`,
		});
	};

	const handleSuspendMember = (checkout: CheckoutRecord) => {
		const memberName = checkout.user
			? `${checkout.user.firstName} ${checkout.user.lastName}`
			: "Unknown";
		toast({
			title: "Member Suspended",
			description: `${memberName}'s equipment privileges have been suspended.`,
			variant: "destructive",
		});
	};

	const handleWaiveFee = (checkout: CheckoutRecord) => {
		const equipmentName =
			checkout.equipmentItem?.equipment?.name || "Unknown";
		toast({
			title: "Fee Waived",
			description: `Late fee for ${equipmentName} has been waived.`,
		});
	};

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

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
						<Button
							variant="outline"
							onClick={handleRefresh}
							disabled={refreshing}
							className="w-full h-full"
						>
							<RefreshCw
								className={`h-5 w-5 mr-2 ${
									refreshing ? "animate-spin" : ""
								}`}
							/>
							Refresh
						</Button>
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
								filteredItems.map((item) => {
									const daysOverdue = calculateDaysOverdue(
										item.dueAt
									);
									const lateFee = calculateLateFee(
										item.dueAt
									);
									const equipmentName =
										item.equipmentItem?.equipment?.name ||
										"Unknown";
									const serialNumber =
										item.equipmentItem?.serialNumber ||
										item.equipmentItem?.barcode ||
										"N/A";
									const memberName = item.user
										? `${item.user.firstName} ${item.user.lastName}`
										: "Unknown";
									const memberEmail =
										item.user?.email || "N/A";

									return (
										<TableRow
											key={item.id}
											className={
												daysOverdue >= 7
													? "bg-destructive/5"
													: ""
											}
										>
											<TableCell>
												<div>
													<p className="font-medium">
														{equipmentName}
													</p>
													<p className="text-xs text-muted-foreground font-mono">
														{serialNumber}
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
															{memberName}
														</p>
														<p className="text-xs text-muted-foreground">
															{memberEmail}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell className="text-muted-foreground">
												{item.dueAt
													? new Date(
															item.dueAt
													  ).toLocaleDateString()
													: "N/A"}
											</TableCell>
											<TableCell>
												{getSeverityBadge(daysOverdue)}
											</TableCell>
											<TableCell>
												<span className="font-semibold text-green-600">
													${lateFee.toFixed(2)}
												</span>
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className="gap-1"
												>
													<Clock className="h-3 w-3" />
													Pending
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
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
														<DropdownMenuItem
															onClick={() =>
																handleWaiveFee(
																	item
																)
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
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</Card>
		</div>
	);
}
