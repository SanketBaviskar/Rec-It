import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Plus,
	Package,
	MoreHorizontal,
	Trash2,
	Pencil,
	Tag,
	Sparkles,
	Ticket,
	FolderPlus,
	Search,
	CreditCard,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
	usePOSConfig,
	POSItem,
	POSCategory,
	BUILTIN_CATEGORIES,
} from "./usePOSConfig";
import MembershipsManager from "./components/MembershipsManager";
import PassesManager from "./components/PassesManager";

export default function POSConfig() {
	const {
		categories,
		items,
		addCategory,
		removeCategory,
		updateCategory,
		addItem,
		updateItem,
	} = usePOSConfig();
	const { toast } = useToast();

	// Selected Category
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<string>("memberships");

	// Category Dialog State
	const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<POSCategory | null>(
		null,
	);
	const [categoryForm, setCategoryForm] = useState<Partial<POSCategory>>({
		label: "",
		iconName: "Package",
	});

	// Item Dialog State
	const [itemDialogOpen, setItemDialogOpen] = useState(false);
	const [editingItem] = useState<POSItem | null>(null);
	const [itemForm, setItemForm] = useState<Partial<POSItem>>({
		name: "",
		price: 0,
		requiresCollateral: false,
		isMembership: false,
		type: "goods",
	});

	// Search
	const [searchQuery, setSearchQuery] = useState("");

	const allCategories = [...BUILTIN_CATEGORIES, ...categories];

	const isBuiltinCategory = BUILTIN_CATEGORIES.some(
		(c) => c.id === selectedCategoryId,
	);

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
				label: categoryForm.label!,
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
			setSelectedCategoryId(id);
		}
		setCategoryDialogOpen(false);
	};

	const handleDeleteCategory = (id: string) => {
		if (confirm("Delete this category and all its items?")) {
			removeCategory(id);
			setSelectedCategoryId("memberships");
			toast({ title: "Category Deleted" });
		}
	};

	// --- Item Handlers (only for custom categories) ---

	const handleSaveItem = () => {
		if (!itemForm.name || !selectedCategoryId) return;

		const baseItem = {
			name: itemForm.name,
			price: itemForm.price || 0,
			category: selectedCategoryId,
			requiresCollateral: itemForm.requiresCollateral || false,
			isMembership: itemForm.isMembership || false,
			type: itemForm.type || "goods",
			iconName: "Ticket",
		};

		if (editingItem) {
			updateItem({ ...editingItem, ...baseItem } as POSItem);
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
	const getIcon = (iconName?: string) => {
		switch (iconName) {
			case "Ticket":
				return Ticket;
			case "Package":
				return Package;
			case "Sparkles":
				return Sparkles;
			case "Tag":
				return Tag;
			case "CreditCard":
				return CreditCard;
			default:
				return Package;
		}
	};

	// Get items for selected category (backend or local)
	const getDisplayItems = () => {
		if (
			selectedCategoryId === "memberships" ||
			selectedCategoryId === "passes"
		) {
			return []; // Managed by their own components
		}

		// Custom category items
		return items
			.filter((item) => item.category === selectedCategoryId)
			.filter(
				(item) =>
					!searchQuery ||
					item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
	};

	const displayItems = getDisplayItems();
	const selectedCategory = allCategories.find(
		(c) => c.id === selectedCategoryId,
	);

	// Get item count for a category (system categories omit the numbers as they manage their own lists)
	const getCategoryItemCount = (categoryId: string) => {
		if (categoryId === "memberships" || categoryId === "passes")
			return null;
		return items.filter((i) => i.category === categoryId).length;
	};

	return (
		<div className="flex h-full w-full overflow-hidden border rounded-lg shadow-sm bg-background">
			{/* Left Sidebar - Categories */}
			<div className="w-[280px] h-full border-r flex flex-col bg-background">
				<div className="p-4 border-b">
					<Button
						className="w-full justify-start gap-2"
						onClick={openAddCategory}
					>
						<Plus className="w-4 h-4" /> Add Category
					</Button>
				</div>

				<ScrollArea className="flex-1">
					<div className="p-2 space-y-1">
						{allCategories.map((category) => {
							const Icon = getIcon(category.iconName);
							const itemCount = getCategoryItemCount(category.id);
							const isBuiltin = BUILTIN_CATEGORIES.some(
								(c) => c.id === category.id,
							);
							return (
								<div
									key={category.id}
									className={cn(
										"group flex items-center w-full rounded-md hover:bg-accent/50",
										selectedCategoryId === category.id &&
											"bg-accent text-accent-foreground",
									)}
								>
									<Button
										variant="ghost"
										className={cn(
											"flex-1 justify-start font-normal pl-4 h-10 hover:bg-transparent",
											selectedCategoryId ===
												category.id && "font-medium",
										)}
										onClick={() =>
											setSelectedCategoryId(category.id)
										}
									>
										<Icon className="w-4 h-4 mr-2" />
										{category.label}
										{itemCount !== null && (
											<span className="ml-auto text-xs text-muted-foreground">
												{itemCount}
											</span>
										)}
									</Button>
									{!isBuiltin && (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity mr-1"
												>
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														openEditCategory(
															category as POSCategory,
														)
													}
												>
													<Pencil className="w-4 h-4 mr-2" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleDeleteCategory(
															category.id,
														)
													}
													className="text-red-600 focus:text-red-600"
												>
													<Trash2 className="w-4 h-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									)}
								</div>
							);
						})}
					</div>
				</ScrollArea>
			</div>

			{/* Main Content - Items List */}
			{selectedCategoryId === "memberships" ? (
				<MembershipsManager />
			) : selectedCategoryId === "passes" ? (
				<PassesManager />
			) : (
				<div className="flex-1 min-w-0 flex flex-col">
					{/* Header */}
					<div className="p-6 border-b bg-card">
						<div className="flex justify-between items-center">
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-2xl font-bold tracking-tight">
										{selectedCategory?.label || "Items"}
									</h1>
								</div>
								<p className="text-sm text-muted-foreground mt-1">
									{displayItems.length} items
								</p>
							</div>
						</div>

						{/* Search */}
						<div className="relative mt-4 max-w-md">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search items..."
								className="pl-9 bg-background"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					{/* Items Table */}
					<ScrollArea className="flex-1 p-6">
						<div className="rounded-md border bg-card">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Details</TableHead>
										{!isBuiltinCategory && (
											<TableHead className="text-right">
												Actions
											</TableHead>
										)}
									</TableRow>
								</TableHeader>
								<TableBody>
									{displayItems.length === 0 && (
										<TableRow>
											<TableCell
												colSpan={5}
												className="text-center py-10 text-muted-foreground"
											>
												{searchQuery
													? "No items match your search."
													: "No items in this category. Click 'Add Item' to create one."}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</ScrollArea>
				</div>
			)}

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
								: "Create a new custom category for merchandise or services."}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label>Category Name</Label>
							<Input
								value={categoryForm.label}
								onChange={(e) =>
									setCategoryForm({
										...categoryForm,
										label: e.target.value,
									})
								}
								placeholder="e.g. Merchandise, Snacks, Rentals"
							/>
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

			{/* Item Dialog (only for non-system categories) */}
			<Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingItem ? "Edit Item" : "New Item"}
						</DialogTitle>
						<DialogDescription>
							Add merchandise or services to sell at the register.
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
								placeholder="e.g. T-Shirt, Water Bottle"
							/>
						</div>
						<div className="space-y-2">
							<Label>Type</Label>
							<Select
								value={itemForm.type}
								onValueChange={(v: string) =>
									setItemForm({
										...itemForm,
										type: v as POSItem["type"],
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
									<SelectItem value="rental">
										<div className="flex items-center gap-2">
											<FolderPlus className="h-4 w-4" />
											<span>Rental</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Price ($)</Label>
							<Input
								type="number"
								value={itemForm.price}
								onChange={(e) =>
									setItemForm({
										...itemForm,
										price: parseFloat(e.target.value) || 0,
									})
								}
							/>
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
