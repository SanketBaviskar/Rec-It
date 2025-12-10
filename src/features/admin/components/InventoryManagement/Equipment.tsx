import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getEquipmentById } from "@/Services/Api/Admin/Equipment/getEquipmentById";
import { getEquipmentItems } from "@/Services/Api/Admin/Equipment/getEquipmentItems";

interface Equipment {
	id: string;
	name: string;
	code: string;
	image: string;
	description: string;
	quantity: number;
	price: number;
	replacementFees: number;
	location: string;
	inventoryId: number;
}

interface EquipmentItem {
	id: number;
	equipmentId: number;
	serialNumber: string;
	status: string;
	condition: string;
	notes: string;
}

const Equipment = ({ equipmentId }: { equipmentId: string }) => {
	const [currentEquipment, setCurrentEquipment] = useState<
		Equipment | undefined
	>();
	const [items, setItems] = useState<EquipmentItem[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const eqResponse = await getEquipmentById(equipmentId);
				setCurrentEquipment(eqResponse.data);

				const itemsResponse = await getEquipmentItems(equipmentId);
				if (itemsResponse.status === "success") {
					setItems(itemsResponse.data);
				}
			} catch (error) {
				console.error("Failed to fetch equipment data:", error);
			}
		};
		fetchData();
	}, [equipmentId]);

	return (
		<div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
			<div className="flex justify-between items-start">
				<div>
					<h2 className="text-2xl font-bold">
						{currentEquipment?.name}
					</h2>
					<p className="text-muted-foreground">
						Code: {currentEquipment?.code} | Location:{" "}
						{currentEquipment?.location}
					</p>
				</div>
				<div className="text-right">
					<p className="text-sm font-medium">
						Total Quantity: {currentEquipment?.quantity}
					</p>
					<p className="text-sm text-muted-foreground">
						Available:{" "}
						{items.filter((i) => i.status === "available").length}
					</p>
				</div>
			</div>

			<div className="border rounded-lg overflow-hidden">
				<Table>
					<TableHeader className="bg-gray-50">
						<TableRow>
							<TableHead>Serial Number</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Condition</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-4"
								>
									No items found for this equipment.
								</TableCell>
							</TableRow>
						) : (
							items.map((item) => (
								<TableRow
									key={item.id}
									className="hover:bg-gray-50"
								>
									<TableCell className="font-medium">
										{item.serialNumber}
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
									<TableCell>{item.condition}</TableCell>
									<TableCell>
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
};

export default Equipment;
