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
import { useToast } from "@/components/ui/hooks/use-toast";
import { Category } from "../useProductCatalog";

interface CategorySidebarProps {
	categories: Category[];
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
	onAddCategory: () => void;
	onDeleteCategory: (id: number) => Promise<boolean>;
	isLoading: boolean;
}

export function CategorySidebar({
	categories,
	selectedCategoryId,
	onSelectCategory,
	onAddCategory,
	onDeleteCategory,
	isLoading,
}: CategorySidebarProps) {
	const { toast } = useToast();

	const handleDelete = async (id: number) => {
		if (
			!confirm(
				"Are you sure you want to delete this category? This might fail if it has related products."
			)
		) {
			return;
		}

		try {
			await onDeleteCategory(id);
			toast({
				title: "Category Deleted",
				description: "Inventory category has been removed.",
				variant: "success", // Ensure 'success' variant exists or use 'default'
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete category.",
				variant: "destructive",
			});
		}
	};

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
								{category.count !== undefined && (
									<span className="ml-auto text-xs text-muted-foreground">
										{category.count}
									</span>
								)}
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
											handleDelete(category.id)
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

					{categories.length === 0 && !isLoading && (
						<div className="p-4 text-sm text-center text-muted-foreground">
							No categories found.
						</div>
					)}
					{isLoading && (
						<div className="p-4 text-sm text-center text-muted-foreground">
							Loading categories...
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
