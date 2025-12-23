import * as z from "zod";

export const equipmentFormSchema = z.object({
	equipmentName: z
		.string()
		.min(2, { message: "Equipment name must be at least 2 characters." }),
	equipmentCode: z
		.string()
		.min(1, { message: "Equipment code is required." }),
	equipmentImage: z.string().optional(),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters." }),
	quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
	price: z.number().min(0, { message: "Price must be a positive value." }),
	replacementFees: z
		.number()
		.min(0, { message: "Replacement fees must be a positive value." }),
	inventoryName: z.string(),
	location: z
		.string()
		.min(2, { message: "Location must be at least 2 characters." }),
});
