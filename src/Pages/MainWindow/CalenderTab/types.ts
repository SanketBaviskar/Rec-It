export interface Facility {
	id: string;
	name: string;
	type: string;
	capacity: number;
	location: string;
	available?: boolean;
	color?: string; // Additional UI prop
	items?: FacilityItem[];
}

export interface FacilityItem {
	id: string;
	facilityId: string;
	name: string;
	status: "available" | "maintenance" | "closed";
	facility?: Facility;
	color?: string; // Inherited from parent facility for display
}

export interface Booking {
	id: string;
	title: string;
	facilityItemId: string; // FacilityItem ID
	facilityItem?: FacilityItem;
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
