import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchEquipments } from "@/services/Api/Equipment/fetchEquipments";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
	id: number;
	name: string;
	code: string;
	quantity: number;
	location: string;
	image: string | null;
}

interface ProductGridProps {
	selectedCategoryId: number | null;
	onAddProduct: () => void;
	onEditProduct: (product: Product) => void;
	refreshTrigger?: number; // Prop to trigger refetch
}

export function ProductGrid({
	selectedCategoryId,
	onAddProduct,
	onEditProduct,
	refreshTrigger = 0,
}: ProductGridProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

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
			setProducts(response.data?.items || response.data || []);
		} catch (error) {
			console.error("Failed to load products", error);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
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
					<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="flex flex-col space-y-3">
								<Skeleton className="h-[125px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
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
					<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<Card
								key={product.id}
								className="overflow-hidden group hover:shadow-md transition-all duration-200"
							>
								<div className="aspect-video bg-slate-100 relative flex items-center justify-center">
									{product.image ? (
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<PackageOpen className="w-10 h-10 text-slate-300" />
									)}
									<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="secondary"
													size="icon"
													className="h-8 w-8"
												>
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														onEditProduct(product)
													}
												>
													Edit Details
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Delete Product
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
								<CardHeader className="p-4 pb-2">
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-base font-semibold leading-tight">
												{product.name}
											</CardTitle>
											<p className="text-xs text-muted-foreground mt-1 font-mono">
												{product.code}
											</p>
										</div>
									</div>
								</CardHeader>
								<CardFooter className="p-4 pt-0 flex justify-between items-center">
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
									<span className="text-xs text-muted-foreground">
										{product.location}
									</span>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
