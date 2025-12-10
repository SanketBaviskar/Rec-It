import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	getFacilityItems,
	FacilityItem,
} from "@/services/Api/Admin/Facility/getFacilityItems";
import { Facility } from "@/services/Api/Facility/facilityApi"; // Assuming Facility type is here

interface FacilityItemsProps {
	facility: Facility;
}

export default function FacilityItems({ facility }: FacilityItemsProps) {
	const [items, setItems] = useState<FacilityItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadItems = async () => {
			setIsLoading(true);
			try {
				const data = await getFacilityItems(facility.id);
				setItems(data);
			} catch {
				console.error("Failed to load items");
			} finally {
				setIsLoading(false);
			}
		};

		if (facility.id) {
			loadItems();
		}
	}, [facility.id]);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					{facility.name} Items
				</h2>
				<p className="text-muted-foreground">
					Manage individual units for {facility.name}.
				</p>
			</div>

			<div className="flex gap-4 mb-4">
				<div className="p-4 bg-white border rounded-lg shadow-sm flex-1">
					<div className="text-sm text-muted-foreground">
						Total Units
					</div>
					<div className="text-2xl font-bold">{items.length}</div>
				</div>
				<div className="p-4 bg-white border rounded-lg shadow-sm flex-1">
					<div className="text-sm text-muted-foreground">
						Available
					</div>
					<div className="text-2xl font-bold text-green-600">
						{items.filter((i) => i.status === "available").length}
					</div>
				</div>
			</div>

			<div className="bg-card rounded-md border shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center py-4"
								>
									Loading items...
								</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center py-4"
								>
									No items found for this facility.
								</TableCell>
							</TableRow>
						) : (
							items.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium">
										{item.name}
									</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												item.status === "available"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{item.status}
										</span>
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm">
											Edit
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
