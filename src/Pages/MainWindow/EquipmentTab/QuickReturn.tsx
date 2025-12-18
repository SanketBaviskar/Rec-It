import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
	Scan,
	CheckCircle2,
	Package,
	CreditCard,
	Key,
	AlertTriangle,
	User,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

type ConditionRating = "excellent" | "good" | "fair" | "damaged";

interface ReturnItem {
	id: string;
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
		notes: string
	) => void;
}

export function QuickReturn({ onReturnComplete }: QuickReturnProps) {
	const [scanInput, setScanInput] = useState("");
	const [scannedItem, setScannedItem] = useState<ReturnItem | null>(null);
	const [conditionDialog, setConditionDialog] = useState(false);
	const [condition, setCondition] = useState<ConditionRating>("good");
	const [damageNotes, setDamageNotes] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	// Auto-focus on mount
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// Simulate scanning for return
	const handleScan = async (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && scanInput.trim()) {
			const serialNumber = scanInput.trim().toUpperCase();

			setIsProcessing(true);
			await new Promise((resolve) => setTimeout(resolve, 400));

			// Mock lookup - in production this would query the API
			const mockItem: ReturnItem = {
				id: Math.random().toString(36).substring(7),
				serialNumber,
				name: getEquipmentNameFromSerial(serialNumber),
				memberName: "John Doe",
				memberId: "12345",
				checkedOutAt: new Date(
					Date.now() - 3 * 24 * 60 * 60 * 1000
				).toISOString(),
				dueAt: new Date(
					Date.now() - 1 * 24 * 60 * 60 * 1000
				).toISOString(),
				isOverdue: serialNumber.includes("1"), // Demo: odd numbers are overdue
				daysOverdue: serialNumber.includes("1") ? 2 : 0,
				lateFee: serialNumber.includes("1") ? 5.0 : 0,
				hasCollateral:
					serialNumber.startsWith("RW") ||
					serialNumber.startsWith("KEY"),
				collateralType: serialNumber.startsWith("RW")
					? "id_card"
					: serialNumber.startsWith("KEY")
					? "keys"
					: "none",
			};

			setScannedItem(mockItem);
			setConditionDialog(true);
			setScanInput("");
			setIsProcessing(false);
		}
	};

	const getEquipmentNameFromSerial = (serial: string): string => {
		const prefixes: Record<string, string> = {
			BB: "Basketball",
			VB: "Volleyball",
			FB: "Football",
			RW: "Climbing Harness",
			YM: "Yoga Mat",
			KEY: "Locker Key",
		};
		const prefix = Object.keys(prefixes).find((p) => serial.startsWith(p));
		return prefix ? prefixes[prefix] : "Equipment Item";
	};

	const handleReturn = async () => {
		if (!scannedItem) return;

		setIsProcessing(true);
		await new Promise((resolve) => setTimeout(resolve, 500));

		onReturnComplete(scannedItem, condition, damageNotes);

		// Show appropriate toast
		if (scannedItem.isOverdue) {
			toast({
				title: "Item Returned - Late Fee Applied",
				description: `${
					scannedItem.name
				} returned. Late fee: $${scannedItem.lateFee.toFixed(2)}`,
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

		setConditionDialog(false);
		setScannedItem(null);
		setCondition("good");
		setDamageNotes("");
		setIsProcessing(false);

		// Refocus input
		inputRef.current?.focus();
	};

	return (
		<div className="h-full flex flex-col p-4 gap-4">
			{/* Header */}
			<Card className="bg-gradient-to-r from-green-500/5 to-green-500/10 border-green-500/20">
				<CardContent className="p-4">
					<div className="flex items-center gap-4">
						<div className="h-14 w-14 rounded-full bg-green-500/20 flex items-center justify-center">
							<CheckCircle2 className="h-7 w-7 text-green-600" />
						</div>
						<div>
							<h2 className="text-xl font-semibold">
								Quick Return
							</h2>
							<p className="text-muted-foreground">
								Scan equipment barcodes to process returns
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Scan Input */}
			<Card className="flex-1">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Scan className="h-5 w-5" />
						Scan Equipment to Return
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="relative">
						<Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<Input
							ref={inputRef}
							type="text"
							placeholder="Scan equipment barcode..."
							value={scanInput}
							onChange={(e) =>
								setScanInput(e.target.value.toUpperCase())
							}
							onKeyDown={handleScan}
							className="pl-10 text-xl h-14 font-mono"
							disabled={isProcessing}
						/>
					</div>

					{/* Visual Feedback Area */}
					<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
						<div className="h-24 w-24 rounded-full border-4 border-dashed border-muted flex items-center justify-center mb-4">
							<Scan className="h-10 w-10 opacity-50" />
						</div>
						<p className="text-lg">Waiting for scan...</p>
						<p className="text-sm mt-1">
							Scan an equipment barcode to process a return
						</p>
					</div>
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
