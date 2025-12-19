import { useEffect, useState, useCallback } from "react";
import { Plus, Package, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { fetchInventoryCategories } from "@/services/Api/Equipment/inventorySidebar";
import { deleteInventory } from "@/services/Api/Admin/Inventory/deleteInventory";
import { useToast } from "@/components/ui/hooks/use-toast";

interface Category {
	id: number;
	name: string;
	count?: number; // Optional count of items if API supports it
}

interface CatalogSidebarProps {
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
	onAddCategory: () => void;
	refreshTrigger?: number; // Prop to trigger refetch
}

export function CatalogSidebar({
	selectedCategoryId,
	onSelectCategory,
	onAddCategory,
	refreshTrigger = 0,
}: CatalogSidebarProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const { toast } = useToast();

	const loadCategories = useCallback(async () => {
		try {
			// Only show loading if we have no categories
			// We can't easily check current state here without dependency
			// But for fetch it's okay to just fetch
			setLoading((prev) => (categories.length === 0 ? true : prev));

			const response = await fetchInventoryCategories();
			// Adjust based on actual API response structure (items vs data)
			setCategories(response.data?.items || response.data || []);
		} catch (error) {
			console.error("Failed to load categories", error);
		} finally {
			setLoading(false);
		}
	}, [categories.length]);

	const handleDeleteCategory = async (id: number) => {
		if (
			!confirm(
				"Are you sure you want to delete this category? This might fail if it has related products."
			)
		) {
			return;
		}

		try {
			await deleteInventory(id);
			toast({
				title: "Category Deleted",
				description: "Inventory category has been removed.",
				variant: "success",
			});
			if (selectedCategoryId === id) {
				onSelectCategory(null);
			}
			loadCategories();
		} catch (error) {
			console.error("Failed to delete category", error);
			toast({
				title: "Error",
				description: "Failed to delete category.",
				variant: "destructive",
			});
		}
	};
	useEffect(() => {
		loadCategories();
	}, [refreshTrigger, loadCategories]);

	return (
		<div className="w-[280px] h-full border-r flex flex-col bg-background">
			<div className="p-4 border-b">
				<Button
					className="w-full justify-start gap-2"
					onClick={onAddCategory}
				>
					<Plus className="w-4 h-4" /> Add Category
				</Button>
			</div>

			<ScrollArea className="flex-1">
				<div className="p-2 space-y-1">
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start font-normal",
							selectedCategoryId === null &&
								"bg-accent font-medium"
						)}
						onClick={() => onSelectCategory(null)}
					>
						<Package className="w-4 h-4 mr-2" />
						All Products
					</Button>

					<Separator className="my-2" />
					<p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
						Categories
					</p>
					{categories.map((category) => (
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
									"flex-1 justify-start font-normal pl-4 h-9 hover:bg-transparent",
									selectedCategoryId === category.id &&
										"font-medium"
								)}
								onClick={() => onSelectCategory(category.id)}
							>
								{category.name}
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
											handleDeleteCategory(category.id)
										}
										className="text-red-600 focus:text-red-600"
									>
										<Trash2 className="w-4 h-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					))}

					{categories.length === 0 && !loading && (
						<div className="p-4 text-sm text-center text-muted-foreground">
							No categories found.
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
