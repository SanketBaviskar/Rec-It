"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/hooks/use-toast";
import {
	Search,
	Package,
	CheckCircle2,
	Loader2,
	AlertTriangle,
	Clock,
	RefreshCw,
	User,
} from "lucide-react";
import {
	fetchCheckouts,
	checkinEquipment,
	CheckoutRecord,
} from "@/services/Api/Equipment/checkoutApi";

interface EquipmentManagementProps {
	initialItems?: CheckoutRecord[];
}

export function EquipmentManage({ initialItems }: EquipmentManagementProps) {
	const [checkouts, setCheckouts] = useState<CheckoutRecord[]>(
		initialItems || [],
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(!initialItems);
	const [checkingInId, setCheckingInId] = useState<number | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const { toast } = useToast();

	// Fetch active checkouts from API
	const loadCheckouts = async () => {
		try {
			setIsLoading(true);
			const response = await fetchCheckouts(undefined, true); // active only
			if (response.status === "success" && response.data) {
				// Ensure data is an array
				const responseData = response.data as any;
				const data =
					responseData.data ||
					responseData.items ||
					responseData ||
					[];
				setCheckouts(Array.isArray(data) ? data : []);
			} else {
				setCheckouts([]);
			}
		} catch (error) {
			console.error("Failed to load checkouts:", error);
			setCheckouts([]); // Ensure checkouts is always an array
			toast({
				title: "Error",
				description: "Failed to load active checkouts",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Load on mount
	useEffect(() => {
		if (!initialItems) {
			loadCheckouts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle refresh
	const handleRefresh = async () => {
		setRefreshing(true);
		await loadCheckouts();
		setRefreshing(false);
		toast({
			title: "Refreshed",
			description: "Active loans list updated",
		});
	};

	// Check if item is overdue
	const isOverdue = (dueAt: string | null) => {
		if (!dueAt) return false;
		return new Date(dueAt) < new Date();
	};

	// Check if due today
	const isDueToday = (dueAt: string | null) => {
		if (!dueAt) return false;
		const today = new Date();
		const due = new Date(dueAt);
		return today.toDateString() === due.toDateString();
	};

	// Format date for display
	const formatDate = (dateStr: string | null) => {
		if (!dateStr) return "N/A";
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	// Handle item check-in with real API
	const handleCheckIn = async (checkoutId: number) => {
		setCheckingInId(checkoutId);
		try {
			const response = await checkinEquipment(checkoutId, {
				conditionIn: "good",
			});
			if (response.status === "success") {
				setCheckouts((prev) =>
					prev.filter((checkout) => checkout.id !== checkoutId),
				);
				toast({
					title: "Item Checked In",
					description: "The item has been successfully checked in.",
					variant: "success",
				});
			} else {
				throw new Error(response.message);
			}
		} catch (error) {
			console.error("Check-in failed:", error);
			toast({
				title: "Check-in Failed",
				description: "Please try again.",
				variant: "destructive",
			});
		} finally {
			setCheckingInId(null);
		}
	};

	// Filter checkouts based on search query
	const filteredCheckouts = checkouts.filter((checkout) => {
		const query = searchQuery.toLowerCase();
		const equipmentName =
			checkout.equipmentItem?.equipment?.name?.toLowerCase() || "";
		const serialNumber =
			checkout.equipmentItem?.serialNumber?.toLowerCase() || "";
		const memberName = `${checkout.user?.firstName || ""} ${
			checkout.user?.lastName || ""
		}`.toLowerCase();
		return (
			equipmentName.includes(query) ||
			serialNumber.includes(query) ||
			memberName.includes(query)
		);
	});

	// Get counts
	const overdueCount = checkouts.filter((c) => isOverdue(c.dueAt)).length;
	const dueTodayCount = checkouts.filter((c) => isDueToday(c.dueAt)).length;

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col p-4 gap-4">
			{/* Stats Cards */}
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-primary/10">
							<Package className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Active
							</p>
							<p className="text-2xl font-bold">
								{checkouts.length}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-destructive/10">
							<AlertTriangle className="h-5 w-5 text-destructive" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Overdue
							</p>
							<p className="text-2xl font-bold text-destructive">
								{overdueCount}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-yellow-500/10">
							<Clock className="h-5 w-5 text-yellow-600" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Due Today
							</p>
							<p className="text-2xl font-bold text-yellow-600">
								{dueTodayCount}
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

			{/* Search */}
			<Card>
				<CardContent className="p-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search by item name, serial number, or member..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10"
						/>
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
								<TableHead>Serial/Barcode</TableHead>
								<TableHead>Member</TableHead>
								<TableHead>Checked Out</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredCheckouts.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-12 text-muted-foreground"
									>
										<Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
										<p>No active checkouts found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredCheckouts.map((checkout) => (
									<TableRow
										key={checkout.id}
										className={
											isOverdue(checkout.dueAt)
												? "bg-destructive/5"
												: ""
										}
									>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Package className="h-4 w-4 text-muted-foreground" />
												{checkout.equipmentItem
													?.equipment?.name ||
													"Unknown"}
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground font-mono text-sm">
											{checkout.equipmentItem
												?.serialNumber ||
												checkout.equipmentItem
													?.barcode ||
												"N/A"}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-muted-foreground" />
												{checkout.user
													? `${checkout.user.firstName} ${checkout.user.lastName}`
													: "Unknown"}
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatDate(checkout.checkedOutAt)}
										</TableCell>
										<TableCell>
											{formatDate(checkout.dueAt)}
										</TableCell>
										<TableCell>
											{isOverdue(checkout.dueAt) ? (
												<Badge
													variant="destructive"
													className="gap-1"
												>
													<AlertTriangle className="h-3 w-3" />
													Overdue
												</Badge>
											) : isDueToday(checkout.dueAt) ? (
												<Badge
													variant="secondary"
													className="gap-1 bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
												>
													<Clock className="h-3 w-3" />
													Due Today
												</Badge>
											) : (
												<Badge
													variant="secondary"
													className="gap-1"
												>
													<CheckCircle2 className="h-3 w-3" />
													Active
												</Badge>
											)}
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleCheckIn(checkout.id)
												}
												disabled={
													checkingInId === checkout.id
												}
											>
												{checkingInId ===
												checkout.id ? (
													<Loader2 className="h-4 w-4 animate-spin" />
												) : (
													<>
														<CheckCircle2 className="h-4 w-4 mr-1" />
														Check In
													</>
												)}
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</Card>
			<Toaster />
		</div>
	);
}
