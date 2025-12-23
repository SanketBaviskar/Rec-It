import { useState } from "react";
import { CategorySidebar } from "./components/CategorySidebar";
import { ProductList } from "./components/ProductList";
import AddNewInventoryForm from "./components/Forms/AddNewInventory";
import AddNewEquipmentForm from "./components/Forms/AddNewEquipment";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ReportDamageDialog } from "./components/Forms/ReportDamageDialog";
import { ProductItemsDialog } from "./components/ProductItemsDialog";

import { Equipment } from "@/services/Api/Equipment/fetchEquipments";
import { useProductCatalog } from "./useProductCatalog";

export default function ProductCatalog() {
	const {
		// Category Data
		categories,
		isCategoriesLoading,
		selectedCategoryId,
		setSelectedCategoryId,
		deleteCategory,

		// Product Data
		products,
		isProductsLoading,
		searchQuery,
		setSearchQuery,

		// Pagination
		hasMore,
		hasPrev,
		handleNextPage,
		handlePrevPage,
		totalItems,

		// Actions
		refresh,
	} = useProductCatalog();

	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [isAddProductOpen, setIsAddProductOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Equipment | null>(
		null
	);
	const [reportDamageProduct, setReportDamageProduct] =
		useState<Equipment | null>(null);
	const [viewItemsProduct, setViewItemsProduct] = useState<Equipment | null>(
		null
	);

	return (
		<div className="flex h-full w-full overflow-hidden border rounded-lg shadow-sm bg-background">
			{/* Left Sidebar */}
			<CategorySidebar
				categories={categories}
				selectedCategoryId={selectedCategoryId}
				onSelectCategory={setSelectedCategoryId}
				onAddCategory={() => setIsAddCategoryOpen(true)}
				onDeleteCategory={deleteCategory}
				isLoading={isCategoriesLoading}
			/>

			{/* Main Content */}
			<div className="flex-1 min-w-0">
				<ProductList
					products={products}
					loading={isProductsLoading}
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					selectedCategoryId={selectedCategoryId}
					onAddProduct={() => {
						setEditingProduct(null);
						setIsAddProductOpen(true);
					}}
					onEditProduct={(product) => {
						setEditingProduct(product);
						setIsAddProductOpen(true);
					}}
					onReportDamage={setReportDamageProduct}
					onViewItems={setViewItemsProduct}
					hasPrev={hasPrev}
					hasNext={hasMore}
					onPrevPage={handlePrevPage}
					onNextPage={handleNextPage}
					totalItems={totalItems}
				/>
			</div>

			{/* Modals */}

			{/* Add Category Modal */}
			<Dialog
				open={isAddCategoryOpen}
				onOpenChange={setIsAddCategoryOpen}
			>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<AddNewInventoryForm
						onComplete={() => {
							setIsAddCategoryOpen(false);
							refresh();
						}}
					/>
				</DialogContent>
			</Dialog>

			{/* Add Product Modal */}
			<Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<AddNewEquipmentForm
						inventoryId={selectedCategoryId?.toString() || ""}
						inventoryName=""
						mode={editingProduct ? "edit" : "create"}
						equipment={editingProduct || undefined}
						equipmentId={editingProduct?.id?.toString() || ""}
						onComplete={(newEquipment?: any) => {
							setIsAddProductOpen(false);
							setEditingProduct(null);
							refresh();
							// Optional: open items view if created new
							if (newEquipment && !editingProduct) {
								setViewItemsProduct(newEquipment);
							}
						}}
					/>
				</DialogContent>
			</Dialog>

			{/* Report Damage Dialog */}
			<ReportDamageDialog
				product={reportDamageProduct}
				open={!!reportDamageProduct}
				onOpenChange={(open) => {
					if (!open) setReportDamageProduct(null);
				}}
				onComplete={refresh}
			/>

			{/* Product Items Dialog */}
			<ProductItemsDialog
				product={viewItemsProduct}
				open={!!viewItemsProduct}
				onOpenChange={(open) => {
					if (!open) setViewItemsProduct(null);
				}}
			/>
		</div>
	);
}
