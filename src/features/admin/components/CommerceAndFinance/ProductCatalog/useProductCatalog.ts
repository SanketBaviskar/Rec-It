import { useState, useCallback, useEffect } from "react";
import { fetchInventoryCategories } from "@/services/Api/Equipment/inventorySidebar";
import { fetchEquipments } from "@/services/Api/Equipment/fetchEquipments";
import { Inventory } from "./types";
import { Equipment } from "@/services/Api/Equipment/fetchEquipments";
import { deleteInventory } from "@/services/Api/Admin/Inventory/deleteInventory";

// Combined type for Category (Inventory in some contexts)
export interface Category {
	id: number;
	name: string;
	count?: number;
}

export function useProductCatalog() {
	// Categories State
	const [categories, setCategories] = useState<Category[]>([]);
	const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);

	// Products State
	const [products, setProducts] = useState<Equipment[]>([]);
	const [isProductsLoading, setIsProductsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	// Pagination
	const [cursor, setCursor] = useState<number | null>(null);
	const [nextPageCursor, setNextPageCursor] = useState<number | null>(null);
	const [hasMore, setHasMore] = useState(false);
	const [pageStack, setPageStack] = useState<number[]>([]);
	const LIMIT = 100;

	// Helper to refresh data
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const refresh = () => setRefreshTrigger((prev) => prev + 1);

	// Fetch Categories
	const loadCategories = useCallback(async () => {
		try {
			setIsCategoriesLoading((prev) =>
				categories.length === 0 ? true : prev
			);
			const response = await fetchInventoryCategories();
			setCategories(response.data?.items || response.data || []);
		} catch (error) {
			console.error("Failed to load categories", error);
		} finally {
			setIsCategoriesLoading(false);
		}
	}, [categories.length, refreshTrigger]);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	// Reset products when category changes
	useEffect(() => {
		setCursor(null);
		setNextPageCursor(null);
		setPageStack([]);
		setProducts([]);
		// Search query persists or resets? Usually reset on category switch.
		// setSearchQuery(""); // Optional: keep search? Let's keep it for now but note behavior.
	}, [selectedCategoryId]);

	// Fetch Products
	const loadProducts = useCallback(async () => {
		setIsProductsLoading(true);
		try {
			// Note: If backend supports search, pass searchQuery here.
			// Currently assuming client-side filtering for simplicity unless Api supports it.
			// Check fetchEquipments signature: (inventoryId, cursor, limit)
			const response = await fetchEquipments(
				selectedCategoryId || undefined,
				cursor || undefined,
				LIMIT
			);

			if (response.status === "success" && response.data) {
				setProducts(response.data.items || []);
				setNextPageCursor(response.data.nextCursor);
				setHasMore(response.data.hasMore);
			} else {
				setProducts([]);
			}
		} catch (err) {
			console.error(err);
			setProducts([]);
		} finally {
			setIsProductsLoading(false);
		}
	}, [selectedCategoryId, cursor, refreshTrigger, LIMIT]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	// Pagination Handlers
	const handleNextPage = () => {
		if (nextPageCursor) {
			setPageStack((prev) => [...prev, cursor || 0]);
			setCursor(nextPageCursor);
		}
	};

	const handlePrevPage = () => {
		if (pageStack.length > 0) {
			const prevCursor = pageStack[pageStack.length - 1];
			setPageStack((prev) => prev.slice(0, -1));
			setCursor(prevCursor === 0 ? null : prevCursor);
		}
	};

	// Derived state
	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.code.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const deleteCategory = async (id: number) => {
		try {
			await deleteInventory(id);
			if (selectedCategoryId === id) {
				setSelectedCategoryId(null);
			}
			refresh();
			return true;
		} catch (error) {
			console.error("Failed to delete category", error);
			throw error;
		}
	};

	return {
		// Category Data
		categories,
		isCategoriesLoading,
		selectedCategoryId,
		setSelectedCategoryId,
		deleteCategory,

		// Product Data
		products: filteredProducts, // Expose filtered products directly
		rawProducts: products, // Expose raw if needed
		isProductsLoading,
		searchQuery,
		setSearchQuery,

		// Pagination
		hasMore,
		hasPrev: pageStack.length > 0,
		handleNextPage,
		handlePrevPage,
		totalItems: filteredProducts.length, // Only current page count

		// Actions
		refresh,
	};
}
