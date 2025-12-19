"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentInventory } from "./EquipmentInventory";
import { EquipmentManage } from "./EquipmentManage";

import { QuickReturn } from "./QuickReturn";
import { OverdueDashboard } from "./OverdueDashboard";
import {
	Volleyball,
	Mountain,
	Key,
	PenTool,
	User,
	Loader2,
	Package,
	LogIn,
	LogOut,
	ClipboardList,
	AlertTriangle,
} from "lucide-react";
import { fetchInventoryCategories } from "@/services/Api/Equipment/inventorySidebar";
import { IndividualEquipment } from "./types";

// Type definitions based on your API response
interface Department {
	id: number;
	name: string;
	departmentIcon: string;
	createdAt: string;
	updatedAt: string;
}

interface SelectedMember {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
	membershipType: string;
	studentId?: string;
}

interface EquipmentNavBarProps {
	selectedMember: SelectedMember | null;
	onCheckout: (items: IndividualEquipment[]) => void;
	refreshTrigger?: number;
}

export function EquipmentNavBar({
	selectedMember,
	onCheckout,
	refreshTrigger,
}: EquipmentNavBarProps) {
	const [activeSection, setActiveSection] = useState("checkout");
	const [activeCategory, setActiveCategory] = useState<Department | null>(
		null
	);
	const [categories, setCategories] = useState<Department[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Map of department names to Lucide icon components
	const iconMap: Record<
		string,
		React.ComponentType<{ className?: string }>
	> = {
		Sports: Volleyball,
		Rockwalls: Mountain,
		Keys: Key,
		Stationary: PenTool,
		Staff: User,
	};

	const loadCategories = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetchInventoryCategories();
			if (response.status === "success" && response.data?.items) {
				setCategories(response.data.items);
				if (!activeCategory && response.data.items.length > 0) {
					setActiveCategory(response.data.items[0]);
				}
			} else {
				throw new Error(
					response.message || "Failed to load departments"
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to load departments";
			setError(errorMessage);
			console.error("Error loading departments:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		loadCategories();
	}, []);

	const handleRetry = () => {
		setIsLoading(true);
		setError(null);
		loadCategories();
	};

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	const getDepartmentIcon = (departmentName: string) => {
		const IconComponent = iconMap[departmentName] || Package;
		return IconComponent;
	};

	const navItems = [
		{ id: "checkout", label: "Checkout", icon: LogIn },
		{ id: "return", label: "Return", icon: LogOut },
		{ id: "active", label: "Active Loans", icon: ClipboardList },
		{ id: "overdue", label: "Overdue", icon: AlertTriangle },
	];

	return (
		<div className="flex flex-col h-full bg-background">
			{/* Top Navbar */}
			<nav className="border-b bg-card">
				<div className="px-4">
					<div className="flex items-center h-14 gap-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Button
									key={item.id}
									variant={
										activeSection === item.id
											? "default"
											: "ghost"
									}
									className={`flex items-center gap-2 ${
										activeSection === item.id
											? "bg-primary text-primary-foreground"
											: "hover:bg-accent"
									}`}
									onClick={() => handleSectionChange(item.id)}
								>
									<Icon className="h-4 w-4" />
									{item.label}
								</Button>
							);
						})}
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="flex flex-1 overflow-hidden">
				{/* Left Vertical Navbar (Only for checkout) */}
				{activeSection === "checkout" && (
					<nav className="w-52 bg-card border-r flex-shrink-0">
						{isLoading ? (
							<div className="flex justify-center items-center h-32">
								<Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
							</div>
						) : error ? (
							<div className="p-4 flex flex-col items-center text-center">
								<p className="text-sm text-destructive mb-3">
									{error}
								</p>
								<Button
									variant="outline"
									size="sm"
									onClick={handleRetry}
									className="flex items-center gap-2"
								>
									<Loader2 className="h-4 w-4" /> Retry
								</Button>
							</div>
						) : (
							<div className="py-3 px-2 space-y-1">
								<div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Categories
								</div>
								{categories.map((department) => {
									const IconComponent = getDepartmentIcon(
										department.name
									);
									const isActive =
										activeCategory?.id === department.id;
									return (
										<Button
											key={department.id}
											variant={
												isActive ? "secondary" : "ghost"
											}
											className={`w-full justify-start gap-3 h-10 ${
												isActive
													? "bg-secondary font-medium"
													: "text-muted-foreground hover:text-foreground"
											}`}
											onClick={() =>
												setActiveCategory(department)
											}
										>
											<IconComponent className="h-4 w-4 flex-shrink-0" />
											<span className="truncate">
												{department.name}
											</span>
										</Button>
									);
								})}
							</div>
						)}
					</nav>
				)}

				{/* Right Content Area */}
				<main className="flex-1 overflow-hidden bg-background">
					{activeSection === "checkout" && (
						<div className="h-full flex">
							{/* Equipment Inventory for selection */}
							<div className="flex-1 h-full">
								<EquipmentInventory
									categoryId={activeCategory?.id}
									selectedMember={selectedMember}
									onCheckout={onCheckout}
									refreshTrigger={refreshTrigger}
								/>
							</div>
							{/* Quick Scan Panel */}
						</div>
					)}

					{activeSection === "return" && (
						<div className="h-full">
							<QuickReturn
								onReturnComplete={(item, condition, notes) => {
									console.log(
										"Return complete:",
										item,
										condition,
										notes
									);
								}}
							/>
						</div>
					)}

					{activeSection === "active" && (
						<div className="h-full overflow-auto">
							<EquipmentManage />
						</div>
					)}

					{activeSection === "overdue" && (
						<div className="h-full overflow-auto">
							<OverdueDashboard />
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
