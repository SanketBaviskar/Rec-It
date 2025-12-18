import { useState } from "react";
import { CatalogSidebar } from "./CatalogSidebar";
import { ProductGrid } from "./ProductGrid";
import AddNewInventoryForm from "./components/Forms/AddNewInventory";
import AddNewEquipmentForm from "./components/Forms/AddNewEquipment";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ProductCatalog() {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [isAddProductOpen, setIsAddProductOpen] = useState(false);
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
					onAddProduct={() => setIsAddProductOpen(true)}
					onEditProduct={(product) => console.log("Edit", product)}
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
						mode="create"
						equipment={undefined}
						equipmentId=""
						onComplete={() => {
							setIsAddProductOpen(false);
							handleRefresh();
						}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
