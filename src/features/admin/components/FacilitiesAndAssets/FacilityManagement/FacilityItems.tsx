import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
	FacilityCategory,
	Facility,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import { fetchFacilitiesByCategory } from "@/services/Api/Facility/facilityApi";

interface FacilityItemsProps {
	category: FacilityCategory;
	onBack: () => void;
}

export default function FacilityItems({
	category,
	onBack,
}: FacilityItemsProps) {
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadFacilities();
	}, [category.id]);

	const loadFacilities = async () => {
		setIsLoading(true);
		try {
			const data = await fetchFacilitiesByCategory(category.id);
			setFacilities(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Failed to load facilities", error);
		} finally {
			setIsLoading(false);
		}
	};

	const getStatusBadge = (status: string) => {
		const variants: Record<
			string,
			"default" | "secondary" | "destructive" | "outline"
		> = {
			available: "default",
			occupied: "secondary",
			maintenance: "outline",
			closed: "destructive",
		};
		return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="sm" onClick={onBack}>
					<ArrowLeft className="h-4 w-4 mr-2" /> Back
				</Button>
			</div>

			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					{category.name}
				</h2>
				{category.description && (
					<p className="text-muted-foreground">
						{category.description}
					</p>
				)}
			</div>

			<div className="flex gap-4 mb-4">
				<div className="p-4 bg-card border rounded-lg shadow-sm flex-1">
					<div className="text-sm text-muted-foreground">
						Total Facilities
					</div>
					<div className="text-2xl font-bold">
						{facilities.length}
					</div>
				</div>
				<div className="p-4 bg-card border rounded-lg shadow-sm flex-1">
					<div className="text-sm text-muted-foreground">
						Available
					</div>
					<div className="text-2xl font-bold text-green-600">
						{
							facilities.filter((f) => f.status === "available")
								.length
						}
					</div>
				</div>
			</div>

			{/* Facilities Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{facilities.length === 0 ? (
					<Card className="col-span-full">
						<CardContent className="p-6 text-center text-muted-foreground">
							No facilities in this category yet.
						</CardContent>
					</Card>
				) : (
					facilities.map((facility) => (
						<Card key={facility.id} className="overflow-hidden">
							<CardContent className="p-4">
								<div className="flex justify-between items-start mb-2">
									<h3 className="font-semibold">
										{facility.name}
									</h3>
									{getStatusBadge(facility.status)}
								</div>

								{facility.description && (
									<p className="text-sm text-muted-foreground mb-3">
										{facility.description}
									</p>
								)}

								<div className="space-y-1 text-sm text-muted-foreground">
									{facility.location && (
										<div className="flex items-center gap-2">
											<MapPin className="h-3 w-3" />
											<span>{facility.location}</span>
										</div>
									)}
									{facility.capacity && (
										<div className="flex items-center gap-2">
											<Users className="h-3 w-3" />
											<span>
												Capacity: {facility.capacity}
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
