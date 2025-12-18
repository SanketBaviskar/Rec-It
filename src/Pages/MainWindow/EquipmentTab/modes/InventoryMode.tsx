import { EquipmentInventory } from "../EquipmentInventory";

// Wrapper component that provides the needed props
export function InventoryMode() {
	return (
		<div className="h-full p-4">
			<EquipmentInventory
				categoryId={undefined}
				selectedMember={null}
				onCheckout={() => {}}
			/>
		</div>
	);
}
