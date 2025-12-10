import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

// Sidebar no longer needs external props for navigation
interface SidebarProps {
	onItemClick?: (componentName: string) => void; // Optional for backward compatibility if needed, but mostly unused now
}

const Sidebar: React.FC<SidebarProps> = () => {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(
		{}
	);

	const toggleSection = (sectionName: string) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionName]: !prev[sectionName],
		}));
	};

	const menuItems = [
		{
			name: "General Settings",
			// Pointing to root of admin dashboard which renders DefaultView
			path: ".",
			subItems: [],
		},
		{
			name: "Access",
			subItems: [
				{ name: "Access Settings", path: "access" },
				{ name: "Suspension Settings", path: "suspension" },
				// Placeholders for unimplemented features
				{ name: "Access Profiles", path: "#" },
				{ name: "Identification Types", path: "#" },
			],
		},
		{
			name: "Facility Management",
			subItems: [
				{ name: "Facility Management", path: "facilities" },
				{ name: "Facility Categories", path: "facility-categories" },
				{ name: "Manage Inventory", path: "inventory" }, // Seems shared or miscategorized in original, keeping as is
				{ name: "Reports", path: "#" },
			],
		},
		{
			name: "Inventory Management",
			subItems: [
				{ name: "Manage Inventory", path: "inventory" },
				{ name: "Reports", path: "#" },
			],
		},
		{
			name: "Memberships and Passes",
			subItems: [
				{ name: "Membership Settings", path: "memberships" },
				{ name: "Passes Settings", path: "passes" },
			],
		},
		{
			name: "Member Settings",
			subItems: [{ name: "Member Types", path: "member-types" }],
		},
	];

	return (
		<div className="h-full bg-gray-800 text-white p-4 overflow-y-auto">
			<ul className="space-y-2">
				{menuItems.map((item) => (
					<li key={item.name}>
						{/* Parent Item */}
						{item.subItems.length === 0 ? (
							<NavLink
								to={item.path || "#"}
								className={({ isActive }) =>
									`flex items-center justify-between p-2 rounded-md cursor-pointer ${
										isActive
											? "bg-gray-700"
											: "hover:bg-gray-700"
									}`
								}
							>
								<span className="text-sm font-medium">
									{item.name}
								</span>
							</NavLink>
						) : (
							<div
								onClick={() => toggleSection(item.name)}
								className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-700`}
							>
								<span className="text-sm font-medium">
									{item.name}
								</span>
								<ChevronRight
									className={`w-4 h-4 transition-transform ${
										openSections[item.name]
											? "rotate-90"
											: ""
									}`}
								/>
							</div>
						)}

						{/* Dropdown Items */}
						{item.subItems.length > 0 &&
							openSections[item.name] && (
								<ul className="ml-4 space-y-1">
									{item.subItems.map((subItem) => (
										<li key={subItem.name}>
											<NavLink
												to={subItem.path}
												className={({ isActive }) =>
													`block p-2 text-sm rounded-md cursor-pointer ${
														isActive &&
														subItem.path !== "#"
															? "bg-gray-600 font-medium"
															: "hover:bg-gray-700"
													}`
												}
											>
												{subItem.name}
											</NavLink>
										</li>
									))}
								</ul>
							)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
