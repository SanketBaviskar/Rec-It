import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, EllipsisVertical, Trash, Building } from "lucide-react";
import { Space } from "@/services/Api/Space/spaceApi";
import { Zone } from "@/services/Api/Zone/zoneApi";

interface SpaceSidebarProps {
	zones: Zone[];
	spaces: Space[];
	onAddSpace: (zoneId: number, zoneName: string) => void;
	onDeleteSpace: (id: number) => void;
	onDeleteZone: (id: number) => void;
	onEditZone: (zone: Zone) => void;
	onSelectSpace: (id: number) => void;
	onSelectZone: (zone: Zone) => void;
	selectedSpaceId: number | null;
	selectedZoneId: number | null;
}

const SpaceSidebar: React.FC<SpaceSidebarProps> = ({
	zones,
	spaces,
	onAddSpace,
	onDeleteSpace,
	onDeleteZone,
	onEditZone,
	onSelectSpace,
	onSelectZone,
	selectedSpaceId,
	selectedZoneId,
}) => {
	const [expanded, setExpanded] = useState<Set<number>>(new Set());
	const [activeMenu, setActiveMenu] = useState<number | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setActiveMenu(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleExpand = (id: number) => {
		setExpanded((prev) =>
			new Set(prev).has(id)
				? new Set([...prev].filter((i) => i !== id))
				: new Set([...prev, id])
		);
	};

	const getSpacesForZone = (zoneId: number) => {
		return spaces.filter((s) => s.zoneId === zoneId);
	};

	return (
		<div className="space-y-1">
			{zones.map((zone) => {
				const zoneSpaces = getSpacesForZone(zone.id);
				const hasChildren = zoneSpaces.length > 0;
				const isSelected =
					selectedZoneId === zone.id && !selectedSpaceId;

				return (
					<div key={zone.id} className="group relative">
						<div
							className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
								isSelected
									? "bg-primary/10 text-primary font-medium"
									: "hover:bg-accent text-foreground"
							}`}
							onClick={() => {
								toggleExpand(zone.id);
								onSelectZone(zone);
							}}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									toggleExpand(zone.id);
									onSelectZone(zone);
								}
							}}
						>
							<div className="flex items-center flex-1 min-w-0">
								{hasChildren ? (
									<ChevronRight
										className={`h-4 w-4 shrink-0 transition-transform ${
											expanded.has(zone.id)
												? "rotate-90"
												: ""
										}`}
									/>
								) : (
									<div className="w-4 h-4 shrink-0" />
								)}
								<span className="ml-1 truncate font-medium">
									{zone.name}
								</span>
							</div>

							<div
								className="p-1 hover:bg-accent/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={(e) => {
									e.stopPropagation();
									setActiveMenu(zone.id);
								}}
							>
								<EllipsisVertical className="h-4 w-4" />
							</div>
						</div>

						{activeMenu === zone.id && (
							<div
								ref={menuRef}
								className="absolute right-0 top-6 z-10 bg-popover shadow-md rounded-md border p-1 min-w-[160px]"
							>
								<div
									className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer text-sm"
									onClick={() => {
										onAddSpace(zone.id, zone.name);
										setActiveMenu(null);
									}}
								>
									Add Space
								</div>
								<div
									className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer text-sm"
									onClick={() => {
										onEditZone(zone);
										setActiveMenu(null);
									}}
								>
									Edit Zone
								</div>
								<div
									className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
									onClick={() => {
										onDeleteZone(zone.id);
										setActiveMenu(null);
									}}
								>
									Delete Zone
								</div>
							</div>
						)}

						{expanded.has(zone.id) && (
							<div className="ml-4 border-l pl-2 space-y-0.5 mt-0.5">
								{zoneSpaces.map((space) => (
									<div
										key={space.id}
										className={`flex items-center gap-2 px-2 py-2 rounded-sm cursor-pointer group/item focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
											selectedSpaceId === space.id
												? "bg-primary/10 text-primary font-medium"
												: "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
										}`}
										onClick={() => onSelectSpace(space.id)}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" ||
												e.key === " "
											) {
												e.preventDefault();
												onSelectSpace(space.id);
											}
										}}
									>
										<Building
											className={`h-4 w-4 shrink-0 transition-colors ${
												selectedSpaceId === space.id
													? "text-primary"
													: "text-muted-foreground group-hover/item:text-foreground"
											}`}
										/>
										<span className="truncate text-sm flex-1">
											{space.name}
										</span>

										<button
											className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded transition-all"
											onClick={async (e) => {
												e.stopPropagation();
												if (
													confirm(
														`Delete ${space.name}? This will verify deletion.`
													)
												) {
													onDeleteSpace(space.id);
												}
											}}
										>
											<Trash className="h-3 w-3" />
										</button>
									</div>
								))}
								{zoneSpaces.length === 0 && (
									<div className="text-xs text-muted-foreground px-2 py-1">
										No spaces
									</div>
								)}
							</div>
						)}
					</div>
				);
			})}
			{zones.length === 0 && (
				<div className="text-sm text-muted-foreground text-center py-4">
					No zones found.
				</div>
			)}
		</div>
	);
};

export default SpaceSidebar;
