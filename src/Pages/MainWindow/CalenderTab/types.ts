// Calendar types - Updated to use Facility directly (no more FacilityItem)

export interface FacilityCategory {
	id: string;
	name: string;
	description?: string;
}

export interface Facility {
	id: string;
	categoryId: string;
	name: string;
	description?: string;
	capacity?: number;
	location?: string;
	status: "available" | "maintenance" | "closed" | "occupied";
	category?: FacilityCategory;
	color?: string; // UI prop for calendar display
}

export interface Booking {
	id: string;
	title: string;
	facilityId: string; // Facility ID (was facilityItemId)
	facility?: Facility;
	start: Date;
	end: Date;
	type: "booking" | "maintenance" | "event";
	status: "confirmed" | "pending" | "cancelled";
	description?: string;
	attendees?: number;
	instructor?: string;
	userId?: number;
	user?: {
		firstName: string;
		lastName: string;
		email: string;
	};
	recurring?: {
		frequency: "daily" | "weekly" | "monthly";
		endDate: Date;
	};
	createdAt?: Date;
}
