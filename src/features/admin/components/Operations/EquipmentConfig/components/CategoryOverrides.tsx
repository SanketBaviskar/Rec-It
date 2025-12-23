import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Layers, Plus, Trash2 } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function CategoryOverrides() {
	const { overrides, addOverride, removeOverride, updateOverride } =
		useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Layers className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Category Overrides</CardTitle>
							<CardDescription>
								Define different policies for specific equipment
								categories.
							</CardDescription>
						</div>
					</div>
					<Button variant="outline" size="sm" onClick={addOverride}>
						<Plus className="h-4 w-4 mr-2" />
						Add Category
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Category</TableHead>
							<TableHead>Checkout Duration</TableHead>
							<TableHead>Late Fee/Hr</TableHead>
							<TableHead>Max Items</TableHead>
							<TableHead className="w-12"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{overrides.map((override) => (
							<TableRow key={override.id}>
								<TableCell>
									<Input
										value={override.categoryName}
										onChange={(e) =>
											updateOverride(
												override.id,
												"categoryName",
												e.target.value
											)
										}
										className="h-8 w-[140px]"
									/>
								</TableCell>
								<TableCell>
									<div className="flex items-center">
										<Input
											type="number"
											value={override.checkoutHours}
											onChange={(e) =>
												updateOverride(
													override.id,
													"checkoutHours",
													parseInt(e.target.value) ||
														0
												)
											}
											className="h-8 w-16 mr-2"
										/>
										<span className="text-xs text-muted-foreground">
											hrs
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground mr-1">
											$
										</span>
										<Input
											type="number"
											step="0.01"
											value={override.lateFeePerHour}
											onChange={(e) =>
												updateOverride(
													override.id,
													"lateFeePerHour",
													parseFloat(
														e.target.value
													) || 0
												)
											}
											className="h-8 w-16"
										/>
									</div>
								</TableCell>
								<TableCell>
									<Input
										type="number"
										value={override.maxItems}
										onChange={(e) =>
											updateOverride(
												override.id,
												"maxItems",
												parseInt(e.target.value) || 0
											)
										}
										className="h-8 w-16"
									/>
								</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-destructive hover:bg-destructive/10"
										onClick={() =>
											removeOverride(override.id)
										}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
						{overrides.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-muted-foreground h-24"
								>
									No overrides defined.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
