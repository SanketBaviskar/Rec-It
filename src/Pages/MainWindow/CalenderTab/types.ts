export interface Facility {
	id: string;
	name: string;
	type: string;
	capacity: number;
	location: string;
	available?: boolean;
	color?: string; // Additional UI prop
}

export interface Booking {
	id: string;
	title: string;
	facility: string; // Facility ID
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
