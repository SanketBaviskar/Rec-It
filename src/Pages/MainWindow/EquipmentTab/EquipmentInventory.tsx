import { useState, useMemo } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package } from "lucide-react";
import { EquipmentItem, IndividualEquipment } from "./types";
import { EquipmentDetailDialog } from "./EquipmentDetailDialog";
import React from "react";

// Mock data - replace with API call using categoryId
const sportsEquipment: EquipmentItem[] = [
	{ id: "1", name: "Basketball", quantity: 15, photoUrl: "" },
	{ id: "2", name: "Volleyball", quantity: 12, photoUrl: "" },
	{ id: "3", name: "Tennis Racket", quantity: 8, photoUrl: "" },
	{ id: "4", name: "Jump Rope", quantity: 20, photoUrl: "" },
	{ id: "5", name: "Yoga Mat", quantity: 25, photoUrl: "" },
	{ id: "6", name: "Resistance Bands", quantity: 30, photoUrl: "" },
];

// Generate individual items for each equipment type
const generateIndividualItems = (
	equipment: EquipmentItem
): IndividualEquipment[] => {
	const prefix = equipment.name.substring(0, 2).toUpperCase();
	return Array.from({ length: equipment.quantity }, (_, i) => ({
		id: `${prefix}${String(i + 1).padStart(3, "0")}`,
		equipmentTypeId: equipment.id,
		equipmentName: equipment.name,
		status: "available" as const,
	}));
};

interface SelectedMember {
	id: string;
	firstName: string;
	lastName: string;
}

interface EquipmentInventoryProps {
	categoryId?: number;
	selectedMember: SelectedMember | null;
	onCheckout: (items: IndividualEquipment[]) => void;
}

export function EquipmentInventory({
	categoryId,
	selectedMember,
	onCheckout,
}: EquipmentInventoryProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedEquipment, setSelectedEquipment] =
		useState<EquipmentItem | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const filteredItems = useMemo(
		() =>
			sportsEquipment.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[searchQuery]
	);

	const handleCardClick = (item: EquipmentItem) => {
		setSelectedEquipment(item);
		setDialogOpen(true);
	};

	const handleCheckout = (items: IndividualEquipment[]) => {
		onCheckout(items);
	};

	return (
		<div className="h-full flex flex-col">
			{/* Search Header */}
			<div className="p-4 border-b bg-card sticky top-0 z-10">
				<div className="flex items-center gap-4">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search equipment..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10"
						/>
					</div>
					<Badge variant="secondary" className="px-3 py-1">
						{filteredItems.length} items
					</Badge>
					{selectedMember && (
						<Badge variant="default" className="px-3 py-1">
							Checkout for: {selectedMember.firstName}
						</Badge>
					)}
				</div>
			</div>

			{/* Equipment Grid */}
			<div className="flex-1 overflow-y-auto p-4">
				{filteredItems.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
						<Package className="h-12 w-12 mb-3 opacity-50" />
						<p className="font-medium">No equipment found</p>
						<p className="text-sm mt-1">
							Try a different search term
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredItems.map((item) => (
							<EquipmentCard
								key={item.id}
								item={item}
								onClick={() => handleCardClick(item)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Equipment Detail Dialog */}
			{selectedEquipment && (
				<EquipmentDetailDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					equipmentName={selectedEquipment.name}
					items={generateIndividualItems(selectedEquipment)}
					onCheckout={handleCheckout}
					memberSelected={!!selectedMember}
				/>
			)}
		</div>
	);
}

interface EquipmentCardProps {
	item: EquipmentItem;
	onClick: () => void;
}

const EquipmentCard = React.memo(({ item, onClick }: EquipmentCardProps) => {
	const isLowStock = item.quantity <= 5;
	const isOutOfStock = item.quantity === 0;

	return (
		<Card
			className={`flex flex-col transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group ${
				isOutOfStock ? "opacity-60" : ""
			}`}
			onClick={onClick}
		>
			<CardHeader className="p-4 pb-2">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-sm font-medium line-clamp-2">
						{item.name}
					</CardTitle>
					{isLowStock && !isOutOfStock && (
						<Badge
							variant="destructive"
							className="text-xs shrink-0"
						>
							Low
						</Badge>
					)}
					{isOutOfStock && (
						<Badge variant="secondary" className="text-xs shrink-0">
							Out
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-0 flex-grow">
				<div className="flex items-center gap-3">
					<div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border">
						{item.photoUrl ? (
							<img
								src={item.photoUrl}
								alt={item.name}
								loading="lazy"
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.style.display = "none";
								}}
							/>
						) : (
							<Package className="h-6 w-6 text-primary/60" />
						)}
					</div>
					<div>
						<p className="text-2xl font-bold">{item.quantity}</p>
						<p className="text-xs text-muted-foreground">
							Available
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				<Button
					size="sm"
					className="w-full"
					variant="outline"
					disabled={isOutOfStock}
				>
					View Items
				</Button>
			</CardFooter>
		</Card>
	);
});
