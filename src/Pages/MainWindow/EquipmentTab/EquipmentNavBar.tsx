"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EquipmentInventory } from "./EquipmentInventory";
import { EquipmentManage } from "./EquipmentManage";
import {
	Volleyball,
	Mountain,
	Key,
	PenTool,
	User,
	Loader2,
	Package,
	ClipboardList,
	Settings,
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
}

export default function EquipmentNavBar({
	selectedMember,
	onCheckout,
}: EquipmentNavBarProps) {
	const [activeSection, setActiveSection] = useState("inventory");
	const [activeCategory, setActiveCategory] = useState<Department | null>(
		null
	);
	const [categories, setCategories] = useState<Department[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Map of department names to Lucide icon components
	const iconMap: Record<string, any> = {
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

	useEffect(() => {
		loadCategories();
	}, []);

	const handleRetry = () => {
		setIsLoading(true);
		setError(null);
		loadCategories();
	};

	const initialCheckedOutItems = [
		{
			id: 1,
			name: "Basketball",
			itemNumber: "BB001",
			checkedOutBy: "John Doe",
			checkedOutDate: "2024-01-20",
			dueDate: "2024-01-27",
		},
		{
			id: 2,
			name: "Tennis Racket",
			itemNumber: "TR002",
			checkedOutBy: "Jane Smith",
			checkedOutDate: "2024-01-19",
			dueDate: "2024-01-26",
		},
		{
			id: 3,
			name: "Climbing Harness",
			itemNumber: "CH003",
			checkedOutBy: "Mike Johnson",
			checkedOutDate: "2024-01-18",
			dueDate: "2024-01-25",
		},
		{
			id: 4,
			name: "Volleyball",
			itemNumber: "VB004",
			checkedOutBy: "Sarah Brown",
			checkedOutDate: "2024-01-21",
			dueDate: "2024-01-28",
		},
		{
			id: 5,
			name: "Yoga Mat",
			itemNumber: "YM005",
			checkedOutBy: "Emily Davis",
			checkedOutDate: "2024-01-22",
			dueDate: "2024-01-29",
		},
	];

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	const getDepartmentIcon = (departmentName: string) => {
		const IconComponent = iconMap[departmentName] || Package;
		return IconComponent;
	};

	const navItems = [
		{ id: "inventory", label: "Inventory", icon: Package },
		{ id: "reserve", label: "Reserve", icon: ClipboardList },
		{ id: "manage", label: "Manage", icon: Settings },
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
				{/* Left Vertical Navbar (Inventory Categories) */}
				{activeSection === "inventory" && (
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
					{activeSection === "inventory" && (
						<div className="h-full">
							<EquipmentInventory
								categoryId={activeCategory?.id}
								selectedMember={selectedMember}
								onCheckout={onCheckout}
							/>
						</div>
					)}

					{activeSection === "reserve" && (
						<div className="h-full p-6">
							<Card>
								<CardContent className="p-8 text-center">
									<ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
									<h2 className="text-xl font-semibold mb-2">
										Reserve Equipment
									</h2>
									<p className="text-muted-foreground">
										Select a member from the left panel to
										reserve equipment for them.
									</p>
								</CardContent>
							</Card>
						</div>
					)}

					{activeSection === "manage" && (
						<div className="h-full overflow-auto">
							<EquipmentManage
								initialItems={initialCheckedOutItems}
							/>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
