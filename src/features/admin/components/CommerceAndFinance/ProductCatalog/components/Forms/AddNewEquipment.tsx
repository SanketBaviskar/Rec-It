import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AddNewEquipmentFormProps, Equipment } from "../../types";
import { createEquipment } from "@/services/Api/Admin/Equipment/createEquipment";
import { Form } from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { updateEquipment } from "@/services/Api/Admin/Equipment/updateEquipment";
import { deleteEquipmentById } from "@/services/Api/Admin/Equipment/deleteEquipment";
import { equipmentFormSchema } from "../../schemas";
import { EquipmentBasicDetails } from "./Partials/EquipmentBasicDetails";
import { EquipmentPricingAndStock } from "./Partials/EquipmentPricingAndStock";

const formSchema = equipmentFormSchema;

export default function AddNewEquipmentForm({
	onComplete,
	inventoryId,
	inventoryName,
	mode,
	equipment,
	equipmentId,
}: AddNewEquipmentFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			equipmentName: "",
			equipmentCode: "",
			equipmentImage: "",
			description: "",
			quantity: 1,
			price: 0,
			replacementFees: 0,
			inventoryName: "",
			location: "",
		},
	});

	useEffect(() => {
		if (mode === "edit") {
			form.reset({
				equipmentName: equipment?.name || "",
				equipmentCode: equipment?.code || "",
				equipmentImage: equipment?.image || "",
				description: equipment?.description || "",
				quantity: equipment?.quantity || 1,
				price: equipment?.price || 0,
				replacementFees: equipment?.replacementFees || 0,
				inventoryName: equipment?.inventory.name || "",
				location: equipment?.location || "",
			});
			console.log("Form Values", form.getValues());
		}
	}, [mode, equipment, form]);

	async function saveEdited(formVal: any) {
		try {
			const response = await updateEquipment(equipmentId, { formVal });
			if (response.status === "success") {
				toast({
					title: "Success",
					description: "Equipment Updated successfully",
					variant: "success",
				});
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to add or update equipment",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	}
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		try {
			const EquipmentDetails: Equipment = {
				name: values.equipmentName,
				code: values.equipmentCode,
				image: values.equipmentImage,
				description: values.description,
				quantity: values.quantity,
				price: values.price,
				replacementFees: values.replacementFees,
				location: values.location,
				inventoryId: parseInt(inventoryId || "", 10),
			};
			const response = await createEquipment(EquipmentDetails);
			if (response.status === "success") {
				toast({
					title: "Success",
					description: "Equipment added successfully",
					variant: "success",
				});
				form.reset();
				onComplete(response.data);
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to add or update equipment",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	const handleCancel = () => {
		form.reset();
		setIsCancelPopupOpen(false);
		toast({
			title: "Form Cancelled",
			description: "You have cancelled the form.",
		});
		onComplete();
	};

	async function deleteEquipment(id: string) {
		const response = await deleteEquipmentById(id);
		try {
			if (response.status === "success") {
				toast({
					title: "Success",
					description: "Equipment Deleted successfully",
					variant: "destructive",
				});
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to add or update equipment",
				variant: "destructive",
			});
		} finally {
			console.log("success");
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<EquipmentBasicDetails />
					<EquipmentPricingAndStock
						mode={mode}
						inventoryName={inventoryName}
					/>
				</div>

				<div className="flex space-x-4">
					{mode === "create" && (
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Adding..." : "Add Equipment"}
						</Button>
					)}
					{mode === "edit" && (
						<Button
							type="button"
							disabled={isSubmitting}
							onClick={() => saveEdited(form.getValues())}
						>
							{isSubmitting ? "Saving..." : "Save Equipment"}
						</Button>
					)}
					{mode === "create" && (
						<Button
							type="button"
							variant="destructive"
							onClick={() => setIsCancelPopupOpen(true)}
						>
							Cancel
						</Button>
					)}
					{mode === "edit" && (
						<Button
							type="button"
							variant="destructive"
							onClick={() => deleteEquipment(equipmentId)}
						>
							Delete Equipment
						</Button>
					)}
				</div>
			</form>
			<Toaster />
			<Dialog
				open={isCancelPopupOpen}
				onOpenChange={setIsCancelPopupOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Cancellation</DialogTitle>
						<DialogDescription>
							Are you sure you want to cancel this form? Unsaved
							changes will be lost.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="ghost"
							onClick={() => setIsCancelPopupOpen(false)}
						>
							No, Go Back
						</Button>
						<Button variant="destructive" onClick={handleCancel}>
							Yes, Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Form>
	);
}
