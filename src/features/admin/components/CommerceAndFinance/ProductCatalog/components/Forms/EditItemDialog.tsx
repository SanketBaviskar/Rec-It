import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/hooks/use-toast";
import { EquipmentItem } from "@/services/Api/Admin/Equipment/getEquipmentItems";
import { updateEquipmentItem } from "@/services/Api/Admin/Equipment/updateEquipmentItem";

interface EditItemDialogProps {
	item: EquipmentItem | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onComplete: () => void;
}

export function EditItemDialog({
	item,
	open,
	onOpenChange,
	onComplete,
}: EditItemDialogProps) {
	const [serialNumber, setSerialNumber] = useState("");
	const [barcode, setBarcode] = useState("");
	const [status, setStatus] = useState("available");
	const [condition, setCondition] = useState("good");
	const [notes, setNotes] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		if (item && open) {
			setSerialNumber(item.serialNumber || "");
			setBarcode(item.barcode || "");
			setStatus(item.status || "available");
			setCondition(item.condition || "good");
			setNotes(item.notes || "");
		}
	}, [item, open]);

	const handleSubmit = async () => {
		if (!item) return;

		setIsSubmitting(true);
		try {
			await updateEquipmentItem(item.id.toString(), {
				serialNumber,
				barcode,
				status,
				condition,
				notes,
			});

			toast({
				title: "Item Updated",
				description: "Equipment item details have been updated.",
				variant: "success",
			});
			onComplete();
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to update item", error);
			toast({
				title: "Error",
				description: "Failed to update item. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!item) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Item - #{item.id}</DialogTitle>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{/* Serial Number */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="serial" className="text-right">
							Serial #
						</Label>
						<Input
							id="serial"
							value={serialNumber}
							onChange={(e) => setSerialNumber(e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Barcode */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="barcode" className="text-right">
							Barcode
						</Label>
						<Input
							id="barcode"
							value={barcode}
							onChange={(e) => setBarcode(e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Status */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="status" className="text-right">
							Status
						</Label>
						<Select value={status} onValueChange={setStatus}>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="available">
									Available
								</SelectItem>
								<SelectItem value="checked_out">
									Checked Out
								</SelectItem>
								<SelectItem value="maintenance">
									Maintenance
								</SelectItem>
								<SelectItem value="retired">Retired</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Condition */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="condition" className="text-right">
							Condition
						</Label>
						<Select value={condition} onValueChange={setCondition}>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select condition" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="new">New</SelectItem>
								<SelectItem value="good">Good</SelectItem>
								<SelectItem value="fair">Fair</SelectItem>
								<SelectItem value="poor">Poor</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Notes */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="notes" className="text-right">
							Notes
						</Label>
						<Textarea
							id="notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							className="col-span-3"
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
					<Button onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save Changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
