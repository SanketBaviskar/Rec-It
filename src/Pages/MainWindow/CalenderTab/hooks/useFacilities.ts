import { useState, useEffect } from "react";
import { Facility, FacilityCategory } from "../types";
import { fetchFacilities } from "@/services/Api/Facility/facilityApi";
import { getFacilityCategories } from "@/services/Api/FacilityCategory/facilityCategoryApi";

export const useFacilities = () => {
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
	const [selectedFacility, setSelectedFacility] = useState<
		string | undefined
	>(undefined);

	const loadFacilities = async (type?: string) => {
		try {
			const FACILITY_COLORS = [
				"#3b82f6",
				"#8b5cf6",
				"#10b981",
				"#f59e0b",
				"#ec4899",
				"#6366f1",
				"#06b6d4",
				"#84cc16",
			];

			const [facilitiesData, categoriesData] = await Promise.all([
				fetchFacilities(type === "all" ? undefined : type),
				getFacilityCategories(),
			]);

			// Map categories
			const mappedCategories: FacilityCategory[] = categoriesData.map(
				(c) => ({
					id: c.id.toString(),
					name: c.name,
					description: c.description,
				})
			);
			setCategories(mappedCategories);

			// Map facilities with colors
			const mapped: Facility[] = facilitiesData.map((f, index) => {
				const color = FACILITY_COLORS[index % FACILITY_COLORS.length];
				return {
					id: f.id.toString(),
					categoryId: f.categoryId?.toString() || "",
					name: f.name,
					description: f.description,
					capacity: f.capacity,
					location: f.location,
					status: (f.status as Facility["status"]) || "available",
					color: color,
					category: f.category
						? {
								id: f.category.id.toString(),
								name: f.category.name,
								description: f.category.description,
						  }
						: undefined,
				};
			});
			setFacilities(mapped);
		} catch (error) {
			console.error("Failed to load facilities:", error);
		}
	};

	useEffect(() => {
		loadFacilities();
	}, []);

	const toggleFacilitySelection = (facilityId: string) => {
		setSelectedFacility((prev) =>
			prev === facilityId ? undefined : facilityId
		);
	};

	return {
		facilities,
		categories,
		selectedFacility,
		loadFacilities,
		toggleFacilitySelection,
	};
};
