import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function EquipmentBasicDetails() {
	const { control } = useFormContext();

	return (
		<>
			<FormField
				control={control}
				name="equipmentName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Equipment Name</FormLabel>
						<FormControl>
							<Input
								placeholder="Enter equipment name"
								{...field}
							/>
						</FormControl>
						<FormDescription>
							Name of the equipment within the inventory.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="equipmentCode"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Equipment Code</FormLabel>
						<FormControl>
							<Input
								placeholder="Enter equipment code"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="equipmentImage"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Equipment Image</FormLabel>
						<FormControl>
							<Input
								id="picture"
								type="file"
								placeholder="Upload equipment image"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="description"
				render={({ field }) => (
					<FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Textarea
								placeholder="Describe the equipment"
								{...field}
							/>
						</FormControl>
						<FormDescription>
							Provide a brief description of the equipment.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
