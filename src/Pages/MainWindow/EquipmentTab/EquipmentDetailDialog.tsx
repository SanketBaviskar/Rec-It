"use client";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, CheckCircle2 } from "lucide-react";
import { IndividualEquipment } from "./types";

interface EquipmentDetailDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	equipmentName: string;
	items: IndividualEquipment[];
	onCheckout: (selectedItems: IndividualEquipment[]) => void;
	memberSelected: boolean;
}

export function EquipmentDetailDialog({
	open,
	onOpenChange,
	equipmentName,
	items,
	onCheckout,
	memberSelected,
}: EquipmentDetailDialogProps) {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const availableItems = items.filter((item) => item.status === "available");
	const checkedOutItems = items.filter(
		(item) => item.status === "checked-out"
	);

	const handleToggle = (id: string) => {
		const newSet = new Set(selectedIds);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		setSelectedIds(newSet);
	};

	const handleCheckout = () => {
		const selected = items.filter((item) => selectedIds.has(item.id));
		onCheckout(selected);
		setSelectedIds(new Set());
		onOpenChange(false);
	};

	const handleClose = () => {
		setSelectedIds(new Set());
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Package className="h-5 w-5" />
						{equipmentName}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Stats */}
					<div className="flex gap-2">
						<Badge variant="secondary">
							{availableItems.length} Available
						</Badge>
						<Badge variant="outline">
							{checkedOutItems.length} Checked Out
						</Badge>
					</div>

					{/* Available Items */}
					<div>
						<h4 className="text-sm font-medium mb-2">
							Select Items to Checkout
						</h4>
						<ScrollArea className="h-[200px] border rounded-lg">
							<div className="p-2 space-y-1">
								{availableItems.length === 0 ? (
									<p className="text-center text-muted-foreground py-4 text-sm">
										No items available
									</p>
								) : (
									availableItems.map((item) => (
										<label
											key={item.id}
											className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors ${
												selectedIds.has(item.id)
													? "bg-primary/10"
													: ""
											}`}
										>
											<Checkbox
												checked={selectedIds.has(
													item.id
												)}
												onCheckedChange={() =>
													handleToggle(item.id)
												}
												disabled={!memberSelected}
											/>
											<div className="flex-1">
												<span className="font-mono text-sm font-medium">
													{item.id}
												</span>
											</div>
											<Badge
												variant="secondary"
												className="text-xs"
											>
												Available
											</Badge>
										</label>
									))
								)}
							</div>
						</ScrollArea>
					</div>

					{!memberSelected && (
						<p className="text-sm text-destructive">
							Please select a member first to checkout equipment
						</p>
					)}
				</div>

				<DialogFooter className="gap-2">
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						onClick={handleCheckout}
						disabled={selectedIds.size === 0 || !memberSelected}
					>
						<CheckCircle2 className="h-4 w-4 mr-2" />
						Checkout ({selectedIds.size})
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
