"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

interface EquipmentItem {
	id: number;
	name: string;
	itemNumber: string;
	checkedOutBy: string;
	checkedOutDate: string;
	dueDate: string;
}

interface EquipmentManagementProps {
	initialItems: EquipmentItem[];
}

export function EquipmentManage({ initialItems }: EquipmentManagementProps) {
	const [checkedOutItems, setCheckedOutItems] =
		useState<EquipmentItem[]>(initialItems);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredItems, setFilteredItems] =
		useState<EquipmentItem[]>(initialItems);
	const [checkingInId, setCheckingInId] = useState<number | null>(null);

	const { toast } = useToast();

	// Check if item is overdue
	const isOverdue = (dueDate: string) => {
		return new Date(dueDate) < new Date();
	};

	// Check if due today
	const isDueToday = (dueDate: string) => {
		const today = new Date();
		const due = new Date(dueDate);
		return today.toDateString() === due.toDateString();
	};

	// Handle item check-in
	const handleCheckIn = async (id: number) => {
		setCheckingInId(id);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			setCheckedOutItems((prevItems) =>
				prevItems.filter((item) => item.id !== id)
			);
			toast({
				title: "Item Checked In",
				description: "The item has been successfully checked in.",
			});
		} catch (error) {
			toast({
				title: "Check-in Failed",
				description: "Please try again.",
				variant: "destructive",
			});
		} finally {
			setCheckingInId(null);
		}
	};

	// Filter items based on the search query
	useEffect(() => {
		const lowercasedQuery = searchQuery.toLowerCase();
		const filtered = checkedOutItems.filter(
			(item) =>
				item.name.toLowerCase().includes(lowercasedQuery) ||
				item.itemNumber.toLowerCase().includes(lowercasedQuery) ||
				item.checkedOutBy.toLowerCase().includes(lowercasedQuery)
		);
		setFilteredItems(filtered);
	}, [searchQuery, checkedOutItems]);

	// Get counts
	const overdueCount = checkedOutItems.filter((item) =>
		isOverdue(item.dueDate)
	).length;
	const dueTodayCount = checkedOutItems.filter((item) =>
		isDueToday(item.dueDate)
	).length;

	return (
		<div className="h-full flex flex-col p-4 gap-4">
			{/* Stats Cards */}
			<div className="grid grid-cols-3 gap-4">
				<Card>
					<CardContent className="p-4 flex items-center gap-4">
						<div className="p-3 rounded-full bg-primary/10">
							<Package className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Checked Out
							</p>
							<p className="text-2xl font-bold">
								{checkedOutItems.length}
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
			</div>

			{/* Search */}
			<Card>
				<CardContent className="p-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search by item name, number, or member..."
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
								<TableHead>Item Name</TableHead>
								<TableHead>Item Number</TableHead>
								<TableHead>Checked Out By</TableHead>
								<TableHead>Checked Out Date</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredItems.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-12 text-muted-foreground"
									>
										<Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
										<p>No checked out items found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredItems.map((item) => (
									<TableRow
										key={item.id}
										className={
											isOverdue(item.dueDate)
												? "bg-destructive/5"
												: ""
										}
									>
										<TableCell className="font-medium">
											{item.name}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{item.itemNumber}
										</TableCell>
										<TableCell>
											{item.checkedOutBy}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{item.checkedOutDate}
										</TableCell>
										<TableCell>{item.dueDate}</TableCell>
										<TableCell>
											{isOverdue(item.dueDate) ? (
												<Badge
													variant="destructive"
													className="gap-1"
												>
													<AlertTriangle className="h-3 w-3" />
													Overdue
												</Badge>
											) : isDueToday(item.dueDate) ? (
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
													handleCheckIn(item.id)
												}
												disabled={
													checkingInId === item.id
												}
											>
												{checkingInId === item.id ? (
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
