import { useState, useEffect } from "react";
import { Facility, FacilityCategory } from "../types";
import { getAllSpaces } from "@/services/Api/Space/spaceApi";
import { getAllZones } from "@/services/Api/Zone/zoneApi";

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

			const [spacesData, zonesData] = await Promise.all([
				getAllSpaces(type === "all" ? undefined : type),
				getAllZones(),
			]);

			// Map categories (Zones)
			const mappedCategories: FacilityCategory[] = zonesData.map((z) => ({
				id: z.id.toString(),
				name: z.name,
				description: z.description || "",
			}));
			setCategories(mappedCategories);

			// Map facilities (Spaces) with colors
			const mapped: Facility[] = spacesData.map((s, index) => {
				const color = FACILITY_COLORS[index % FACILITY_COLORS.length];
				return {
					id: s.id.toString(),
					categoryId: s.zoneId?.toString() || "",
					name: s.name,
					description: s.description || "",
					capacity: s.capacity || 0,
					location: s.location || "",
					status: (s.status as Facility["status"]) || "available",
					color: color,
					category: s.zone
						? {
								id: s.zone.id.toString(),
								name: s.zone.name,
								description: s.zone.description || "",
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
