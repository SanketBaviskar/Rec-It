import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
	User,
	Package,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	CreditCard,
	Key,
	Clock,
	Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

interface ScannedItem {
	id: string;
	serialNumber: string;
	name: string;
	requiresCollateral: boolean;
	collateralType?: "id_card" | "keys" | "none";
}

interface SelectedMember {
	id: string;
	firstName: string;
	lastName: string;
	studentId?: string;
	membershipType: string;
	hasBlocks?: boolean;
	blockReason?: string;
}

interface QuickScanCheckoutProps {
	selectedMember: SelectedMember | null;
	onCheckoutComplete: (items: ScannedItem[], collateral: string) => void;
}

export function QuickScanCheckout({
	selectedMember,
	onCheckoutComplete,
}: QuickScanCheckoutProps) {
	const [scanInput, setScanInput] = useState("");
	const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
	const [collateralDialog, setCollateralDialog] = useState(false);
	const [collateralType, setCollateralType] = useState<string>("id_card");
	const [isProcessing, setIsProcessing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	// Auto-focus on the scan input
	useEffect(() => {
		if (selectedMember && inputRef.current) {
			inputRef.current.focus();
		}
	}, [selectedMember]);

	// Simulate scanning an item
	const handleScan = async (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && scanInput.trim()) {
			const serialNumber = scanInput.trim().toUpperCase();

			// Check if already scanned
			if (
				scannedItems.some((item) => item.serialNumber === serialNumber)
			) {
				toast({
					title: "Already Scanned",
					description: `${serialNumber} is already in your checkout list.`,
					variant: "destructive",
				});
				setScanInput("");
				return;
			}

			// Simulate API lookup
			setIsProcessing(true);
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Mock equipment lookup - in production, this would call the API
			const mockItem: ScannedItem = {
				id: Math.random().toString(36).substring(7),
				serialNumber,
				name: getEquipmentNameFromSerial(serialNumber),
				requiresCollateral:
					serialNumber.startsWith("RW") ||
					serialNumber.startsWith("KEY"),
				collateralType: serialNumber.startsWith("RW")
					? "id_card"
					: serialNumber.startsWith("KEY")
					? "keys"
					: "none",
			};

			setScannedItems((prev) => [...prev, mockItem]);
			setScanInput("");
			setIsProcessing(false);

			// Play success sound (simulated)
			toast({
				title: "Item Scanned",
				description: `${mockItem.name} (${mockItem.serialNumber}) added.`,
			});
		}
	};

	// Mock function to get equipment name from serial
	const getEquipmentNameFromSerial = (serial: string): string => {
		const prefixes: Record<string, string> = {
			BB: "Basketball",
			VB: "Volleyball",
			FB: "Football",
			TB: "Tennis Ball",
			RW: "Climbing Harness",
			YM: "Yoga Mat",
			KEY: "Locker Key",
			BAD: "Badminton Racket",
		};
		const prefix = Object.keys(prefixes).find((p) => serial.startsWith(p));
		return prefix ? prefixes[prefix] : "Equipment Item";
	};

	const removeItem = (serialNumber: string) => {
		setScannedItems((prev) =>
			prev.filter((item) => item.serialNumber !== serialNumber)
		);
	};

	const handleCheckout = () => {
		// Check if any items require collateral
		const requiresCollateral = scannedItems.some(
			(item) => item.requiresCollateral
		);

		if (requiresCollateral) {
			setCollateralDialog(true);
		} else {
			processCheckout("none");
		}
	};

	const processCheckout = async (collateral: string) => {
		setIsProcessing(true);
		await new Promise((resolve) => setTimeout(resolve, 500));

		onCheckoutComplete(scannedItems, collateral);
		setScannedItems([]);
		setCollateralDialog(false);
		setIsProcessing(false);

		toast({
			title: "Checkout Complete",
			description: `${scannedItems.length} item(s) checked out successfully.`,
			variant: "default",
		});
	};

	if (!selectedMember) {
		return (
			<Card className="h-full flex items-center justify-center">
				<CardContent className="text-center py-12">
					<User className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40" />
					<h2 className="text-xl font-semibold mb-2">
						No Member Selected
					</h2>
					<p className="text-muted-foreground">
						Search and select a member to start checkout
					</p>
				</CardContent>
			</Card>
		);
	}

	// Check if member has blocks
	if (selectedMember.hasBlocks) {
		return (
			<Card className="h-full">
				<CardContent className="p-8 text-center">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
						<XCircle className="h-10 w-10 text-destructive" />
					</div>
					<h2 className="text-xl font-semibold text-destructive mb-2">
						Equipment Checkout Blocked
					</h2>
					<p className="text-muted-foreground mb-4">
						{selectedMember.blockReason ||
							"This member has an active block on equipment checkout."}
					</p>
					<Badge variant="destructive" className="text-sm">
						Please see front desk supervisor
					</Badge>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="h-full flex flex-col p-4 gap-4">
			{/* Member Card */}
			<Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
				<CardContent className="p-4 flex items-center gap-4">
					<div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
						{selectedMember.firstName.charAt(0)}
						{selectedMember.lastName.charAt(0)}
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-lg">
							{selectedMember.firstName} {selectedMember.lastName}
						</h3>
						<p className="text-sm text-muted-foreground">
							ID: {selectedMember.studentId || "N/A"}
						</p>
					</div>
					<Badge variant="default" className="text-sm">
						<CheckCircle2 className="h-3 w-3 mr-1" />
						Eligible
					</Badge>
				</CardContent>
			</Card>

			{/* Scan Input */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Scan className="h-5 w-5" />
						Quick Scan Checkout
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="relative">
						<Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<Input
							ref={inputRef}
							type="text"
							placeholder="Scan equipment barcode or type serial number..."
							value={scanInput}
							onChange={(e) =>
								setScanInput(e.target.value.toUpperCase())
							}
							onKeyDown={handleScan}
							className="pl-10 text-lg h-12 font-mono"
							disabled={isProcessing}
						/>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						Press ENTER after scanning or typing a serial number
					</p>
				</CardContent>
			</Card>

			{/* Scanned Items */}
			<Card className="flex-1 overflow-hidden">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">
							Scanned Items ({scannedItems.length})
						</CardTitle>
						{scannedItems.length > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setScannedItems([])}
								className="text-muted-foreground"
							>
								Clear All
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent className="overflow-y-auto max-h-[300px]">
					{scannedItems.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							<Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
							<p>No items scanned yet</p>
							<p className="text-sm mt-1">
								Scan equipment barcodes to add items
							</p>
						</div>
					) : (
						<div className="space-y-2">
							{scannedItems.map((item) => (
								<div
									key={item.serialNumber}
									className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border"
								>
									<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
										<Package className="h-5 w-5 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium">
											{item.name}
										</p>
										<p className="text-sm text-muted-foreground font-mono">
											{item.serialNumber}
										</p>
									</div>
									{item.requiresCollateral && (
										<Badge
											variant="secondary"
											className="gap-1 shrink-0"
										>
											{item.collateralType ===
											"id_card" ? (
												<CreditCard className="h-3 w-3" />
											) : (
												<Key className="h-3 w-3" />
											)}
											Collateral
										</Badge>
									)}
									<Button
										variant="ghost"
										size="icon"
										className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
										onClick={() =>
											removeItem(item.serialNumber)
										}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Checkout Button */}
			<Button
				size="lg"
				className="w-full h-14 text-lg"
				disabled={scannedItems.length === 0 || isProcessing}
				onClick={handleCheckout}
			>
				<CheckCircle2 className="h-5 w-5 mr-2" />
				Complete Checkout ({scannedItems.length} items)
			</Button>

			{/* Collateral Dialog */}
			<Dialog open={collateralDialog} onOpenChange={setCollateralDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-amber-500" />
							Collateral Required
						</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<p className="text-muted-foreground mb-4">
							Some items require collateral. Please collect from
							the member:
						</p>
						<Select
							value={collateralType}
							onValueChange={setCollateralType}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="id_card">
									<div className="flex items-center gap-2">
										<CreditCard className="h-4 w-4" />
										Student ID Card
									</div>
								</SelectItem>
								<SelectItem value="keys">
									<div className="flex items-center gap-2">
										<Key className="h-4 w-4" />
										Keys / Personal Item
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
						<div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
							<p className="text-sm text-amber-700 dark:text-amber-400">
								<AlertTriangle className="h-4 w-4 inline mr-1" />
								Remember to return collateral when items are
								checked in!
							</p>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setCollateralDialog(false)}
						>
							Cancel
						</Button>
						<Button onClick={() => processCheckout(collateralType)}>
							<CheckCircle2 className="h-4 w-4 mr-2" />
							Confirm Collateral Collected
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
