import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Banknote,
	CheckCircle2,
	CreditCard,
	Landmark,
	Loader2,
	Printer,
	Receipt,
	AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import { CartItem } from "../SalesTab";
import { usePOSConfig } from "@/features/admin/components/Operations/POSConfig/usePOSConfig";
import {
	createTransaction,
	TransactionItem,
} from "@/services/Api/Transaction/transactionApi";
import { assignMembershipToUser } from "@/services/Api/Membership/membershipApi";
import { purchasePass } from "@/services/Api/Pass/passApi";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	cart: CartItem[];
	selectedUser: any | null;
	onComplete: () => void;
}

const paymentMethods = [
	{
		id: "cash",
		label: "Cash",
		icon: Banknote,
		description: "Opens cash drawer",
	},
	{
		id: "card",
		label: "Credit/Debit Card",
		icon: CreditCard,
		description: "Swipe or tap card",
	},
	{
		id: "bursar",
		label: "Student Account",
		icon: Landmark,
		description: "Charge to Bursar",
	},
];

export function CheckoutModal({
	isOpen,
	onClose,
	cart,
	selectedUser,
	onComplete,
}: CheckoutModalProps) {
	const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [printReceipt, setPrintReceipt] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [receiptNumber, setReceiptNumber] = useState<string>("");

	const { toast } = useToast();
	const { config } = usePOSConfig();

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	// Calculate tax (only on merchandise/services)
	let taxableAmount = 0;
	if (config.taxEnabled && subtotal > 0) {
		cart.forEach((item) => {
			if (
				item.type === "goods" ||
				item.type === "service" ||
				item.type === "rental"
			) {
				taxableAmount += item.price * item.quantity;
			}
		});
	}
	const tax = taxableAmount * (config.taxRate / 100);
	const total = subtotal + tax;

	const handleComplete = async () => {
		if (!selectedMethod || !selectedUser) return;

		setIsProcessing(true);
		setError(null);

		try {
			// Process memberships and passes first
			const membershipItems = cart.filter(
				(item) => item.type === "membership" && item.membershipId
			);
			const passItems = cart.filter(
				(item) => item.type === "pass" && item.passId
			);

			// Assign memberships
			for (const item of membershipItems) {
				if (item.membershipId) {
					await assignMembershipToUser({
						userId: selectedUser.id,
						membershipId: item.membershipId,
						startDate: new Date().toISOString().split("T")[0],
					});
				}
			}

			// Purchase passes
			for (const item of passItems) {
				if (item.passId) {
					for (let i = 0; i < item.quantity; i++) {
						await purchasePass({
							userId: selectedUser.id,
							passId: item.passId,
						});
					}
				}
			}

			// Create transaction record
			const transactionItems: TransactionItem[] = cart.map((item) => ({
				itemType:
					item.type === "goods" ||
					item.type === "service" ||
					item.type === "rental"
						? item.type
						: item.type,
				itemId: item.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				membershipId: item.membershipId,
				passId: item.passId,
			}));

			const transactionResult = await createTransaction({
				userId: selectedUser.id,
				items: transactionItems,
				subtotal,
				tax,
				total,
				paymentMethod: selectedMethod as "cash" | "card" | "bursar",
			});

			setReceiptNumber(
				transactionResult.transaction?.receiptNumber ||
					Math.random().toString(36).substring(2, 8).toUpperCase()
			);
			setIsComplete(true);

			toast({
				title: "Transaction Complete",
				description: `Successfully charged $${total.toFixed(2)} to ${
					selectedUser.firstName
				}'s account.`,
			});
		} catch (err: any) {
			console.error("Checkout error:", err);

			// Even if transaction API fails, memberships/passes might have been assigned
			// We should still mark as complete but with a warning
			const errorMessage =
				err.response?.data?.message ||
				err.message ||
				"An error occurred";

			if (errorMessage.includes("transaction")) {
				// Transaction recording failed but purchases went through
				setError(
					"Sale completed but transaction record failed to save. Please note the receipt manually."
				);
				setReceiptNumber(
					"MANUAL-" + Date.now().toString(36).toUpperCase()
				);
				setIsComplete(true);
			} else {
				setError(errorMessage);
			}
		} finally {
			setIsProcessing(false);
		}
	};

	const handleClose = () => {
		if (isComplete) {
			onComplete();
		}
		setSelectedMethod(null);
		setIsProcessing(false);
		setIsComplete(false);
		setError(null);
		setReceiptNumber("");
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				{!isComplete ? (
					<>
						<DialogHeader>
							<DialogTitle>Complete Transaction</DialogTitle>
							<DialogDescription>
								{selectedUser
									? `Charging ${selectedUser.firstName} ${selectedUser.lastName}`
									: "Select payment method"}
							</DialogDescription>
						</DialogHeader>

						{/* Order Summary */}
						<div className="bg-muted/30 rounded-lg p-3 space-y-2">
							{cart.map((item) => (
								<div
									key={item.id}
									className="flex justify-between text-sm"
								>
									<span className="text-muted-foreground">
										{item.name} × {item.quantity}
									</span>
									<span>
										$
										{(item.price * item.quantity).toFixed(
											2
										)}
									</span>
								</div>
							))}
							<Separator />
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									Subtotal
								</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							{tax > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Tax
									</span>
									<span>${tax.toFixed(2)}</span>
								</div>
							)}
							<div className="flex justify-between font-bold">
								<span>Total</span>
								<span className="text-primary">
									${total.toFixed(2)}
								</span>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
								<AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
								<p className="text-sm text-red-500">{error}</p>
							</div>
						)}

						{/* Payment Methods */}
						<div className="space-y-2">
							<p className="text-sm font-medium">
								Payment Method
							</p>
							<div className="grid gap-2">
								{paymentMethods.map((method) => (
									<button
										key={method.id}
										onClick={() =>
											setSelectedMethod(method.id)
										}
										disabled={isProcessing}
										className={`
											flex items-center gap-3 p-3 rounded-lg border transition-all
											${
												selectedMethod === method.id
													? "border-primary bg-primary/5 ring-1 ring-primary"
													: "border-border hover:border-primary/50"
											}
											disabled:opacity-50
										`}
									>
										<div
											className={`
												p-2 rounded-md 
												${
													selectedMethod === method.id
														? "bg-primary text-primary-foreground"
														: "bg-muted"
												}
											`}
										>
											<method.icon className="h-5 w-5" />
										</div>
										<div className="text-left">
											<p className="font-medium text-sm">
												{method.label}
											</p>
											<p className="text-xs text-muted-foreground">
												{method.description}
											</p>
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Print Option */}
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="print-receipt"
								checked={printReceipt}
								onChange={(e) =>
									setPrintReceipt(e.target.checked)
								}
								className="rounded"
							/>
							<label
								htmlFor="print-receipt"
								className="text-sm text-muted-foreground flex items-center gap-1"
							>
								<Printer className="h-3.5 w-3.5" />
								Print receipt
							</label>
						</div>

						<DialogFooter>
							<Button
								variant="outline"
								onClick={handleClose}
								disabled={isProcessing}
							>
								Cancel
							</Button>
							<Button
								onClick={handleComplete}
								disabled={!selectedMethod || isProcessing}
								className="min-w-[120px]"
							>
								{isProcessing ? (
									<>
										<Loader2 className="h-4 w-4 mr-2 animate-spin" />
										Processing
									</>
								) : (
									<>Complete</>
								)}
							</Button>
						</DialogFooter>
					</>
				) : (
					<>
						{/* Success State */}
						<div className="py-8 text-center">
							<div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
								<CheckCircle2 className="h-8 w-8 text-emerald-500" />
							</div>
							<h3 className="text-lg font-semibold mb-1">
								Transaction Complete!
							</h3>
							<p className="text-muted-foreground text-sm mb-4">
								${total.toFixed(2)} charged successfully
							</p>
							<Badge
								variant="outline"
								className="bg-emerald-500/10 text-emerald-500 border-0"
							>
								<Receipt className="h-3 w-3 mr-1" />
								Receipt #{receiptNumber}
							</Badge>

							{/* Summary of what was assigned */}
							{cart.some(
								(item) =>
									item.type === "membership" ||
									item.type === "pass"
							) && (
								<div className="mt-4 text-left bg-muted/30 rounded-lg p-3">
									<p className="text-xs font-medium mb-2">
										Assigned to {selectedUser?.firstName}:
									</p>
									{cart
										.filter(
											(item) =>
												item.type === "membership" ||
												item.type === "pass"
										)
										.map((item) => (
											<div
												key={item.id}
												className="text-xs text-muted-foreground"
											>
												• {item.name} ({item.type})
											</div>
										))}
								</div>
							)}
						</div>
						<DialogFooter>
							<Button onClick={handleClose} className="w-full">
								Done
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
