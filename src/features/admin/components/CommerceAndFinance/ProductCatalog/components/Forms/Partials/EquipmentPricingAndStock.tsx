import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EquipmentPricingAndStockProps {
	inventoryName?: string;
	mode?: "create" | "edit";
}

export function EquipmentPricingAndStock({
	inventoryName,
	mode,
}: EquipmentPricingAndStockProps) {
	const { control } = useFormContext();

	return (
		<>
			<FormField
				control={control}
				name="quantity"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Quantity</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="Enter quantity"
								{...field}
								onChange={(e) =>
									field.onChange(parseInt(e.target.value))
								}
								min={1}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="price"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Price</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="Enter price"
								{...field}
								onChange={(e) =>
									field.onChange(parseFloat(e.target.value))
								}
								min={0}
								step="0.01"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="replacementFees"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Replacement Fees</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="Enter replacement fees"
								{...field}
								onChange={(e) =>
									field.onChange(parseFloat(e.target.value))
								}
								min={0}
								step="0.01"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="inventoryName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>inventoryName</FormLabel>
						<FormControl>
							<Input
								value={
									mode === "create"
										? inventoryName
										: field.value
								}
								disabled
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="location"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Location</FormLabel>
						<FormControl>
							<Input placeholder="Enter location" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
