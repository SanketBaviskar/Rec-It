import React, { useState } from "react";
import {
	ChevronRight,
	Home,
	Zap,
	Users,
	Trophy,
	Building2,
	ShoppingBag,
	Shield,
	Megaphone,
	Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sidebar no longer needs external props for navigation
interface SidebarProps {
	onItemClick?: (componentName: string) => void;
}

type SubItem =
	| { type: "header"; name: string }
	| { type: "link"; name: string; path: string };

interface MenuItem {
	name: string;
	icon: React.ElementType;
	path?: string;
	subItems: SubItem[];
}

const Sidebar: React.FC<SidebarProps> = () => {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		Dashboard: true,
		Operations: true,
	});

	const toggleSection = (sectionName: string) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionName]: !prev[sectionName],
		}));
	};

	const menuItems: MenuItem[] = [
		{
			name: "Dashboard",
			icon: Home,
			path: ".",
			subItems: [],
		},
		{
			name: "Operations",
			icon: Zap,
			subItems: [
				{ type: "header", name: "Access Control" },
				{ type: "link", name: "Live Entry Feed", path: "#" },
				{ type: "link", name: "Gate Status", path: "#" },
				{ type: "link", name: "Banned User List", path: "suspension" },
				{ type: "link", name: "Validation Rules", path: "access" },

				{ type: "header", name: "Point of Sale (POS)" },
				{ type: "link", name: "POS Settings", path: "pos-config" },

				{ type: "header", name: "Equipment Desk" },
				{
					type: "link",
					name: "Equipment Policy",
					path: "equipment-config",
				},
				{ type: "link", name: "Inventory Audit", path: "inventory" },

				{ type: "header", name: "Guest Management" },
				{ type: "link", name: "Sell Guest Pass", path: "#" },
				{ type: "link", name: "Guest History", path: "#" },
				{ type: "link", name: "Kiosk Config", path: "#" },
			],
		},
		{
			name: "Members & Users",
			icon: Users,
			subItems: [
				{ type: "header", name: "Directory" },
				{ type: "link", name: "All Users", path: "member-settings" },
				{ type: "link", name: "Family Groups", path: "#" },
				{ type: "link", name: "Staff Directory", path: "staff" },

				{ type: "header", name: "Memberships" },
				{ type: "link", name: "Plans & Passes", path: "memberships" },
				{ type: "link", name: "Sold Memberships", path: "passes" },
				{ type: "link", name: "Renewal Automation", path: "#" },
				{ type: "link", name: "Proration Rules", path: "#" },

				{ type: "header", name: "Tags & Attributes" },
				{ type: "link", name: "Tag Manager", path: "#" },
			],
		},
		{
			name: "Programs & Activities",
			icon: Trophy,
			subItems: [
				{ type: "header", name: "Intramural Sports" },
				{
					type: "link",
					name: "Intramurals Config",
					path: "intramurals",
				},

				{ type: "header", name: "Group Fitness" },
				{ type: "link", name: "Fitness Config", path: "group-fitness" },

				{ type: "header", name: "Personal Training" },
				{
					type: "link",
					name: "Training Config",
					path: "personal-training",
				},

				{ type: "header", name: "Outdoor Adventures" },
				{
					type: "link",
					name: "Adventures Config",
					path: "outdoor-adventures",
				},

				{ type: "header", name: "Aquatics" },
				{ type: "link", name: "Aquatics Config", path: "aquatics" },
			],
		},
		{
			name: "Facilities & Assets",
			icon: Building2,
			subItems: [
				{ type: "header", name: "Scheduling" },
				{ type: "link", name: "Scheduling Config", path: "scheduling" },

				{ type: "header", name: "Space Management" },
				{ type: "link", name: "Spaces & Zones", path: "facilities" },
				{
					type: "link",
					name: "Facility Categories",
					path: "facility-categories",
				},
				{ type: "link", name: "Visual Map Builder", path: "#" },
				{ type: "link", name: "Operating Hours", path: "#" },

				{ type: "header", name: "Locker Services" },
				{ type: "link", name: "Locker Config", path: "lockers" },

				{ type: "header", name: "Parking Management" },
				{ type: "link", name: "Permits", path: "#" },
				{ type: "link", name: "Enforcement", path: "#" },

				{ type: "header", name: "Maintenance" },
				{ type: "link", name: "Work Orders", path: "#" },
				{ type: "link", name: "Vendor List", path: "#" },
			],
		},
		{
			name: "Commerce & Finance",
			icon: ShoppingBag,
			subItems: [
				{ type: "header", name: "Inventory (Retail)" },
				{ type: "link", name: "Product Catalog", path: "inventory" },
				{ type: "link", name: "Stock Intake", path: "#" },
				{ type: "link", name: "Vendor Orders", path: "#" },

				{ type: "header", name: "Financials" },
				{ type: "link", name: "GL Codes", path: "#" },
				{ type: "link", name: "Revenue Reports", path: "#" },
				{ type: "link", name: "Tax Settings", path: "#" },

				{ type: "header", name: "Discounts" },
				{ type: "link", name: "Promo Codes", path: "#" },
				{ type: "link", name: "Automatic Rules", path: "#" },
			],
		},
		{
			name: "Risk & Compliance",
			icon: Shield,
			subItems: [
				{ type: "header", name: "Incidents" },
				{ type: "link", name: "Incident Config", path: "incidents" },

				{ type: "header", name: "Waivers" },
				{ type: "link", name: "Waiver Config", path: "waivers" },

				{ type: "header", name: "Staff Certifications" },
				{
					type: "link",
					name: "Certifications",
					path: "certifications",
				},
			],
		},
		{
			name: "Engagement",
			icon: Megaphone,
			subItems: [
				{ type: "header", name: "Marketing" },
				{ type: "link", name: "Marketing Config", path: "marketing" },

				{ type: "header", name: "Content Management" },
				{ type: "link", name: "Mobile App Banners", path: "#" },
				{ type: "link", name: "Digital Signage", path: "#" },

				{ type: "header", name: "Surveys" },
				{ type: "link", name: "Feedback", path: "#" },
			],
		},
		{
			name: "System Settings",
			icon: Settings,
			subItems: [
				{ type: "header", name: "General" },
				{
					type: "link",
					name: "Organization Info",
					path: "general-settings",
				},
				{ type: "link", name: "Staff Roles", path: "staff-roles" },

				{ type: "header", name: "Hardware" },
				{ type: "link", name: "Printers & Terminals", path: "#" },
				{ type: "link", name: "Gate Hardware", path: "#" },

				{ type: "header", name: "Integrations" },
				{ type: "link", name: "SSO Config", path: "#" },
				{ type: "link", name: "Payment Gateway", path: "#" },
				{ type: "link", name: "Data Import", path: "#" },
			],
		},
	];

	return (
		<div className="h-[calc(100vh-64px)] scrollbar-none bg-card text-card-foreground p-4 overflow-y-auto border-r custom-scrollbar">
			<ul className="space-y-2">
				{menuItems.map((item) => (
					<li key={item.name}>
						{/* Parent Item */}
						{item.subItems.length === 0 ? (
							<NavLink
								to={item.path || "#"}
								className={({ isActive }) =>
									`flex items-center justify-between p-2 rounded-md cursor-pointer group ${
										isActive
											? "bg-primary/10 text-primary"
											: "hover:bg-muted"
									}`
								}
							>
								<div className="flex items-center gap-3">
									<item.icon className="w-5 h-5" />
									<span className="text-sm font-semibold">
										{item.name}
									</span>
								</div>
							</NavLink>
						) : (
							<Collapsible
								open={!!openSections[item.name]}
								onOpenChange={() => toggleSection(item.name)}
								className="w-full"
							>
								<CollapsibleTrigger asChild>
									<div
										className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
											openSections[item.name]
												? "text-primary"
												: ""
										}`}
									>
										<div className="flex items-center gap-3">
											<item.icon className="w-5 h-5" />
											<span className="text-sm font-semibold">
												{item.name}
											</span>
										</div>
										<ChevronRight
											className={`w-4 h-4 transition-transform ${
												openSections[item.name]
													? "rotate-90"
													: ""
											}`}
										/>
									</div>
								</CollapsibleTrigger>
								<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
									<ul className="ml-4 space-y-1 mt-1 border-l pl-2">
										{item.subItems.map((subItem, idx) => {
											if (subItem.type === "header") {
												return (
													<li
														key={idx}
														className="px-2 pt-3 pb-1"
													>
														<span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
															{subItem.name}
														</span>
													</li>
												);
											}
											return (
												<li key={subItem.name}>
													<NavLink
														to={subItem.path}
														className={({
															isActive,
														}) =>
															`block p-2 text-sm rounded-md cursor-pointer ${
																isActive &&
																subItem.path !==
																	"#"
																	? "bg-primary/10 text-primary font-medium"
																	: "hover:bg-muted/80"
															}`
														}
													>
														{subItem.name}
													</NavLink>
												</li>
											);
										})}
									</ul>
								</CollapsibleContent>
							</Collapsible>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
