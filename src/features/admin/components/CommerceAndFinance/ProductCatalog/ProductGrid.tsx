import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal, PackageOpen } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	fetchEquipments,
	Equipment,
} from "@/services/Api/Equipment/fetchEquipments";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
	selectedCategoryId: number | null;
	onAddProduct: () => void;
	onEditProduct: (product: Equipment) => void;
	onReportDamage: (product: Equipment) => void;
	onViewItems: (product: Equipment) => void;
	refreshTrigger?: number; // Prop to trigger refetch
}

export function ProductGrid({
	selectedCategoryId,
	onAddProduct,
	onEditProduct,
	onReportDamage,
	onViewItems,
	refreshTrigger = 0,
}: ProductGridProps) {
	const [products, setProducts] = useState<Equipment[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const loadProducts = async () => {
			try {
				// Only show loading skeleton if we have no products (initial load or empty)
				if (products.length === 0) {
					setLoading(true);
				}
				// Pass selectedCategoryId (InventoryId) to fetcher. If null, it likely fetches all.
				const response = await fetchEquipments(
					selectedCategoryId || undefined
				);
				// Backend format maps 'data' to { items: [...] } for arrays
				const responseData = response.data as any;
				const items = responseData?.items || responseData || [];
				setProducts(Array.isArray(items) ? items : []);
			} catch (error) {
				console.error("Failed to load products", error);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};
		loadProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategoryId, refreshTrigger]);

	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.code.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
							onChange={(e) => setSearchQuery(e.target.value)}
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
				) : filteredProducts.length === 0 ? (
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
						{!searchQuery && (
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
								{filteredProducts.map((product) => (
									<TableRow key={product.id}>
										<TableCell>
											<div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
												{product.image ? (
													<img
														src={product.image}
														alt={product.name}
														className="h-full w-full object-cover"
													/>
												) : (
													<PackageOpen className="h-5 w-5 text-slate-300" />
												)}
											</div>
										</TableCell>
										<TableCell className="font-medium">
											{product.name}
										</TableCell>
										<TableCell className="font-mono text-xs text-muted-foreground">
											{product.code}
										</TableCell>
										<TableCell>
											{product.location}
										</TableCell>
										<TableCell className="text-right">
											<Badge
												variant={
													product.quantity > 0
														? "secondary"
														: "destructive"
												}
											>
												{product.quantity > 0
													? `${product.quantity} in stock`
													: "Out of Stock"}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											{product.price
												? `$${product.price.toFixed(2)}`
												: "-"}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<MoreHorizontal className="w-4 h-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() =>
															onEditProduct(
																product
															)
														}
													>
														Edit Details
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															onViewItems(product)
														}
													>
														View Items
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															onReportDamage(
																product
															)
														}
													>
														Report Damage
													</DropdownMenuItem>
													<DropdownMenuItem className="text-red-600">
														Delete Product
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
}
