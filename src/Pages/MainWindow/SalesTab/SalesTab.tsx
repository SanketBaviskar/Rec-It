import { useState } from "react";
import { UserPanel } from "./components/UserPanel";
import { QuickItemsGrid, SaleItem } from "./components/QuickItemsGrid";
import { CartPanel } from "./components/CartPanel";
import { CheckoutModal } from "./components/CheckoutModal";

export interface CartItem extends SaleItem {
	quantity: number;
}

export default function SalesTab() {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	const handleSelectCustomer = (user: any) => {
		setSelectedCustomer(user);
	};

	const handleClearCustomer = () => {
		setSelectedCustomer(null);
	};

	const addToCart = (item: SaleItem) => {
		setCart((current) => {
			// For memberships, don't allow duplicates
			if (item.type === "membership") {
				const exists = current.find((x) => x.id === item.id);
				if (exists) {
					return current; // Already in cart
				}
				return [...current, { ...item, quantity: 1 }];
			}

			// For passes and merchandise, allow quantity increment
			const exists = current.find((x) => x.id === item.id);
			if (exists) {
				return current.map((x) =>
					x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
				);
			}
			return [...current, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (itemId: string) => {
		setCart((current) => current.filter((item) => item.id !== itemId));
	};

	const updateQuantity = (itemId: string, delta: number) => {
		setCart((current) => {
			const item = current.find((x) => x.id === itemId);

			// Don't allow quantity > 1 for memberships
			if (item?.type === "membership" && delta > 0) {
				return current;
			}

			return current
				.map((item) => {
					if (item.id === itemId) {
						const newQuantity = item.quantity + delta;
						return newQuantity > 0
							? { ...item, quantity: newQuantity }
							: null;
					}
					return item;
				})
				.filter(Boolean) as CartItem[];
		});
	};

	const handleCheckout = () => {
		setIsCheckoutOpen(true);
	};

	const handleCheckoutComplete = () => {
		setCart([]);
		setSelectedCustomer(null);
		setIsCheckoutOpen(false);
	};

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)] p-6 gap-6 bg-gradient-to-br from-background via-background to-muted/20">
			{/* Main 3-Column Layout */}
			<div className="flex-1 flex gap-6 min-h-0">
				{/* Left Column - User Panel (30%) */}
				<div className="w-[30%] flex flex-col min-h-0">
					<UserPanel
						selectedUser={selectedCustomer}
						onSelectUser={handleSelectCustomer}
						onClearUser={handleClearCustomer}
					/>
				</div>

				{/* Center Column - Quick Items Grid */}
				<div className="flex-1 flex flex-col min-h-0">
					<QuickItemsGrid
						onAddItem={addToCart}
						disabled={!selectedCustomer}
					/>
				</div>

				{/* Right Column - Cart Panel */}
				<div className="w-[350px] flex flex-col min-h-0">
					<CartPanel
						cart={cart}
						onUpdateQuantity={updateQuantity}
						onRemoveItem={removeFromCart}
						onCheckout={handleCheckout}
						selectedUser={selectedCustomer}
					/>
				</div>
			</div>

			{/* Checkout Modal */}
			<CheckoutModal
				isOpen={isCheckoutOpen}
				onClose={() => setIsCheckoutOpen(false)}
				cart={cart}
				selectedUser={selectedCustomer}
				onComplete={handleCheckoutComplete}
			/>
		</div>
	);
}
