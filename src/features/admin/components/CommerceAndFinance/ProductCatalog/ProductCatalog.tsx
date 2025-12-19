import { useState } from "react";
import { CatalogSidebar } from "./CatalogSidebar";
import { ProductGrid } from "./ProductGrid";
import AddNewInventoryForm from "./components/Forms/AddNewInventory";
import AddNewEquipmentForm from "./components/Forms/AddNewEquipment";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ReportDamageDialog } from "./components/Forms/ReportDamageDialog";
import { ProductItemsDialog } from "./components/ProductItemsDialog";

import { Equipment } from "@/services/Api/Equipment/fetchEquipments";

export default function ProductCatalog() {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);
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
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="flex h-full w-full overflow-hidden border rounded-lg shadow-sm bg-background">
			{/* Left Sidebar */}
			<CatalogSidebar
				selectedCategoryId={selectedCategoryId}
				onSelectCategory={setSelectedCategoryId}
				onAddCategory={() => setIsAddCategoryOpen(true)}
				refreshTrigger={refreshKey}
			/>

			{/* Main Content */}
			<div className="flex-1 min-w-0">
				<ProductGrid
					selectedCategoryId={selectedCategoryId}
					onAddProduct={() => {
						setEditingProduct(null);
						setIsAddProductOpen(true);
					}}
					onEditProduct={(product) => {
						setEditingProduct(product);
						setIsAddProductOpen(true);
					}}
					onReportDamage={(product) => {
						setReportDamageProduct(product);
					}}
					onViewItems={(product) => {
						setViewItemsProduct(product);
					}}
					refreshTrigger={refreshKey}
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
							handleRefresh();
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
						onComplete={() => {
							setIsAddProductOpen(false);
							setEditingProduct(null);
							handleRefresh();
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
				onComplete={handleRefresh}
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
