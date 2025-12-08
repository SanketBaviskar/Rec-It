export type NavSection = "inventory" | "reserve" | "manage";

export interface Department {
	id: number;
	name: string;
	departmentIcon: string;
}

export interface Member {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
	membershipType: string;
	studentId?: string;
	email?: string;
	phone?: string;
}

// Enhanced Equipment type matching backend schema
export interface Equipment {
	id: number;
	name: string;
	code: string;
	image?: string;
	quantity: number;
	availableQuantity?: number;
	price?: number;
	replacementFees?: number;
	description?: string;
	location?: string;
	inventoryId: number;
	inventory?: { name: string };
	createdAt?: string;
	updatedAt?: string;
}

// Legacy type for backward compatibility
export interface EquipmentItem {
	id: string;
	name: string;
	photoUrl?: string;
	quantity: number;
}

// Checked out equipment record
export interface CheckedOutItem {
	id: number;
	equipmentId: number;
	equipment: Equipment;
	memberId: string;
	memberName: string;
	memberStudentId?: string;
	checkedOutAt: string;
	dueDate: string;
	returnedAt?: string;
	isOverdue?: boolean;
}

// Cart item for checkout process
export interface CartItem {
	equipment: Equipment;
	quantity: number;
}

// Checkout request
export interface CheckoutRequest {
	memberId: string;
	items: { equipmentId: number; quantity: number }[];
	dueDate: string;
}

// Individual equipment item with unique ID
export interface IndividualEquipment {
	id: string; // Unique ID like "BB001"
	equipmentTypeId: string; // Reference to parent equipment type
	equipmentName: string;
	status: "available" | "checked-out";
	checkedOutTo?: string; // Member ID if checked out
	checkedOutAt?: string;
	dueDate?: string;
}

// Member's checked out equipment for display
export interface MemberEquipment {
	id: string;
	itemId: string; // Individual equipment ID
	name: string;
	checkedOutDate: string;
	dueDate: string;
	checkoutRecordId?: number; // Backend checkout record ID for checkin
}
