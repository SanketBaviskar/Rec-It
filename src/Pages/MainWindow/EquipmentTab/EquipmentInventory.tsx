import { useState, useMemo, useEffect } from "react";
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
import {
	Search,
	Package,
	Loader2,
	AlertCircle,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { EquipmentItem, IndividualEquipment } from "./types";
import { EquipmentDetailDialog } from "./EquipmentDetailDialog";
import React from "react";
import { fetchEquipments } from "@/services/Api/Equipment/fetchEquipments";
import { fetchEquipmentItems } from "@/services/Api/Equipment/checkoutApi";

interface SelectedMember {
	id: string;
	firstName: string;
	lastName: string;
}

interface EquipmentInventoryProps {
	categoryId?: number;
	selectedMember: SelectedMember | null;
	onCheckout: (items: IndividualEquipment[]) => void;
	refreshTrigger?: number;
}

const ITEMS_PER_PAGE = 100;

export function EquipmentInventory({
	categoryId,
	selectedMember,
	onCheckout,
	refreshTrigger = 0,
}: EquipmentInventoryProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	const [selectedEquipment, setSelectedEquipment] =
		useState<EquipmentItem | null>(null);
	const [selectedEquipmentItems, setSelectedEquipmentItems] = useState<
		IndividualEquipment[]
	>([]);
	const [isLoadingDetails, setIsLoadingDetails] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	// Fetch equipments when category changes or refresh triggered
	useEffect(() => {
		const loadEquipments = async () => {
			if (!categoryId) return;

			try {
				setIsLoading(true);
				setError(null);
				const response = await fetchEquipments(categoryId);
				console.log("Equipment response:", response);
				// Handle { items: [...] } wrapper
				const responseData = response.data as any;
				const equipmentData = responseData?.items || responseData || [];

				const mappedEquipment: EquipmentItem[] = equipmentData.map(
					(item: any) => ({
						id: item.id.toString(),
						name: item.name,
						// category: item.inventory?.name || 'General', // This field is not part of EquipmentItem
						quantity: item.quantity, // Assuming quantity is available count
						photoUrl: item.image || "",
					})
				);
				setEquipments(mappedEquipment);
			} catch (err) {
				console.error("Failed to load equipments:", err);
				setError("Failed to load equipment list. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		loadEquipments();
	}, [categoryId, refreshTrigger]);

	const filteredItems = useMemo(
		() =>
			equipments.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[equipments, searchQuery]
	);

	// Reset to page 1 when search query or category changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, categoryId]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
	const paginatedItems = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [filteredItems, currentPage]);

	const handleCardClick = async (item: EquipmentItem) => {
		setSelectedEquipment(item);
		try {
			setIsLoadingDetails(true);
			// Fetch individual items for this equipment type
			const response = await fetchEquipmentItems(parseInt(item.id));
			if (response.status === "success" && response.data) {
				const responseData = response.data as any;
				const itemsData = responseData.items || responseData || [];

				const items: IndividualEquipment[] = itemsData.map(
					(eqItem: any) => ({
						id: eqItem.id.toString(), // Use the EquipmentItem ID
						equipmentTypeId: item.id,
						equipmentName: item.name,
						status:
							eqItem.status === "available"
								? "available"
								: "checked-out",
						// We could also map 'maintenance' etc if UI supported it
					})
				);
				setSelectedEquipmentItems(items);
				setDialogOpen(true);
			}
		} catch (err) {
			console.error("Failed to load item details:", err);
			// Ideally show a toast here
		} finally {
			setIsLoadingDetails(false);
		}
	};

	const handleCheckout = (items: IndividualEquipment[]) => {
		onCheckout(items);
		setDialogOpen(false); // Close dialog on checkout
	};

	return (
		<div className="h-full flex flex-col relative">
			{/* Loading Overlay for Details */}
			{isLoadingDetails && (
				<div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center">
					<div className="bg-card p-4 rounded-lg shadow-lg flex items-center gap-3 border">
						<Loader2 className="h-6 w-6 animate-spin text-primary" />
						<span className="font-medium">Loading items...</span>
					</div>
				</div>
			)}

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
						{filteredItems.length} types
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
				{isLoading ? (
					<div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
						<Loader2 className="h-8 w-8 mb-4 animate-spin" />
						<p>Loading equipment...</p>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center h-64 text-destructive">
						<AlertCircle className="h-10 w-10 mb-3" />
						<p className="font-medium">{error}</p>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => window.location.reload()} // Simple retry
						>
							Retry
						</Button>
					</div>
				) : filteredItems.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
						<Package className="h-12 w-12 mb-3 opacity-50" />
						<p className="font-medium">No equipment found</p>
						<p className="text-sm mt-1">
							Try a different search term or category
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{paginatedItems.map((item) => (
							<EquipmentCard
								key={item.id}
								item={item}
								onClick={() => handleCardClick(item)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Pagination Footer */}
			{!isLoading &&
				!error &&
				filteredItems.length > 0 &&
				totalPages > 1 && (
					<div className="p-4 border-t bg-card flex items-center justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setCurrentPage((p) => Math.max(1, p - 1))
							}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4 mr-1" />
							Previous
						</Button>
						<span className="text-sm text-muted-foreground">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setCurrentPage((p) =>
									Math.min(totalPages, p + 1)
								)
							}
							disabled={currentPage === totalPages}
						>
							Next
							<ChevronRight className="h-4 w-4 ml-1" />
						</Button>
					</div>
				)}

			{/* Equipment Detail Dialog */}
			{selectedEquipment && (
				<EquipmentDetailDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					equipmentName={selectedEquipment.name}
					items={selectedEquipmentItems}
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
