import { useState, useEffect } from "react";
import { Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/hooks/use-toast";

import {
	getAllSpaces,
	deleteSpace,
	Space,
} from "@/services/Api/Space/spaceApi";
import { getAllZones, deleteZone, Zone } from "@/services/Api/Zone/zoneApi";

import SpaceSidebar from "./SpaceSidebar";
import SpaceFormDialog from "./SpaceFormDialog";
import ZoneDashboard from "./ZoneDashboard";
import SpaceDashboard from "./SpaceDashboard";

export default function SpaceManagementTab() {
	const { toast } = useToast();
	const [spaces, setSpaces] = useState<Space[]>([]);
	const [zones, setZones] = useState<Zone[]>([]);

	// Selection State
	const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
	const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddingZone, setIsAddingZone] = useState(false);
	const [activeZoneId, setActiveZoneId] = useState<number | null>(null);
	const [activeZoneName, setActiveZoneName] = useState("");
	const [initialData, setInitialData] = useState<
		Partial<Space> | Partial<Zone> | null
	>(null);

	const loadData = async () => {
		try {
			const [spacesData, zonesData] = await Promise.all([
				getAllSpaces(),
				getAllZones(),
			]);
			setSpaces(spacesData);
			setZones(zonesData);
		} catch {
			toast({
				title: "Error",
				description: "Failed to load data",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpenModal = (
		zoneId?: number,
		zoneName?: string,
		isZone: boolean = false,
		data: Partial<Space> | Partial<Zone> | null = null
	) => {
		setIsAddingZone(isZone);
		setActiveZoneId(zoneId || null);
		setActiveZoneName(zoneName || "");
		setInitialData(data);
		setIsModalOpen(true);
	};

	const handleDeleteSpace = async (id: number) => {
		if (!confirm("Delete this space?")) return;
		try {
			await deleteSpace(id);
			toast({
				title: "Deleted",
				description: "Space deleted successfully",
			});
			loadData();
			if (selectedSpaceId === id) {
				setSelectedSpaceId(null);
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to delete space",
				variant: "destructive",
			});
		}
	};

	const handleDeleteZone = async (id: number) => {
		if (!confirm("Delete this zone and all its spaces?")) return;
		try {
			await deleteZone(id);
			toast({
				title: "Deleted",
				description: "Zone deleted successfully",
			});
			loadData();
			if (selectedZoneId === id) {
				setSelectedZoneId(null);
				setSelectedSpaceId(null);
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to delete zone",
				variant: "destructive",
			});
		}
	};

	// Derived Objects
	const activeSpace = selectedSpaceId
		? spaces.find((f) => f.id === selectedSpaceId)
		: null;
	const activeZone = selectedZoneId
		? zones.find((c) => c.id === selectedZoneId)
		: null;

	return (
		<div className="flex h-full">
			{/* Left sidebar */}
			<div className="w-64 border-r bg-background p-4 flex flex-col h-full">
				<div className="flex justify-between items-center mb-4 shrink-0">
					<div className="font-semibold">Zones & Spaces</div>
					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							handleOpenModal(undefined, undefined, true)
						}
						aria-label="Add New Zone"
					>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<div className="overflow-y-auto flex-1 -mx-2 px-2">
					<SpaceSidebar
						zones={zones}
						spaces={spaces}
						selectedSpaceId={selectedSpaceId}
						selectedZoneId={selectedZoneId}
						onSelectZone={(zone) => {
							setSelectedZoneId(zone.id);
							setSelectedSpaceId(null); // Deselect space when switching zone dashboard
						}}
						onSelectSpace={(id) => {
							const space = spaces.find((f) => f.id === id);
							if (space) {
								setSelectedSpaceId(id);
								setSelectedZoneId(space.zoneId || null);
							}
						}}
						onAddSpace={(zoneId, zoneName) =>
							handleOpenModal(zoneId, zoneName, false)
						}
						onDeleteSpace={handleDeleteSpace}
						onDeleteZone={handleDeleteZone}
						onEditZone={(zone) =>
							handleOpenModal(zone.id, zone.name, true, zone)
						}
					/>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 p-6 h-full overflow-hidden flex flex-col">
				<div className="flex-1 overflow-y-auto">
					{activeSpace ? (
						<SpaceDashboard
							space={activeSpace}
							onBack={() => setSelectedSpaceId(null)}
							onEdit={() =>
								activeZone &&
								handleOpenModal(
									activeZone.id,
									activeZone.name,
									false,
									activeSpace
								)
							}
						/>
					) : activeZone ? (
						<ZoneDashboard
							zone={activeZone}
							spaces={spaces.filter(
								(f) => f.zoneId === activeZone.id
							)}
							onEditZone={(z) =>
								handleOpenModal(z.id, z.name, true, z)
							}
							onDeleteZone={handleDeleteZone}
							onAddSpace={() =>
								handleOpenModal(
									activeZone.id,
									activeZone.name,
									false
								)
							}
							onEditSpace={(f) =>
								handleOpenModal(
									activeZone.id,
									activeZone.name,
									false,
									f
								)
							}
							onSelectSpace={(f) => setSelectedSpaceId(f.id)}
						/>
					) : (
						<div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center animate-in fade-in duration-500">
							<div className="p-6 rounded-full bg-primary/5 mb-6 ring-1 ring-primary/20">
								<Building className="h-12 w-12 text-primary/60" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Select a Zone
							</h3>
							<p className="max-w-sm mx-auto text-muted-foreground/80">
								Select a zone from the sidebar to manage spaces,
								schedule, and details.
							</p>
						</div>
					)}
				</div>
			</div>

			<SpaceFormDialog
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				isAddingZone={isAddingZone}
				activeZoneId={activeZoneId}
				activeZoneName={activeZoneName}
				onSuccess={loadData}
				initialData={initialData}
			/>
		</div>
	);
}
