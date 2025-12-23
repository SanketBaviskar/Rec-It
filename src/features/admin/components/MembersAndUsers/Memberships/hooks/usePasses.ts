import { useState, useEffect, useCallback } from "react";
import {
	getAllPasses,
	createPass,
	updatePass,
	deletePass,
	Pass,
	CreatePassDTO,
	UpdatePassDTO,
} from "@/services/Api/Pass/passApi";
import { toast } from "sonner";

interface UsePassesReturn {
	passes: Pass[];
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
	addPass: (data: CreatePassDTO) => Promise<Pass | null>;
	editPass: (id: number, data: UpdatePassDTO) => Promise<Pass | null>;
	removePass: (id: number) => Promise<boolean>;
}

export const usePasses = (): UsePassesReturn => {
	const [passes, setPasses] = useState<Pass[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPasses = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getAllPasses();
			setPasses(Array.isArray(data) ? data : []);
		} catch {
			setError("Failed to fetch passes");
			setPasses([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPasses();
	}, [fetchPasses]);

	const addPass = async (data: CreatePassDTO): Promise<Pass | null> => {
		try {
			const newPass = await createPass(data);
			setPasses((prev) => [...prev, newPass]);
			toast.success("Pass created successfully");
			return newPass;
		} catch {
			toast.error("Failed to create pass");
			return null;
		}
	};

	const editPass = async (
		id: number,
		data: UpdatePassDTO
	): Promise<Pass | null> => {
		try {
			const updated = await updatePass(id, data);
			setPasses((prev) => prev.map((p) => (p.id === id ? updated : p)));
			toast.success("Pass updated successfully");
			return updated;
		} catch {
			toast.error("Failed to update pass");
			return null;
		}
	};

	const removePass = async (id: number): Promise<boolean> => {
		try {
			await deletePass(id);
			setPasses((prev) => prev.filter((p) => p.id !== id));
			toast.success("Pass deleted successfully");
			return true;
		} catch {
			toast.error("Failed to delete pass");
			return false;
		}
	};

	return {
		passes,
		isLoading,
		error,
		refetch: fetchPasses,
		addPass,
		editPass,
		removePass,
	};
};
