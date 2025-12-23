import { useState, useEffect, useCallback } from "react";
import {
	getAllMemberships,
	createMembership,
	updateMembership,
	deleteMembership,
	Membership,
	CreateMembershipDTO,
	UpdateMembershipDTO,
} from "@/services/Api/Membership/membershipApi";
import { toast } from "sonner";

interface UseMembershipsReturn {
	memberships: Membership[];
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
	addMembership: (data: CreateMembershipDTO) => Promise<Membership | null>;
	editMembership: (
		id: number,
		data: UpdateMembershipDTO
	) => Promise<Membership | null>;
	removeMembership: (id: number) => Promise<boolean>;
}

export const useMemberships = (): UseMembershipsReturn => {
	const [memberships, setMemberships] = useState<Membership[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchMemberships = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getAllMemberships();
			// Ensure we always set an array
			setMemberships(Array.isArray(data) ? data : []);
		} catch (err) {
			setError("Failed to fetch memberships");
			setMemberships([]); // Reset to empty array on error
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchMemberships();
	}, [fetchMemberships]);

	const addMembership = async (
		data: CreateMembershipDTO
	): Promise<Membership | null> => {
		try {
			const newMembership = await createMembership(data);
			setMemberships((prev) => [...prev, newMembership]);
			toast.success("Membership plan created successfully");
			return newMembership;
		} catch {
			toast.error("Failed to create membership plan");
			return null;
		}
	};

	const editMembership = async (
		id: number,
		data: UpdateMembershipDTO
	): Promise<Membership | null> => {
		try {
			const updated = await updateMembership(id, data);
			setMemberships((prev) =>
				prev.map((m) => (m.id === id ? updated : m))
			);
			toast.success("Membership plan updated successfully");
			return updated;
		} catch {
			toast.error("Failed to update membership plan");
			return null;
		}
	};

	const removeMembership = async (id: number): Promise<boolean> => {
		try {
			await deleteMembership(id);
			setMemberships((prev) => prev.filter((m) => m.id !== id));
			toast.success("Membership plan deleted successfully");
			return true;
		} catch {
			toast.error("Failed to delete membership plan");
			return false;
		}
	};

	return {
		memberships,
		isLoading,
		error,
		refetch: fetchMemberships,
		addMembership,
		editMembership,
		removeMembership,
	};
};
