import { useEffect, useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { fetchInventoryCategories } from "@/services/Api/Equipment/inventorySidebar";

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

	const loadCategories = async () => {
		try {
			// Only show loading if we have no categories
			if (categories.length === 0) {
				setLoading(true);
			}
			const response = await fetchInventoryCategories();
			// Adjust based on actual API response structure (items vs data)
			setCategories(response.data?.items || response.data || []);
		} catch (error) {
			console.error("Failed to load categories", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, [refreshTrigger]);

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
						<Button
							key={category.id}
							variant="ghost"
							className={cn(
								"w-full justify-start font-normal pl-4",
								selectedCategoryId === category.id &&
									"bg-accent font-medium text-accent-foreground"
							)}
							onClick={() => onSelectCategory(category.id)}
						>
							{category.name}
						</Button>
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
