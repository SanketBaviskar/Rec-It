import { Plus, Search, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ProductRow } from "./ProductRow";
import { Equipment } from "@/services/Api/Equipment/fetchEquipments";

interface ProductListProps {
	products: Equipment[];
	loading: boolean;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	selectedCategoryId: number | null;
	onAddProduct: () => void;
	onEditProduct: (product: Equipment) => void;
	onReportDamage: (product: Equipment) => void;
	onViewItems: (product: Equipment) => void;
	// Pagination
	hasPrev: boolean;
	hasNext: boolean;
	onPrevPage: () => void;
	onNextPage: () => void;
	totalItems: number; // For "Showing X items"
}

export function ProductList({
	products,
	loading,
	searchQuery,
	onSearchChange,
	selectedCategoryId,
	onAddProduct,
	onEditProduct,
	onReportDamage,
	onViewItems,
	hasPrev,
	hasNext,
	onPrevPage,
	onNextPage,
	totalItems,
}: ProductListProps) {
	return (
		<div className="flex flex-col h-full bg-slate-50/50">
			{/* Toolbar */}
			<div className="flex items-center justify-between p-6 border-b bg-background">
				<div className="flex items-center gap-4 w-full max-w-lg">
					<div className="relative w-full">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search products by name or code..."
							className="pl-9 bg-slate-50 border-slate-200"
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex gap-2">
					{selectedCategoryId ? (
						<Button onClick={onAddProduct}>
							<Plus className="w-4 h-4 mr-2" /> Add Product
						</Button>
					) : (
						<Button disabled variant="outline">
							Select a Category to Add Product
						</Button>
					)}
				</div>
			</div>

			{/* Grid Content */}
			<div className="flex-1 overflow-y-auto p-6">
				{loading ? (
					<div className="space-y-3">
						{[1, 2, 3, 4, 5].map((i) => (
							<Skeleton key={i} className="h-12 w-full" />
						))}
					</div>
				) : products.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-muted-foreground">
						<div className="bg-slate-100 p-4 rounded-full mb-4">
							<PackageOpen className="w-8 h-8 text-slate-400" />
						</div>
						<h3 className="text-lg font-medium text-slate-900">
							No products found
						</h3>
						<p className="max-w-sm text-center mt-1">
							{searchQuery
								? "Try adjusting your search terms."
								: "Get started by creating a new product in this category."}
						</p>
						{!searchQuery && selectedCategoryId && (
							<Button
								variant="outline"
								className="mt-4"
								onClick={onAddProduct}
							>
								Create Product
							</Button>
						)}
					</div>
				) : (
					<div className="rounded-md border bg-card">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[80px]">
										Image
									</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Code</TableHead>
									<TableHead>Location</TableHead>
									<TableHead className="text-right">
										Quantity
									</TableHead>
									<TableHead className="text-right">
										Price
									</TableHead>
									<TableHead className="w-[50px]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<ProductRow
										key={product.id}
										product={product}
										onEditProduct={onEditProduct}
										onReportDamage={onReportDamage}
										onViewItems={onViewItems}
									/>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			{/* Pagination Controls */}
			<div className="p-4 border-t bg-background flex items-center justify-between">
				<Button
					variant="outline"
					onClick={onPrevPage}
					disabled={!hasPrev || loading}
				>
					Previous
				</Button>
				<div className="text-sm text-muted-foreground">
					{loading ? "Loading..." : `Showing ${totalItems} items`}
				</div>
				<Button
					variant="outline"
					onClick={onNextPage}
					disabled={!hasNext || loading}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
