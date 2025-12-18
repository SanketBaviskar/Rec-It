import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
	Package,
	Scan,
	CheckCircle2,
	Trash2,
	AlertTriangle,
	CreditCard,
	Key,
	User,
	Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { MemberEquipment } from "../types";

interface ScannedItem {
	id: string;
	serialNumber: string;
	name: string;
	requiresCollateral: boolean;
	collateralType?: "id_card" | "keys" | "none";
}

interface CheckoutModeProps {
	selectedMember: any;
	memberEquipment: MemberEquipment[];
	isLoading: boolean;
	onCheckIn: (id: string) => void;
	onMemberSelect: (user: any) => void;
}

export function CheckoutMode({
	selectedMember,
	memberEquipment,
	isLoading,
	onCheckIn,
}: CheckoutModeProps) {
	const [scanInput, setScanInput] = useState("");
	const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
	const [collateralDialog, setCollateralDialog] = useState(false);
	const [collateralType, setCollateralType] = useState<string>("id_card");
	const [isProcessing, setIsProcessing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	useEffect(() => {
		if (selectedMember && inputRef.current) {
			inputRef.current.focus();
		}
	}, [selectedMember]);

	const handleScan = async (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && scanInput.trim()) {
			const codeOrSerial = scanInput.trim().toUpperCase();

			if (
				scannedItems.some((item) => item.serialNumber === codeOrSerial)
			) {
				toast({
					title: "Already Scanned",
					description: `${codeOrSerial} is already in checkout list.`,
					variant: "destructive",
				});
				setScanInput("");
				return;
			}

			setIsProcessing(true);

			try {
				// TODO: Replace with actual API call to lookup equipment by code
				// Example: const equipmentData = await lookupEquipmentByCode(codeOrSerial);

				// For now, simulate API call with mock data
				await new Promise((resolve) => setTimeout(resolve, 300));

				// Mock lookup - in production, this would query your equipment database
				// The equipment code is set in admin panel under equipment configuration
				const mockItem: ScannedItem = {
					id: Math.random().toString(36).substring(7),
					serialNumber: codeOrSerial,
					name: getEquipmentNameFromCode(codeOrSerial),
					requiresCollateral:
						codeOrSerial.startsWith("RW") ||
						codeOrSerial.startsWith("KEY"),
					collateralType: codeOrSerial.startsWith("RW")
						? "id_card"
						: codeOrSerial.startsWith("KEY")
						? "keys"
						: "none",
				};

				setScannedItems((prev) => [...prev, mockItem]);
				setScanInput("");

				toast({
					title: "Item Added",
					description: `${mockItem.name} (${codeOrSerial}) added to checkout.`,
				});
			} catch (error) {
				toast({
					title: "Equipment Not Found",
					description: `Code "${codeOrSerial}" not found in system.`,
					variant: "destructive",
				});
				setScanInput("");
			} finally {
				setIsProcessing(false);
			}
		}
	};

	// Helper function to map equipment code to name
	// TODO: Replace with actual database lookup
	const getEquipmentNameFromCode = (code: string): string => {
		// This mapping would come from your equipment database
		// The codes are set by admins in the equipment configuration panel
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
		const prefix = Object.keys(prefixes).find((p) => code.startsWith(p));
		return prefix ? prefixes[prefix] : "Equipment Item";
	};

	const removeItem = (serialNumber: string) => {
		setScannedItems((prev) =>
			prev.filter((item) => item.serialNumber !== serialNumber)
		);
	};

	const handleCheckout = () => {
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
		setScannedItems([]);
		setCollateralDialog(false);
		setIsProcessing(false);
		toast({
			title: "Checkout Complete",
			description: `${scannedItems.length} item(s) checked out successfully.`,
		});
	};

	if (!selectedMember) {
		return (
			<div className="h-full flex items-center justify-center p-8">
				<Card className="max-w-md w-full border-dashed border-2">
					<CardContent className="p-12 text-center space-y-4">
						<div className="h-20 w-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
							<User className="h-10 w-10 text-primary/60" />
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-1">
								No Member Selected
							</h3>
							<p className="text-sm text-muted-foreground">
								Search for a member in the header to begin
								checkout
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="h-full grid grid-cols-12 gap-4 p-4">
			{/* Left: Equipment Browser */}
			<div className="col-span-4 flex flex-col gap-4">
				<Card className="flex-1 overflow-hidden">
					<CardContent className="p-4 h-full flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold flex items-center gap-2">
								<Package className="h-4 w-4 text-primary" />
								Available Equipment
							</h3>
						</div>

						<ScrollArea className="flex-1 -mx-4 px-4">
							<div className="space-y-2">
								{/* Mock equipment data - Replace with real API call */}
								{[
									{
										code: "BB001",
										name: "Basketball",
										available: 5,
										total: 10,
									},
									{
										code: "VB001",
										name: "Volleyball",
										available: 3,
										total: 8,
									},
									{
										code: "FB001",
										name: "Football",
										available: 2,
										total: 5,
									},
									{
										code: "YM001",
										name: "Yoga Mat",
										available: 8,
										total: 15,
									},
									{
										code: "RW001",
										name: "Climbing Harness",
										available: 1,
										total: 4,
										collateral: true,
									},
									{
										code: "KEY001",
										name: "Locker Key #1",
										available: 1,
										total: 1,
										collateral: true,
									},
									{
										code: "KEY002",
										name: "Locker Key #2",
										available: 1,
										total: 1,
										collateral: true,
									},
									{
										code: "TB001",
										name: "Tennis Ball",
										available: 12,
										total: 20,
									},
									{
										code: "BAD001",
										name: "Badminton Racket",
										available: 4,
										total: 6,
									},
								].map((item) => {
									const isScanned = scannedItems.some(
										(scanned) =>
											scanned.serialNumber === item.code
									);
									const isAvailable = item.available > 0;

									return (
										<button
											key={item.code}
											onClick={() => {
												if (!isAvailable || isScanned)
													return;
												// Simulate adding item
												setScanInput(item.code);
												handleScan({
													key: "Enter",
												} as React.KeyboardEvent);
											}}
											disabled={!isAvailable || isScanned}
											className={`w-full text-left p-3 rounded-lg border transition-all ${
												isScanned
													? "bg-muted/30 border-muted opacity-50 cursor-not-allowed"
													: isAvailable
													? "bg-card hover:bg-primary/5 hover:border-primary/50 cursor-pointer"
													: "bg-muted/30 border-muted opacity-50 cursor-not-allowed"
											}`}
										>
											<div className="flex items-center justify-between mb-1">
												<span className="font-medium text-sm">
													{item.name}
												</span>
												<Badge
													variant={
														isScanned
															? "secondary"
															: isAvailable
															? "default"
															: "outline"
													}
													className="text-xs"
												>
													{isScanned
														? "Added"
														: `${item.available}/${item.total}`}
												</Badge>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-xs text-muted-foreground font-mono">
													{item.code}
												</span>
												{item.collateral && (
													<Badge
														variant="secondary"
														className="text-xs gap-1"
													>
														<CreditCard className="h-2.5 w-2.5" />
														ID
													</Badge>
												)}
											</div>
										</button>
									);
								})}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>

			{/* Center: Scan Input + Checkout List */}
			<div className="col-span-5 flex flex-col gap-4">
				<Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
								<Scan className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h3 className="font-semibold">Quick Scan</h3>
								<p className="text-sm text-muted-foreground">
									Scan barcodes or click equipment →
								</p>
							</div>
						</div>
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
								className="pl-10 h-12 text-lg font-mono bg-background"
								disabled={isProcessing}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Scanned Items */}
				<Card className="flex-1 overflow-hidden">
					<CardContent className="p-4 h-full flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-primary" />
								Checkout List ({scannedItems.length})
							</h3>
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

						<ScrollArea className="flex-1 -mx-4 px-4">
							{scannedItems.length === 0 ? (
								<div className="text-center py-12 text-muted-foreground">
									<Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
									<p>No items selected</p>
									<p className="text-sm mt-1">
										Click equipment or scan barcode
									</p>
								</div>
							) : (
								<div className="space-y-2">
									{scannedItems.map((item) => (
										<div
											key={item.serialNumber}
											className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border hover:border-primary/30 transition-colors group"
										>
											<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
												className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
												onClick={() =>
													removeItem(
														item.serialNumber
													)
												}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</div>
									))}
								</div>
							)}
						</ScrollArea>

						{scannedItems.length > 0 && (
							<Button
								size="lg"
								className="w-full mt-4 h-12"
								onClick={handleCheckout}
								disabled={isProcessing}
							>
								<CheckCircle2 className="h-5 w-5 mr-2" />
								Complete Checkout ({scannedItems.length} items)
							</Button>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Right: Member's Active Checkouts */}
			<div className="col-span-3">
				<Card className="h-full overflow-hidden">
					<CardContent className="p-4 h-full flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold">Active Checkouts</h3>
							<Badge variant="outline">
								{memberEquipment.length} items
							</Badge>
						</div>

						<ScrollArea className="flex-1 -mx-4 px-4">
							{memberEquipment.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">
									<Package className="h-10 w-10 mx-auto mb-2 opacity-40" />
									<p className="text-sm">
										No active checkouts
									</p>
								</div>
							) : (
								<div className="space-y-2">
									{memberEquipment.map((item) => (
										<div
											key={item.id}
											className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
										>
											<div className="flex items-start justify-between mb-2">
												<p className="font-medium">
													{item.name}
												</p>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														onCheckIn(item.id)
													}
													className="h-7 text-xs"
												>
													<CheckCircle2 className="h-3 w-3 mr-1" />
													Return
												</Button>
											</div>
											<p className="text-xs text-muted-foreground font-mono mb-1">
												{item.itemId}
											</p>
											<p className="text-xs text-muted-foreground">
												Due: {item.dueDate}
											</p>
										</div>
									))}
								</div>
							)}
						</ScrollArea>
					</CardContent>
				</Card>
			</div>

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
							Some items require collateral. Please collect:
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
							Confirm Collected
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
