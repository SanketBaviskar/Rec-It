import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, EllipsisVertical, Trash, Building } from "lucide-react";
import { Facility } from "@/services/Api/Facility/facilityApi";
import { FacilityCategory } from "@/services/Api/FacilityCategory/facilityCategoryApi";

interface FacilitySidebarProps {
	categories: FacilityCategory[];
	facilities: Facility[];
	onAddFacility: (categoryId: number, categoryName: string) => void;
	onDeleteFacility: (id: number) => void;
	onSelectFacility: (id: number) => void;
	selectedFacilityId: number | null;
}

const FacilitySidebar: React.FC<FacilitySidebarProps> = ({
	categories,
	facilities,
	onAddFacility,
	onDeleteFacility,
	onSelectFacility,
	selectedFacilityId,
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

	const getFacilitiesForCategory = (categoryId: number) => {
		return facilities.filter((f) => f.categoryId === categoryId);
	};

	return (
		<div className="space-y-1">
			{categories.map((category) => {
				const categoryFacilities = getFacilitiesForCategory(
					category.id
				);
				const hasChildren = categoryFacilities.length > 0;

				return (
					<div key={category.id} className="group relative">
						<div
							className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-accent rounded-sm"
							onClick={() => toggleExpand(category.id)}
						>
							<div className="flex items-center flex-1 min-w-0">
								{hasChildren ? (
									<ChevronRight
										className={`h-4 w-4 shrink-0 transition-transform ${
											expanded.has(category.id)
												? "rotate-90"
												: ""
										}`}
									/>
								) : (
									<div className="w-4 h-4 shrink-0" />
								)}
								<span className="ml-1 truncate font-medium">
									{category.name}
								</span>
							</div>

							<div
								className="p-1 hover:bg-accent/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={(e) => {
									e.stopPropagation();
									setActiveMenu(category.id);
								}}
							>
								<EllipsisVertical className="h-4 w-4" />
							</div>
						</div>

						{activeMenu === category.id && (
							<div
								ref={menuRef}
								className="absolute right-0 top-6 z-10 bg-popover shadow-md rounded-md border p-1 min-w-[160px]"
							>
								<div
									className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer text-sm"
									onClick={() => {
										onAddFacility(
											category.id,
											category.name
										);
										setActiveMenu(null);
									}}
								>
									Add Facility
								</div>
							</div>
						)}

						{expanded.has(category.id) && (
							<div className="ml-4 border-l pl-2 space-y-0.5 mt-0.5">
								{categoryFacilities.map((facility) => (
									<div
										key={facility.id}
										className={`flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer group/item ${
											selectedFacilityId === facility.id
												? "bg-accent text-accent-foreground"
												: "hover:bg-accent/50"
										}`}
										onClick={() =>
											onSelectFacility(facility.id)
										}
									>
										<Building className="h-3 w-3 shrink-0" />
										<span className="truncate text-sm flex-1">
											{facility.name}
										</span>

										<button
											className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded transition-all"
											onClick={async (e) => {
												e.stopPropagation();
												if (
													confirm(
														`Delete ${facility.name}? This will verify deletion.`
													)
												) {
													onDeleteFacility(
														facility.id
													);
												}
											}}
										>
											<Trash className="h-3 w-3" />
										</button>
									</div>
								))}
								{categoryFacilities.length === 0 && (
									<div className="text-xs text-muted-foreground px-2 py-1">
										No facilities
									</div>
								)}
							</div>
						)}
					</div>
				);
			})}
			{categories.length === 0 && (
				<div className="text-sm text-muted-foreground text-center py-4">
					No categories found.
				</div>
			)}
		</div>
	);
};

export default FacilitySidebar;
