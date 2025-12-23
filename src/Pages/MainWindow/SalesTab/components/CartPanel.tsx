import {
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
	CreditCard,
	AlertTriangle,
	Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProrationWidget } from "./ProrationWidget";
import { CartItem } from "../SalesTab";
import { usePOSConfig } from "@/features/admin/components/Operations/POSConfig/usePOSConfig";

interface CartPanelProps {
	cart: CartItem[];
	onUpdateQuantity: (itemId: string, delta: number) => void;
	onRemoveItem: (itemId: string) => void;
	onCheckout: () => void;
	selectedUser: any | null;
}

export function CartPanel({
	cart,
	onUpdateQuantity,
	onRemoveItem,
	onCheckout,
	selectedUser,
}: CartPanelProps) {
	const { config } = usePOSConfig();

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	// Calculate tax based on config
	// For now, only apply tax to merchandise/services, not memberships/passes
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

	const hasCollateralItems = cart.some((item) => item.requiresCollateral);
	const hasMembershipItems = cart.some((item) => item.type === "membership");
	const hasPassItems = cart.some((item) => item.type === "pass");

	// Mock dates for proration demo
	const semesterStart = new Date("2024-08-26");
	const semesterEnd = new Date("2024-12-15");
	const today = new Date();

	const getTypeColor = (type: string) => {
		switch (type) {
			case "membership":
				return "bg-indigo-50 text-indigo-700";
			case "pass":
				return "bg-teal-50 text-teal-700";
			case "goods":
				return "bg-slate-50 text-slate-700";
			case "service":
				return "bg-purple-50 text-purple-700";
			case "rental":
				return "bg-orange-50 text-orange-700";
			default:
				return "bg-gray-50 text-gray-700";
		}
	};

	return (
		<Card className="h-full border bg-card shadow-sm flex flex-col rounded-xl overflow-hidden">
			<CardHeader className="pb-2">
				<CardTitle className="text-sm font-medium flex items-center gap-2">
					<ShoppingCart className="h-4 w-4" />
					Transaction
					{cart.length > 0 && (
						<Badge variant="secondary" className="ml-auto">
							{cart.length} item{cart.length !== 1 ? "s" : ""}
						</Badge>
					)}
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 flex flex-col overflow-hidden p-4 pt-0">
				{/* Cart Items */}
				<div className="flex-1 overflow-auto space-y-2 pr-1">
					{cart.length === 0 ? (
						<div className="h-full flex flex-col items-center justify-center text-muted-foreground">
							<ShoppingCart className="h-10 w-10 mb-2 opacity-30" />
							<p className="text-sm">Cart is empty</p>
							<p className="text-xs">Add items to begin</p>
						</div>
					) : (
						<>
							{cart.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
								>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<p className="font-medium text-sm truncate">
												{item.name}
											</p>
											<Badge
												variant="outline"
												className={`text-[9px] ${getTypeColor(
													item.type
												)}`}
											>
												{item.type}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground">
											${item.price.toFixed(2)} each
										</p>
									</div>
									<div className="flex items-center gap-1">
										{/* Quantity controls - disabled for memberships */}
										{item.type === "membership" ? (
											<div className="flex items-center gap-1 px-2">
												<Lock className="h-3 w-3 text-muted-foreground" />
												<span className="text-sm font-medium">
													1
												</span>
											</div>
										) : (
											<>
												<Button
													variant="ghost"
													size="icon"
													className="h-7 w-7"
													onClick={() =>
														onUpdateQuantity(
															item.id,
															-1
														)
													}
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span className="w-6 text-center text-sm font-medium">
													{item.quantity}
												</span>
												<Button
													variant="ghost"
													size="icon"
													className="h-7 w-7"
													onClick={() =>
														onUpdateQuantity(
															item.id,
															1
														)
													}
												>
													<Plus className="h-3 w-3" />
												</Button>
											</>
										)}
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 text-destructive hover:text-destructive"
											onClick={() =>
												onRemoveItem(item.id)
											}
										>
											<Trash2 className="h-3 w-3" />
										</Button>
									</div>
								</div>
							))}

							{/* Proration Widget for Memberships */}
							{hasMembershipItems && (
								<div className="mt-4">
									<ProrationWidget
										semesterStart={semesterStart}
										semesterEnd={semesterEnd}
										purchaseDate={today}
									/>
								</div>
							)}

							{/* Pass Info */}
							{hasPassItems && (
								<div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
									<CreditCard className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-teal-600">
											Pass Purchase
										</p>
										<p className="text-xs text-teal-600/80">
											Pass will be added to customer's
											account
										</p>
									</div>
								</div>
							)}

							{/* Collateral Warning */}
							{hasCollateralItems && (
								<div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
									<AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-amber-500">
											Collect Collateral
										</p>
										<p className="text-xs text-amber-500/80">
											Collect student ID before releasing
											equipment
										</p>
									</div>
								</div>
							)}
						</>
					)}
				</div>

				{/* Totals & Checkout */}
				{cart.length > 0 && (
					<div className="pt-4 mt-auto">
						<Separator className="mb-4" />

						<div className="space-y-1.5 mb-4">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									Subtotal
								</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							{tax > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Tax ({config.taxRate}%)
									</span>
									<span>${tax.toFixed(2)}</span>
								</div>
							)}
							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span className="text-primary">
									${total.toFixed(2)}
								</span>
							</div>
						</div>

						{/* One-Tap Checkout for eligible users */}
						{selectedUser && (
							<Button
								className="w-full mb-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400"
								onClick={onCheckout}
							>
								<CreditCard className="h-4 w-4 mr-2" />
								Charge ${total.toFixed(2)} to Account
							</Button>
						)}

						<Button
							variant="outline"
							className="w-full"
							onClick={onCheckout}
							disabled={!selectedUser}
						>
							Other Payment Methods
						</Button>

						{!selectedUser && (
							<p className="text-xs text-center text-muted-foreground mt-2">
								Select a customer to checkout
							</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
