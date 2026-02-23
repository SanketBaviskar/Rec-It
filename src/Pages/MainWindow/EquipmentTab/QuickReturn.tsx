import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CheckCircle2,
	Package,
	CreditCard,
	Key,
	AlertTriangle,
	User,
	Search,
	RefreshCw,
	Loader2,
	LogOut,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import {
	fetchCheckouts,
	checkinEquipment,
	CheckoutRecord,
} from "@/services/Api/Equipment/checkoutApi";

type ConditionRating = "excellent" | "good" | "fair" | "damaged";

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
		(now.getTime() - due.getTime()) / (1000 * 60 * 60),
	);
	return Math.min(50, diffHours * 2.5);
};

interface ReturnItem {
	checkoutId: number;
	serialNumber: string;
	name: string;
	memberName: string;
	memberId: string;
	checkedOutAt: string;
	dueAt: string;
	isOverdue: boolean;
	daysOverdue: number;
	lateFee: number;
	hasCollateral: boolean;
	collateralType: "id_card" | "keys" | "none";
}

interface QuickReturnProps {
	onReturnComplete: (
		item: ReturnItem,
		condition: ConditionRating,
		notes: string,
	) => void;
}

export function QuickReturn({ onReturnComplete }: QuickReturnProps) {
	const [scannedItem, setScannedItem] = useState<ReturnItem | null>(null);
	const [conditionDialog, setConditionDialog] = useState(false);
	const [condition, setCondition] = useState<ConditionRating>("good");
	const [damageNotes, setDamageNotes] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [activeCheckouts, setActiveCheckouts] = useState<CheckoutRecord[]>(
		[],
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const { toast } = useToast();

	// Fetch active checkouts from API
	const loadActiveCheckouts = async () => {
		try {
			const response = await fetchCheckouts(undefined, true);
			if (response.status === "success" && response.data) {
				const responseData = response.data as any;
				const data =
					responseData.data ||
					responseData.items ||
					responseData ||
					[];
				setActiveCheckouts(Array.isArray(data) ? data : []);
			} else {
				setActiveCheckouts([]);
			}
		} catch (error) {
			console.error("Failed to load checkouts:", error);
			setActiveCheckouts([]);
		} finally {
			setIsLoading(false);
		}
	};

	// Load on mount
	useEffect(() => {
		loadActiveCheckouts();
	}, []);

	// Handle refresh
	const handleRefresh = async () => {
		setRefreshing(true);
		await loadActiveCheckouts();
		setRefreshing(false);
	};

	// Select item from table for return
	const selectItemForReturn = (checkout: CheckoutRecord) => {
		const daysOverdue = calculateDaysOverdue(checkout.dueAt);
		const lateFee = calculateLateFee(checkout.dueAt);
		const equipment = checkout.equipmentItem?.equipment;
		const user = checkout.user;
		const serialNumber =
			checkout.equipmentItem?.serialNumber ||
			checkout.equipmentItem?.barcode ||
			"";

		const returnItem: ReturnItem = {
			checkoutId: checkout.id,
			serialNumber,
			name: equipment?.name || "Equipment Item",
			memberName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
			memberId: user?.id?.toString() || "",
			checkedOutAt: checkout.checkedOutAt,
			dueAt: checkout.dueAt || new Date().toISOString(),
			isOverdue: daysOverdue > 0,
			daysOverdue,
			lateFee,
			hasCollateral:
				serialNumber.startsWith("RW") || serialNumber.startsWith("KEY"),
			collateralType: serialNumber.startsWith("RW")
				? "id_card"
				: serialNumber.startsWith("KEY")
					? "keys"
					: "none",
		};

		setScannedItem(returnItem);
		setConditionDialog(true);
	};

	// Filter checkouts based on search
	const filteredCheckouts = activeCheckouts.filter((checkout) => {
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

	const handleReturn = async () => {
		if (!scannedItem) return;

		setIsProcessing(true);
		try {
			const response = await checkinEquipment(scannedItem.checkoutId, {
				conditionIn: condition,
				notes: damageNotes || undefined,
			});

			if (response.status === "success") {
				onReturnComplete(scannedItem, condition, damageNotes);

				// Show appropriate toast
				if (scannedItem.isOverdue) {
					toast({
						title: "Item Returned - Late Fee Applied",
						description: `${
							scannedItem.name
						} returned. Late fee: $${scannedItem.lateFee.toFixed(
							2,
						)}`,
						variant: "destructive",
					});
				} else {
					toast({
						title: "Item Returned Successfully",
						description: `${scannedItem.name} (${scannedItem.serialNumber}) has been checked in.`,
					});
				}

				// Show collateral reminder
				if (scannedItem.hasCollateral) {
					setTimeout(() => {
						toast({
							title: "Remember Collateral!",
							description: `Return the member's ${
								scannedItem.collateralType === "id_card"
									? "Student ID Card"
									: "Keys/Personal Item"
							}`,
						});
					}, 500);
				}

				// Refresh the active checkouts list
				await loadActiveCheckouts();
			} else {
				throw new Error(response.message);
			}
		} catch (error) {
			console.error("Check-in failed:", error);
			toast({
				title: "Check-in Failed",
				description: "Unable to process return. Please try again.",
				variant: "destructive",
			});
		} finally {
			setConditionDialog(false);
			setScannedItem(null);
			setCondition("good");
			setDamageNotes("");
			setIsProcessing(false);
			setIsProcessing(false);
		}
	};

	return (
		<div className="h-full flex flex-col p-4 gap-4 overflow-hidden">
			{/* Active Checkouts Table */}
			<Card className="flex-1 flex flex-col overflow-hidden">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">
							Active Checkouts ({activeCheckouts.length})
						</CardTitle>
						<div className="flex items-center gap-2">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Search equipment, member..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="pl-9 w-64"
								/>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={handleRefresh}
								disabled={refreshing}
							>
								<RefreshCw
									className={`h-4 w-4 ${
										refreshing ? "animate-spin" : ""
									}`}
								/>
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex-1 overflow-auto">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : filteredCheckouts.length === 0 ? (
						<div className="text-center py-12 text-muted-foreground">
							<Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
							<p>No active checkouts found</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Equipment</TableHead>
									<TableHead>Serial/Barcode</TableHead>
									<TableHead>Member</TableHead>
									<TableHead>Due Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredCheckouts.map((checkout) => {
									const daysOverdue = calculateDaysOverdue(
										checkout.dueAt,
									);
									const isOverdueItem = daysOverdue > 0;

									return (
										<TableRow
											key={checkout.id}
											className={
												isOverdueItem
													? "bg-destructive/5"
													: ""
											}
										>
											<TableCell className="font-medium">
												{checkout.equipmentItem
													?.equipment?.name ||
													"Unknown"}
											</TableCell>
											<TableCell className="font-mono text-sm text-muted-foreground">
												{checkout.equipmentItem
													?.serialNumber ||
													checkout.equipmentItem
														?.barcode ||
													"N/A"}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
														<User className="h-3.5 w-3.5 text-muted-foreground" />
													</div>
													<span>
														{checkout.user
															? `${checkout.user.firstName} ${checkout.user.lastName}`
															: "Unknown"}
													</span>
												</div>
											</TableCell>
											<TableCell>
												{checkout.dueAt
													? new Date(
															checkout.dueAt,
														).toLocaleDateString()
													: "N/A"}
											</TableCell>
											<TableCell>
												{isOverdueItem ? (
													<Badge
														variant="destructive"
														className="gap-1"
													>
														<AlertTriangle className="h-3 w-3" />
														{daysOverdue}d overdue
													</Badge>
												) : (
													<Badge variant="secondary">
														Active
													</Badge>
												)}
											</TableCell>
											<TableCell className="text-right">
												<Button
													size="sm"
													onClick={() =>
														selectItemForReturn(
															checkout,
														)
													}
													disabled={isProcessing}
												>
													<LogOut className="h-4 w-4 mr-1" />
													Check In
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{/* Condition Assessment Dialog */}
			<Dialog open={conditionDialog} onOpenChange={setConditionDialog}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>Return Item Assessment</DialogTitle>
					</DialogHeader>

					{scannedItem && (
						<div className="space-y-4 py-4">
							{/* Item Info */}
							<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
								<div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
									<Package className="h-6 w-6 text-primary" />
								</div>
								<div className="flex-1">
									<p className="font-semibold">
										{scannedItem.name}
									</p>
									<p className="text-sm text-muted-foreground font-mono">
										{scannedItem.serialNumber}
									</p>
								</div>
							</div>

							{/* Member Info */}
							<div className="flex items-center gap-3 p-3 rounded-lg border">
								<User className="h-5 w-5 text-muted-foreground" />
								<div className="flex-1">
									<p className="text-sm font-medium">
										{scannedItem.memberName}
									</p>
									<p className="text-xs text-muted-foreground">
										ID: {scannedItem.memberId}
									</p>
								</div>
							</div>

							{/* Overdue Warning */}
							{scannedItem.isOverdue && (
								<div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
									<div className="flex items-center gap-3">
										<AlertTriangle className="h-5 w-5 text-destructive" />
										<div className="flex-1">
											<p className="font-medium text-destructive">
												Overdue by{" "}
												{scannedItem.daysOverdue} day(s)
											</p>
											<p className="text-sm text-destructive/80">
												Late Fee: $
												{scannedItem.lateFee.toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Collateral Reminder */}
							{scannedItem.hasCollateral && (
								<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
									<div className="flex items-center gap-3">
										{scannedItem.collateralType ===
										"id_card" ? (
											<CreditCard className="h-5 w-5 text-amber-600" />
										) : (
											<Key className="h-5 w-5 text-amber-600" />
										)}
										<div>
											<p className="font-medium text-amber-700 dark:text-amber-400">
												Return Collateral
											</p>
											<p className="text-sm text-amber-600">
												{scannedItem.collateralType ===
												"id_card"
													? "Return Student ID Card to member"
													: "Return Keys/Personal Item to member"}
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Condition Rating */}
							<div className="space-y-2">
								<Label>Equipment Condition</Label>
								<Select
									value={condition}
									onValueChange={(v) =>
										setCondition(v as ConditionRating)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="excellent">
											<div className="flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-green-500" />
												Excellent - Like New
											</div>
										</SelectItem>
										<SelectItem value="good">
											<div className="flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-blue-500" />
												Good - Normal Wear
											</div>
										</SelectItem>
										<SelectItem value="fair">
											<div className="flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-yellow-500" />
												Fair - Minor Issues
											</div>
										</SelectItem>
										<SelectItem value="damaged">
											<div className="flex items-center gap-2">
												<div className="h-3 w-3 rounded-full bg-red-500" />
												Damaged - Needs Repair
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Damage Notes */}
							{(condition === "fair" ||
								condition === "damaged") && (
								<div className="space-y-2">
									<Label>Damage Notes</Label>
									<Textarea
										placeholder="Describe the damage or issues..."
										value={damageNotes}
										onChange={(e) =>
											setDamageNotes(e.target.value)
										}
										rows={3}
									/>
								</div>
							)}
						</div>
					)}

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setConditionDialog(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleReturn} disabled={isProcessing}>
							<CheckCircle2 className="h-4 w-4 mr-2" />
							Complete Return
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
