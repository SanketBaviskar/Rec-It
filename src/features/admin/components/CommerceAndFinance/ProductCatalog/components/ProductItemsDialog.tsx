import { useEffect, useState, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Equipment } from "@/services/Api/Equipment/fetchEquipments";
import {
	getEquipmentItems,
	EquipmentItem,
} from "@/services/Api/Admin/Equipment/getEquipmentItems";
import { deleteEquipmentItem } from "@/services/Api/Admin/Equipment/deleteEquipmentItem";
import { EditItemDialog } from "./Forms/EditItemDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductItemsDialogProps {
	product: Equipment | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ProductItemsDialog({
	product,
	open,
	onOpenChange,
}: ProductItemsDialogProps) {
	const [items, setItems] = useState<EquipmentItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);
	const { toast } = useToast();

	const loadItems = useCallback(async () => {
		if (!product) return;
		setLoading(true);
		try {
			const data = await getEquipmentItems(product.id.toString());
			console.log("[DEBUG] Frontend received items data:", data);

			// Logic to extract items array based on response structure
			let itemsArray: EquipmentItem[] = [];

			// Case 1: Standard response with { data: { items: [...] } }
			if (
				data &&
				data.data &&
				data.data.items &&
				Array.isArray(data.data.items)
			) {
				itemsArray = data.data.items;
			}
			// Case 2: Response { items: [...] } (if service unwrapped 'data')
			else if (data && data.items && Array.isArray(data.items)) {
				itemsArray = data.items;
			}
			// Case 3: Direct array
			else if (Array.isArray(data)) {
				itemsArray = data;
			}
			// Case 4: data.data is the array (legacy behavior?)
			else if (data && data.data && Array.isArray(data.data)) {
				itemsArray = data.data;
			} else {
				console.warn(
					"[DEBUG] Could not extract items array from:",
					data
				);
			}

			setItems(itemsArray);
		} catch (error) {
			console.error("Failed to load items", error);
			toast({
				title: "Error",
				description: "Failed to load individual items.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	}, [product, toast]);

	useEffect(() => {
		if (open && product) {
			loadItems();
		}
	}, [open, product, loadItems]);

	const handleDelete = async (itemId: number) => {
		if (!confirm("Are you sure you want to delete this item?")) return;
		try {
			await deleteEquipmentItem(itemId.toString());
			toast({
				title: "Item Deleted",
				description: "Equipment item has been removed.",
				variant: "success",
			});
			loadItems();
		} catch (error) {
			console.error("Failed to delete item", error);
			toast({
				title: "Error",
				description: "Failed to delete item.",
				variant: "destructive",
			});
		}
	};

	if (!product) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0">
				<DialogHeader className="p-6 pb-4 border-b">
					<DialogTitle>
						Manage Items: {product.name} ({product.quantity} Total)
					</DialogTitle>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto p-6">
					{loading ? (
						<div className="space-y-2">
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
						</div>
					) : items.length === 0 ? (
						<div className="text-center py-10 text-muted-foreground">
							No individual items found.
							<br />
							Only bulk quantity is currently tracked, or items
							weren't generated.
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[60px]">
										ID
									</TableHead>
									<TableHead>Serial #</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Condition</TableHead>
									<TableHead>Notes</TableHead>
									<TableHead className="w-[80px]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{items.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="text-xs text-muted-foreground">
											{item.id}
										</TableCell>
										<TableCell className="font-mono text-xs">
											{item.serialNumber || "-"}
										</TableCell>
										<TableCell>
											<Badge
												variant={
													item.status === "available"
														? "default" // or success if available
														: item.status ===
														  "maintenance"
														? "destructive"
														: "secondary"
												}
											>
												{item.status}
											</Badge>
										</TableCell>
										<TableCell>{item.condition}</TableCell>
										<TableCell className="truncate max-w-[150px]">
											{item.notes}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<MoreHorizontal className="w-4 h-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() =>
															setEditingItem(item)
														}
													>
														Edit Details
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-red-600"
														onClick={() =>
															handleDelete(
																item.id
															)
														}
													>
														Delete Item
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</div>

				<EditItemDialog
					item={editingItem}
					open={!!editingItem}
					onOpenChange={(open) => {
						if (!open) setEditingItem(null);
					}}
					onComplete={loadItems}
				/>
			</DialogContent>
		</Dialog>
	);
}
