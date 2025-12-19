import { useState, useEffect } from "react";
import { Facility } from "../types";
import { fetchFacilities } from "@/services/Api/Facility/facilityApi";

export const useFacilities = () => {
	const [facilities, setFacilities] = useState<Facility[]>([]);
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
			const data = await fetchFacilities(
				type === "all" ? undefined : type
			);
			const mapped = data.map((f, index) => {
				const color = FACILITY_COLORS[index % FACILITY_COLORS.length];
				return {
					...f,
					id: f.id.toString(),
					type: f.type || "Facility",
					color: color,
					items:
						f.items?.map((item) => ({
							...item,
							id: item.id.toString(),
							facilityId: f.id.toString(),
							color: color, // Inherit color from parent
						})) || [],
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
		selectedFacility,
		loadFacilities,
		toggleFacilitySelection,
	};
};
