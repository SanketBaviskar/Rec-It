import { useEffect, useState } from "react";
import { Plus, Search, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ProductRow } from "./components/ProductRow";
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

	// Pagination state
	const [cursor, setCursor] = useState<number | null>(null);
	const [hasMore, setHasMore] = useState(false);
	const [pageStack, setPageStack] = useState<number[]>([]); // To handle "Previous" navigation by storing start cursor of each page
	const LIMIT = 100;

	// Reset pagination on category change or search change (if we were doing server-side search, but search is client-side for now? Wait, plan implies we just paginate the fetch. But search is currently client-side filtering.)
	// Ideally search should be server-side too for true cursor pagination, but the request was "cursor based pagination".
	// If I keep client-side search, I must fetch ALL items or search will be broken (only searching loaded page).
	// But usually "cursor pagination" implies we don't fetch all.
	// For this task, I will assume we paginate the main list. Search will only filter the *current page* unless I move search to backend.
	// However, moving search to backend was not effectively scoped. I will paginate the *fetch*.
	// WARNING: Client-side search on paginated data is bad UX (misses items).
	// I will PROCEED with paginating the fetch.
	// ALSO RESET when category changes.
	useEffect(() => {
		setCursor(null);
		setPageStack([]);
		setProducts([]);
	}, [selectedCategoryId]);

	// We need to store the `nextForwardCursor` to know where to go next
	// State `cursor` is the cursor used to fetch the CURRENT page.
	// So we need another state `nextPageCursor`.
	const [nextPageCursor, setNextPageCursor] = useState<number | null>(null);

	useEffect(() => {
		const fetchPage = async () => {
			setLoading(true);
			try {
				const response = await fetchEquipments(
					selectedCategoryId || undefined,
					cursor || undefined,
					LIMIT
				);
				if (response.status === "success" && response.data) {
					// response.data is PaginatedResponse<Equipment>
					setProducts(response.data.items || []);
					setNextPageCursor(response.data.nextCursor);
					setHasMore(response.data.hasMore);
				} else {
					setProducts([]);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchPage();
	}, [selectedCategoryId, cursor, refreshTrigger]);

	const handleNext = () => {
		if (nextPageCursor) {
			setPageStack((prev) => [...prev, cursor || 0]); // Store current cursor (0 for null/start)
			setCursor(nextPageCursor);
		}
	};

	const handlePrev = () => {
		if (pageStack.length > 0) {
			const prevCursor = pageStack[pageStack.length - 1];
			setPageStack((prev) => prev.slice(0, -1));
			setCursor(prevCursor === 0 ? null : prevCursor);
		}
	};

	// Local filtering of the current page for search
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
					onClick={handlePrev}
					disabled={pageStack.length === 0 || loading}
				>
					Previous
				</Button>
				<div className="text-sm text-muted-foreground">
					{loading
						? "Loading..."
						: `Showing ${filteredProducts.length} items`}
				</div>
				<Button
					variant="outline"
					onClick={handleNext}
					disabled={!hasMore || loading}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
