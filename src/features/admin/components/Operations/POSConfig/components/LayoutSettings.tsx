import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Plus,
	Trash2,
	FolderPlus,
	Tag,
	Sparkles,
	Pencil,
	MoreHorizontal,
	Ticket, // Added Ticket icon
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePOSConfig, POSItem, POSCategory } from "../usePOSConfig";

export default function LayoutSettings() {
	const {
		items,
		categories,
		addItem,
		removeItem,
		addCategory,
		removeCategory,
		updateItem,
		updateCategory,
	} = usePOSConfig();
	const { toast } = useToast();

	// --- Category State ---
	const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<POSCategory | null>(
		null
	);
	const [categoryForm, setCategoryForm] = useState<Partial<POSCategory>>({
		label: "",
		iconName: "Package",
	});

	// --- Item State ---
	const [itemDialogOpen, setItemDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<POSItem | null>(null);
	const [targetCategoryId, setTargetCategoryId] = useState<string>("");
	const [itemForm, setItemForm] = useState<Partial<POSItem>>({
		name: "",
		price: 0,
		requiresCollateral: false,
		isMembership: false,
		type: "goods",
	});

	// --- Category Handlers ---
	const openAddCategory = () => {
		setEditingCategory(null);
		setCategoryForm({ label: "", iconName: "Package" });
		setCategoryDialogOpen(true);
	};

	const openEditCategory = (cat: POSCategory) => {
		setEditingCategory(cat);
		setCategoryForm({ ...cat });
		setCategoryDialogOpen(true);
	};

	const handleSaveCategory = () => {
		if (!categoryForm.label) return;

		if (editingCategory) {
			updateCategory({
				...editingCategory,
				label: categoryForm.label,
				iconName: categoryForm.iconName || "Package",
			});
			toast({ title: "Category Updated" });
		} else {
			const id = categoryForm.label.toLowerCase().replace(/\s+/g, "-");
			addCategory({
				id,
				label: categoryForm.label,
				iconName: categoryForm.iconName || "Package",
			} as POSCategory);
			toast({ title: "Category Created" });
		}
		setCategoryDialogOpen(false);
	};

	// --- Item Handlers ---
	const openAddItem = (categoryId: string) => {
		setEditingItem(null);
		setTargetCategoryId(categoryId);
		setItemForm({
			name: "",
			price: 0,
			requiresCollateral: false,
			isMembership: false,
			type: "goods",
		});
		setItemDialogOpen(true);
	};

	const openEditItem = (item: POSItem) => {
		setEditingItem(item);
		setTargetCategoryId(item.category);
		setItemForm({ ...item });
		setItemDialogOpen(true);
	};

	const handleSaveItem = () => {
		if (!itemForm.name || !targetCategoryId) return;

		const baseItem = {
			name: itemForm.name,
			price: itemForm.price || 0,
			category: targetCategoryId,
			requiresCollateral: itemForm.requiresCollateral || false,
			isMembership: itemForm.isMembership || false,
			type: itemForm.type || "goods",
			iconName: "Ticket", // Could allow icon editing too if needed
		};

		if (editingItem) {
			updateItem({
				...editingItem,
				...baseItem,
			} as POSItem);
			toast({ title: "Item Updated" });
		} else {
			addItem({
				id: Math.random().toString(36).substr(2, 9),
				...baseItem,
			} as POSItem);
			toast({ title: "Item Created" });
		}
		setItemDialogOpen(false);
	};

	// --- Helpers ---
	const getTypeLabel = (type: string) => {
		switch (type) {
			case "goods":
				return "Goods";
			case "service":
				return "Service";
			case "access":
				return "Access";
			case "rental":
				return "Rental";
			default:
				return type;
		}
	};

	const getTypeColorClass = (type: string) => {
		switch (type) {
			case "goods":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "service":
				return "bg-purple-50 text-purple-700 border-purple-200";
			case "access":
				return "bg-teal-50 text-teal-700 border-teal-200";
			case "rental":
				return "bg-amber-50 text-amber-700 border-amber-200";
			default:
				return "bg-gray-50 text-gray-700";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-end">
				<div>
					<h2 className="text-xl font-semibold tracking-tight">
						Product Catalog
					</h2>
					<p className="text-sm text-muted-foreground">
						Manage categories and items in list view.
					</p>
				</div>
				<Button onClick={openAddCategory}>
					<FolderPlus className="w-4 h-4 mr-2" />
					Add Category
				</Button>
			</div>

			{/* Categories Accordion */}
			<div className="border rounded-lg bg-card">
				<Accordion type="single" collapsible className="w-full">
					{categories.map((category) => (
						<AccordionItem key={category.id} value={category.id}>
							<AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
								<div className="flex items-center gap-4 flex-1 text-left">
									<div className="flex-1 font-semibold flex items-center gap-2">
										<Badge variant="outline">
											{category.label}
										</Badge>
										<span className="text-xs text-muted-foreground font-normal">
											(
											{
												items.filter(
													(i) =>
														i.category ===
														category.id
												).length
											}{" "}
											items)
										</span>
									</div>
									<div
										className="flex items-center gap-2"
										onClick={(e) => e.stopPropagation()}
									>
										<Button
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
												openEditCategory(category);
											}}
											title="Edit Category"
										>
											<Pencil className="h-4 w-4 text-muted-foreground" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
												removeCategory(category.id);
											}}
											className="text-destructive hover:text-destructive"
											title="Delete Category"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-4 pb-4 pt-1 bg-muted/5">
								{/* Items Table */}
								<div className="rounded-md border bg-background mt-2">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Item Name</TableHead>
												<TableHead>Type</TableHead>
												<TableHead>Price</TableHead>
												<TableHead>
													Properties
												</TableHead>
												<TableHead className="text-right">
													Actions
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{items
												.filter(
													(i) =>
														i.category ===
														category.id
												)
												.map((item) => (
													<TableRow key={item.id}>
														<TableCell className="font-medium">
															{item.name}
														</TableCell>
														<TableCell>
															<Badge
																variant="outline"
																className={`border-0 ${getTypeColorClass(
																	item.type
																)}`}
															>
																{getTypeLabel(
																	item.type
																)}
															</Badge>
														</TableCell>
														<TableCell>
															$
															{item.price.toFixed(
																2
															)}
														</TableCell>
														<TableCell>
															<div className="flex gap-1.5 flex-wrap">
																{item.requiresCollateral && (
																	<Badge
																		variant="secondary"
																		className="text-[10px] h-5"
																	>
																		ID
																		Required
																	</Badge>
																)}
																{item.isMembership && (
																	<Badge
																		variant="secondary"
																		className="text-[10px] h-5 bg-blue-50 text-blue-700 hover:bg-blue-100"
																	>
																		Membership
																	</Badge>
																)}
															</div>
														</TableCell>
														<TableCell className="text-right">
															<DropdownMenu>
																<DropdownMenuTrigger
																	asChild
																>
																	<Button
																		variant="ghost"
																		className="h-8 w-8 p-0"
																	>
																		<span className="sr-only">
																			Open
																			menu
																		</span>
																		<MoreHorizontal className="h-4 w-4" />
																	</Button>
																</DropdownMenuTrigger>
																<DropdownMenuContent align="end">
																	<DropdownMenuItem
																		onClick={() =>
																			openEditItem(
																				item
																			)
																		}
																	>
																		<Pencil className="mr-2 h-4 w-4" />
																		Edit
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={() =>
																			removeItem(
																				item.id
																			)
																		}
																		className="text-red-600"
																	>
																		<Trash2 className="mr-2 h-4 w-4" />
																		Delete
																	</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</TableCell>
													</TableRow>
												))}
											{items.filter(
												(i) =>
													i.category === category.id
											).length === 0 && (
												<TableRow>
													<TableCell
														colSpan={5}
														className="text-center py-6 text-muted-foreground"
													>
														No items in this
														category.
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</div>
								<div className="mt-4">
									<Button
										variant="outline"
										size="sm"
										onClick={() => openAddItem(category.id)}
										className="w-full border-dashed"
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Item to {category.label}
									</Button>
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>

			{/* Category Dialog */}
			<Dialog
				open={categoryDialogOpen}
				onOpenChange={setCategoryDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingCategory ? "Edit Category" : "New Category"}
						</DialogTitle>
						<DialogDescription>
							{editingCategory
								? "Modify category details."
								: "Create a new category for products."}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label>Category Label</Label>
							<Input
								value={categoryForm.label}
								onChange={(e) =>
									setCategoryForm({
										...categoryForm,
										label: e.target.value,
									})
								}
								placeholder="e.g. Merchandise"
							/>
						</div>
						<div className="space-y-2">
							<Label>Icon Style</Label>
							<Select
								value={categoryForm.iconName}
								onValueChange={(v) =>
									setCategoryForm({
										...categoryForm,
										iconName: v,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Package">
										Package (Box)
									</SelectItem>
									<SelectItem value="Ticket">
										Ticket
									</SelectItem>
									<SelectItem value="Sparkles">
										Service (Sparkles)
									</SelectItem>
									<SelectItem value="CreditCard">
										Card
									</SelectItem>
									<SelectItem value="Shirt">
										Apparel
									</SelectItem>
									<SelectItem value="Dumbbell">
										Equipment
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSaveCategory}>
							{editingCategory
								? "Save Changes"
								: "Create Category"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Item Dialog */}
			<Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingItem ? "Edit Item" : "New Item"}
						</DialogTitle>
						<DialogDescription>
							Configure product details.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label>Item Name</Label>
							<Input
								value={itemForm.name}
								onChange={(e) =>
									setItemForm({
										...itemForm,
										name: e.target.value,
									})
								}
								placeholder="e.g. Graphic T-Shirt"
							/>
						</div>
						<div className="space-y-2">
							<Label>Product Type</Label>
							<Select
								value={itemForm.type}
								onValueChange={(v: string) =>
									setItemForm({
										...itemForm,
										type: v as any,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="goods">
										<div className="flex items-center gap-2">
											<Tag className="h-4 w-4" />
											<span>Good / Product</span>
										</div>
									</SelectItem>
									<SelectItem value="service">
										<div className="flex items-center gap-2">
											<Sparkles className="h-4 w-4" />
											<span>Service</span>
										</div>
									</SelectItem>
									<SelectItem value="access">
										<div className="flex items-center gap-2">
											<Ticket className="h-4 w-4" />{" "}
											{/* Corrected icon to Ticket */}
											<span>Access / Pass</span>
										</div>
									</SelectItem>
									<SelectItem value="rental">
										<div className="flex items-center gap-2">
											<FolderPlus className="h-4 w-4" />
											<span>Rental</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Price ($)</Label>
								<Input
									type="number"
									value={itemForm.price}
									onChange={(e) =>
										setItemForm({
											...itemForm,
											price: parseFloat(e.target.value),
										})
									}
								/>
							</div>
						</div>
						<div className="flex items-center space-x-2 pt-2">
							<Checkbox
								id="collateral"
								checked={itemForm.requiresCollateral}
								onCheckedChange={(c) =>
									setItemForm({
										...itemForm,
										requiresCollateral: c === true,
									})
								}
							/>
							<Label htmlFor="collateral">
								Requires Collateral (ID Swap)
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="membership"
								checked={itemForm.isMembership}
								onCheckedChange={(c) =>
									setItemForm({
										...itemForm,
										isMembership: c === true,
									})
								}
							/>
							<Label htmlFor="membership">
								Is Membership/Plan
							</Label>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSaveItem}>
							{editingItem ? "Save Changes" : "Create Item"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
