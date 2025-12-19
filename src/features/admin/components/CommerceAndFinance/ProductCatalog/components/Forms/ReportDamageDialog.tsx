import { useState, useEffect, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Equipment } from "@/services/Api/Equipment/fetchEquipments";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	getEquipmentItems,
	EquipmentItem,
} from "@/services/Api/Admin/Equipment/getEquipmentItems";
import { updateEquipmentItem } from "@/services/Api/Admin/Equipment/updateEquipmentItem";
import { Badge } from "@/components/ui/badge";

interface ReportDamageDialogProps {
	product: Equipment | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onComplete: () => void;
}

export function ReportDamageDialog({
	product,
	open,
	onOpenChange,
	onComplete,
}: ReportDamageDialogProps) {
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState<EquipmentItem[]>([]);
	const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
		new Set()
	);
	const [reason, setReason] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const loadItems = useCallback(async () => {
		if (!product) return;
		setLoading(true);
		try {
			const data = await getEquipmentItems(product.id.toString());
			let itemsArray: EquipmentItem[] = [];
			// Handling normalized data structure
			// @ts-ignore - Dynamic handling of API response structure
			if (
				data &&
				data.data &&
				data.data.items &&
				Array.isArray(data.data.items)
			) {
				// @ts-ignore
				itemsArray = data.data.items;
				// @ts-ignore
			} else if (data && data.items && Array.isArray(data.items)) {
				// @ts-ignore
				itemsArray = data.items;
			} else if (Array.isArray(data)) {
				itemsArray = data;
				// @ts-ignore
			} else if (data && data.data && Array.isArray(data.data)) {
				// @ts-ignore
				itemsArray = data.data;
			}
			// Filter only available items? Or show all? User probably wants to report "Available" items as damaged
			// But maybe they want to update already maintenance items?
			// Let's show all, but maybe sort available first.
			setItems(itemsArray);
		} catch (error) {
			console.error("Failed to load items", error);
		} finally {
			setLoading(false);
		}
	}, [product]);

	useEffect(() => {
		if (open && product) {
			loadItems();
		}
	}, [open, product, loadItems]);

	const toggleSelection = (id: number) => {
		const newSet = new Set(selectedItemIds);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		setSelectedItemIds(newSet);
	};

	const handleConfirm = async () => {
		if (selectedItemIds.size === 0) {
			toast({
				title: "No Items Selected",
				description: "Please select at least one item to report.",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			// Update each selected item
			const updates = Array.from(selectedItemIds).map((id) =>
				updateEquipmentItem(id.toString(), {
					status: "maintenance",
					notes: reason ? reason : "Reported Damaged",
				})
			);

			await Promise.all(updates);

			toast({
				title: "Damage Reported",
				description: `Marked ${selectedItemIds.size} item(s) as damaged/maintenance.`,
				variant: "success",
			});

			onComplete();
			onOpenChange(false);
			setSelectedItemIds(new Set());
			setReason("");
		} catch (error) {
			console.error("Failed to report damage", error);
			toast({
				title: "Error",
				description: "Failed to update items.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!product) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Report Damage - {product.name}</DialogTitle>
					<DialogDescription>
						Select the specific items that are damaged to mark them
						as "Maintenance".
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label>
							Select Items ({selectedItemIds.size} selected)
						</Label>
						<ScrollArea className="h-[200px] border rounded-md p-2">
							{loading ? (
								<p className="text-sm text-center py-4">
									Loading items...
								</p>
							) : items.length === 0 ? (
								<p className="text-sm text-center py-4 text-muted-foreground">
									No individual items found.
								</p>
							) : (
								<div className="space-y-2">
									{items.map((item) => (
										<div
											key={item.id}
											className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm"
										>
											<Checkbox
												id={`item-${item.id}`}
												checked={selectedItemIds.has(
													item.id
												)}
												onCheckedChange={() =>
													toggleSelection(item.id)
												}
											/>
											<Label
												htmlFor={`item-${item.id}`}
												className="flex-1 flex items-center justify-between cursor-pointer"
											>
												<span className="font-mono">
													{item.serialNumber}
												</span>
												<Badge
													variant="outline"
													className="text-xs"
												>
													{item.status}
												</Badge>
											</Label>
										</div>
									))}
								</div>
							)}
						</ScrollArea>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="reason">Damage Details / Notes</Label>
						<Textarea
							id="reason"
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							placeholder="Describe the damage..."
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={isSubmitting || selectedItemIds.size === 0}
					>
						{isSubmitting ? "Updating..." : "Mark as Damaged"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
