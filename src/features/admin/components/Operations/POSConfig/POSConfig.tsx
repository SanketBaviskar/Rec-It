import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
	RefreshCw,
	Lock,
	ExternalLink,
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
import { usePOSConfig, POSItem, POSCategory } from "./usePOSConfig";
import {
	getAllMemberships,
	Membership,
} from "@/services/Api/Membership/membershipApi";
import { getAllPasses, Pass } from "@/services/Api/Pass/passApi";

// System categories that are fetched from backend (read-only)
const SYSTEM_CATEGORIES = [
	{
		id: "memberships",
		label: "Memberships",
		iconName: "CreditCard",
		isSystem: true,
	},
	{ id: "passes", label: "Passes", iconName: "Ticket", isSystem: true },
];

export default function POSConfig() {
	const {
		categories,
		items,
		addCategory,
		removeCategory,
		updateCategory,
		addItem,
		removeItem,
		updateItem,
	} = usePOSConfig();
	const { toast } = useToast();

	// Backend data
	const [memberships, setMemberships] = useState<Membership[]>([]);
	const [passes, setPasses] = useState<Pass[]>([]);
	const [isLoadingBackend, setIsLoadingBackend] = useState(false);

	// Selected Category
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<string>("memberships");

	// Category Dialog State
	const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<POSCategory | null>(
		null
	);
	const [categoryForm, setCategoryForm] = useState<Partial<POSCategory>>({
		label: "",
		iconName: "Package",
	});

	// Item Dialog State
	const [itemDialogOpen, setItemDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<POSItem | null>(null);
	const [itemForm, setItemForm] = useState<Partial<POSItem>>({
		name: "",
		price: 0,
		requiresCollateral: false,
		isMembership: false,
		type: "goods",
	});

	// Search
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch backend data on mount
	useEffect(() => {
		fetchBackendData();
	}, []);

	const fetchBackendData = async () => {
		setIsLoadingBackend(true);
		try {
			const [membershipData, passData] = await Promise.all([
				getAllMemberships(),
				getAllPasses(),
			]);
			setMemberships(membershipData);
			setPasses(passData);
		} catch (error) {
			console.error("Error fetching backend data:", error);
			toast({
				title: "Error",
				description:
					"Failed to load memberships and passes from server.",
				variant: "destructive",
			});
		} finally {
			setIsLoadingBackend(false);
		}
	};

	// Combine system and custom categories
	const allCategories = [
		...SYSTEM_CATEGORIES,
		...categories.map((c) => ({ ...c, isSystem: false })),
	];

	// Check if selected category is system (read-only)
	const isSystemCategory = SYSTEM_CATEGORIES.some(
		(c) => c.id === selectedCategoryId
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
			setSelectedCategoryId("memberships"); // Reset to system category
			toast({ title: "Category Deleted" });
		}
	};

	// --- Item Handlers (only for custom categories) ---
	const openAddItem = () => {
		if (!selectedCategoryId || isSystemCategory) return;
		setEditingItem(null);
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
		setItemForm({ ...item });
		setItemDialogOpen(true);
	};

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
		if (selectedCategoryId === "memberships") {
			return memberships
				.filter((m) => m.status === "Active")
				.filter(
					(m) =>
						!searchQuery ||
						m.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((m) => ({
					id: `membership-${m.id}`,
					name: m.name,
					price: m.price || 0,
					type: "membership" as const,
					duration: m.duration,
					description: m.description,
				}));
		}

		if (selectedCategoryId === "passes") {
			return passes
				.filter((p) => p.active)
				.filter(
					(p) =>
						!searchQuery ||
						p.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((p) => ({
					id: `pass-${p.id}`,
					name: p.name,
					price: p.price,
					type: "pass" as const,
					passCategory: p.passCategory,
					visits: p.visits,
				}));
		}

		// Custom category items
		return items
			.filter((item) => item.category === selectedCategoryId)
			.filter(
				(item) =>
					!searchQuery ||
					item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
	};

	const displayItems = getDisplayItems();
	const selectedCategory = allCategories.find(
		(c) => c.id === selectedCategoryId
	);

	// Get item count for a category
	const getCategoryItemCount = (categoryId: string) => {
		if (categoryId === "memberships") {
			return memberships.filter((m) => m.status === "Active").length;
		}
		if (categoryId === "passes") {
			return passes.filter((p) => p.active).length;
		}
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
						{/* System Categories */}
						<p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
							<Lock className="w-3 h-3" />
							System Categories
						</p>

						{SYSTEM_CATEGORIES.map((category) => {
							const Icon = getIcon(category.iconName);
							const itemCount = getCategoryItemCount(category.id);
							return (
								<div
									key={category.id}
									className={cn(
										"group flex items-center w-full rounded-md hover:bg-accent/50",
										selectedCategoryId === category.id &&
											"bg-accent text-accent-foreground"
									)}
								>
									<Button
										variant="ghost"
										className={cn(
											"flex-1 justify-start font-normal pl-4 h-10 hover:bg-transparent",
											selectedCategoryId ===
												category.id && "font-medium"
										)}
										onClick={() =>
											setSelectedCategoryId(category.id)
										}
									>
										<Icon className="w-4 h-4 mr-2" />
										{category.label}
										<span className="ml-auto text-xs text-muted-foreground">
											{isLoadingBackend
												? "..."
												: itemCount}
										</span>
									</Button>
								</div>
							);
						})}

						<Separator className="my-3" />

						{/* Custom Categories */}
						<p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							Custom Categories
						</p>

						{categories.map((category) => {
							const Icon = getIcon(category.iconName);
							const itemCount = getCategoryItemCount(category.id);
							return (
								<div
									key={category.id}
									className={cn(
										"group flex items-center w-full rounded-md hover:bg-accent/50",
										selectedCategoryId === category.id &&
											"bg-accent text-accent-foreground"
									)}
								>
									<Button
										variant="ghost"
										className={cn(
											"flex-1 justify-start font-normal pl-4 h-10 hover:bg-transparent",
											selectedCategoryId ===
												category.id && "font-medium"
										)}
										onClick={() =>
											setSelectedCategoryId(category.id)
										}
									>
										<Icon className="w-4 h-4 mr-2" />
										{category.label}
										<span className="ml-auto text-xs text-muted-foreground">
											{itemCount}
										</span>
									</Button>
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
													openEditCategory(category)
												}
											>
												<Pencil className="w-4 h-4 mr-2" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													handleDeleteCategory(
														category.id
													)
												}
												className="text-red-600 focus:text-red-600"
											>
												<Trash2 className="w-4 h-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							);
						})}

						{categories.length === 0 && (
							<div className="p-4 text-sm text-center text-muted-foreground">
								No custom categories yet.
							</div>
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Main Content - Items List */}
			<div className="flex-1 min-w-0 flex flex-col">
				{/* Header */}
				<div className="p-6 border-b bg-card">
					<div className="flex justify-between items-center">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="text-2xl font-bold tracking-tight">
									{selectedCategory?.label || "Items"}
								</h1>
								{isSystemCategory && (
									<Badge
										variant="secondary"
										className="text-xs"
									>
										<Lock className="w-3 h-3 mr-1" />
										Read-only
									</Badge>
								)}
							</div>
							<p className="text-sm text-muted-foreground mt-1">
								{displayItems.length} items
								{isSystemCategory &&
									" • Managed in dedicated admin section"}
							</p>
						</div>
						<div className="flex gap-2">
							{isSystemCategory ? (
								<>
									<Button
										variant="outline"
										onClick={fetchBackendData}
										disabled={isLoadingBackend}
									>
										<RefreshCw
											className={cn(
												"w-4 h-4 mr-2",
												isLoadingBackend &&
													"animate-spin"
											)}
										/>
										Refresh
									</Button>
									<Button variant="outline" asChild>
										<a
											href={
												selectedCategoryId ===
												"memberships"
													? "/admin/memberships"
													: "/admin/passes"
											}
										>
											<ExternalLink className="w-4 h-4 mr-2" />
											Manage {selectedCategory?.label}
										</a>
									</Button>
								</>
							) : (
								<Button onClick={openAddItem}>
									<Plus className="w-4 h-4 mr-2" />
									Add Item
								</Button>
							)}
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
									{!isSystemCategory && (
										<TableHead className="text-right">
											Actions
										</TableHead>
									)}
								</TableRow>
							</TableHeader>
							<TableBody>
								{/* Memberships View */}
								{selectedCategoryId === "memberships" &&
									displayItems.map((item: any) => (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												{item.name}
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className="bg-indigo-50 text-indigo-700 border-0"
												>
													Membership
												</Badge>
											</TableCell>
											<TableCell>
												{item.price
													? `$${item.price.toFixed(
															2
													  )}`
													: "Free"}
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className="text-xs"
												>
													{item.duration}
												</Badge>
											</TableCell>
										</TableRow>
									))}

								{/* Passes View */}
								{selectedCategoryId === "passes" &&
									displayItems.map((item: any) => (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												{item.name}
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className="bg-teal-50 text-teal-700 border-0"
												>
													{item.passCategory?.replace(
														"_",
														" "
													)}
												</Badge>
											</TableCell>
											<TableCell>
												${item.price.toFixed(2)}
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className="text-xs"
												>
													{item.visits} visits
												</Badge>
											</TableCell>
										</TableRow>
									))}

								{/* Custom Items View */}
								{!isSystemCategory &&
									displayItems.map((item: any) => (
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
													{getTypeLabel(item.type)}
												</Badge>
											</TableCell>
											<TableCell>
												${item.price.toFixed(2)}
											</TableCell>
											<TableCell>
												<div className="flex gap-1.5 flex-wrap">
													{item.requiresCollateral && (
														<Badge
															variant="secondary"
															className="text-[10px] h-5"
														>
															ID Required
														</Badge>
													)}
													{item.isMembership && (
														<Badge
															variant="secondary"
															className="text-[10px] h-5 bg-blue-50 text-blue-700"
														>
															Subscription
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

								{displayItems.length === 0 && (
									<TableRow>
										<TableCell
											colSpan={isSystemCategory ? 4 : 5}
											className="text-center py-10 text-muted-foreground"
										>
											{searchQuery
												? "No items match your search."
												: isSystemCategory
												? `No active ${selectedCategory?.label.toLowerCase()} found. Create them in the dedicated admin section.`
												: "No items in this category. Click 'Add Item' to create one."}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</ScrollArea>
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
						<div className="space-y-2">
							<Label>Icon</Label>
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
										Package
									</SelectItem>
									<SelectItem value="Tag">Tag</SelectItem>
									<SelectItem value="Sparkles">
										Sparkles
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
