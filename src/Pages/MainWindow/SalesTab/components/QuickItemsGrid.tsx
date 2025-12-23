import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
	CreditCard,
	Dumbbell,
	Package,
	Search,
	Sparkles,
	Ticket,
	LucideIcon,
	Shirt,
	RefreshCw,
} from "lucide-react";
import { usePOSConfig } from "@/features/admin/components/Operations/POSConfig/usePOSConfig";
import {
	getAllMemberships,
	Membership,
} from "@/services/Api/Membership/membershipApi";
import { getAllPasses, Pass } from "@/services/Api/Pass/passApi";

// Icon mapping helper
const getIcon = (iconName?: string) => {
	switch (iconName) {
		case "Ticket":
			return Ticket;
		case "Package":
			return Package;
		case "Dumbbell":
			return Dumbbell;
		case "CreditCard":
			return CreditCard;
		case "Sparkles":
			return Sparkles;
		case "Shirt":
			return Shirt;
		default:
			return Ticket;
	}
};

// Unified item interface for cart
export interface SaleItem {
	id: string;
	name: string;
	price: number;
	category: string;
	type: "membership" | "pass" | "goods" | "service" | "rental" | "access";
	icon?: LucideIcon;
	requiresCollateral?: boolean;
	isMembership?: boolean;
	// Backend references
	membershipId?: number;
	passId?: number;
	// Additional metadata
	duration?: string;
	visits?: number;
	passCategory?: string;
}

interface QuickItemsGridProps {
	onAddItem: (item: SaleItem) => void;
	disabled?: boolean;
}

// Category definitions
interface Category {
	id: string;
	label: string;
	iconName: string;
	isSystem?: boolean;
}

const SYSTEM_CATEGORIES: Category[] = [
	{
		id: "memberships",
		label: "Memberships",
		iconName: "CreditCard",
		isSystem: true,
	},
	{ id: "passes", label: "Passes", iconName: "Ticket", isSystem: true },
];

export function QuickItemsGrid({ onAddItem, disabled }: QuickItemsGridProps) {
	const [activeTab, setActiveTab] = useState("memberships");
	const [searchQuery, setSearchQuery] = useState("");

	// Backend data
	const [memberships, setMemberships] = useState<Membership[]>([]);
	const [passes, setPasses] = useState<Pass[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load config from hook (for custom merchandise)
	const { items: posItems, categories: posCategories } = usePOSConfig();

	// Fetch backend data on mount
	useEffect(() => {
		fetchBackendData();
	}, []);

	const fetchBackendData = async () => {
		setIsLoading(true);
		try {
			const [membershipData, passData] = await Promise.all([
				getAllMemberships(),
				getAllPasses(),
			]);
			setMemberships(membershipData.filter((m) => m.status === "Active"));
			setPasses(passData.filter((p) => p.active));
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// System category IDs that we manage via backend
	const SYSTEM_CATEGORY_IDS = ["memberships", "passes"];

	// Combine system categories with custom POS categories (filtering out duplicates)
	const allCategories: Category[] = [
		...SYSTEM_CATEGORIES,
		...posCategories
			.filter((c) => !SYSTEM_CATEGORY_IDS.includes(c.id))
			.map((c) => ({ ...c, isSystem: false })),
	];

	// Get items for current category
	const getDisplayItems = (): SaleItem[] => {
		if (activeTab === "memberships") {
			return memberships
				.filter(
					(m) =>
						!searchQuery ||
						m.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((m) => ({
					id: `membership-${m.id}`,
					name: m.name,
					price: m.price || 0,
					category: "memberships",
					type: "membership" as const,
					icon: CreditCard,
					isMembership: true,
					membershipId: m.id,
					duration: m.duration,
				}));
		}

		if (activeTab === "passes") {
			return passes
				.filter(
					(p) =>
						!searchQuery ||
						p.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((p) => ({
					id: `pass-${p.id}`,
					name: p.name,
					price: p.price,
					category: "passes",
					type: "pass" as const,
					icon: Ticket,
					passId: p.id,
					visits: p.visits,
					passCategory: p.passCategory,
				}));
		}

		// Custom POS categories
		return posItems
			.filter((item) => item.category === activeTab)
			.filter(
				(item) =>
					!searchQuery ||
					item.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
			.map((item) => ({
				...item,
				icon: getIcon(item.iconName),
			}));
	};

	const displayItems = getDisplayItems();

	const getTypeBadgeStyle = (type: string) => {
		switch (type) {
			case "membership":
				return "bg-indigo-100 text-indigo-700 border-indigo-200";
			case "pass":
				return "bg-teal-100 text-teal-700 border-teal-200";
			case "goods":
				return "bg-slate-100 text-slate-600 border-slate-200";
			case "service":
				return "bg-purple-100 text-purple-600 border-purple-200";
			case "rental":
				return "bg-orange-100 text-orange-600 border-orange-200";
			default:
				return "bg-gray-100 text-gray-600 border-gray-200";
		}
	};

	const getTypeLabel = (type: string) => {
		if (!type) return null;
		return type.charAt(0).toUpperCase() + type.slice(1);
	};

	return (
		<Card className="h-full border bg-card shadow-sm flex flex-col rounded-xl overflow-hidden">
			<div className="flex h-full">
				{/* Sidebar Categories */}
				<div className="w-52 border-r bg-card flex flex-col flex-shrink-0">
					<div className="py-3 px-2 space-y-1">
						<div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
							<span>Categories</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={fetchBackendData}
								disabled={isLoading}
							>
								<RefreshCw
									className={`h-3 w-3 ${
										isLoading ? "animate-spin" : ""
									}`}
								/>
							</Button>
						</div>
						{allCategories.map((cat) => {
							const Icon = getIcon(cat.iconName);
							const isActive = activeTab === cat.id;
							const itemCount =
								cat.id === "memberships"
									? memberships.length
									: cat.id === "passes"
									? passes.length
									: posItems.filter(
											(i) => i.category === cat.id
									  ).length;

							return (
								<Button
									key={cat.id}
									variant={isActive ? "secondary" : "ghost"}
									className={`w-full justify-start gap-3 h-10 ${
										isActive
											? "bg-secondary font-medium"
											: "text-muted-foreground hover:text-foreground"
									}`}
									onClick={() => setActiveTab(cat.id)}
								>
									<Icon className="h-4 w-4 flex-shrink-0" />
									<span className="truncate flex-1 text-left">
										{cat.label}
									</span>
									{cat.isSystem && (
										<Badge
											variant="outline"
											className="text-[10px] h-5 px-1.5"
										>
											{isLoading ? "..." : itemCount}
										</Badge>
									)}
								</Button>
							);
						})}
					</div>
				</div>

				{/* Right Content */}
				<div className="flex-1 flex flex-col min-w-0 bg-background">
					{/* Search Header */}
					<div className="p-4 border-b bg-card">
						<div className="relative max-w-md">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search items..."
								className="pl-9 bg-background"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					{/* Grid Content */}
					<div className="flex-1 overflow-y-auto p-4 content-start">
						{isLoading &&
						(activeTab === "memberships" ||
							activeTab === "passes") ? (
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Skeleton
										key={i}
										className="h-32 rounded-xl"
									/>
								))}
							</div>
						) : (
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
								{displayItems.map((item) => {
									const Icon = item.icon || Ticket;
									return (
										<button
											key={item.id}
											onClick={() => onAddItem(item)}
											disabled={disabled}
											className={`
												group relative flex flex-col p-4 rounded-xl border bg-card text-left
												transition-all duration-200 ease-out
												hover:shadow-lg hover:border-primary/50
												disabled:opacity-50 disabled:cursor-not-allowed
											`}
										>
											<div className="flex items-start justify-between gap-2 mb-3">
												{/* Icon */}
												<div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
													<Icon className="h-6 w-6 text-primary" />
												</div>

												{/* Price */}
												<div className="text-right">
													<p className="text-lg font-bold text-primary">
														{item.price === 0
															? "Free"
															: `$${item.price}`}
													</p>
												</div>
											</div>

											{/* Name */}
											<p className="font-medium text-sm line-clamp-2 min-h-[2.5rem] mb-1">
												{item.name}
											</p>

											{/* Status Details */}
											<div className="flex flex-wrap gap-1 mt-auto">
												{/* Type Badge */}
												<span
													className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${getTypeBadgeStyle(
														item.type
													)}`}
												>
													{getTypeLabel(item.type)}
												</span>

												{/* Duration for memberships */}
												{item.duration && (
													<span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200 font-medium">
														{item.duration}
													</span>
												)}

												{/* Visits for passes */}
												{item.visits && (
													<span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200 font-medium">
														{item.visits} visits
													</span>
												)}

												{item.requiresCollateral && (
													<span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded border border-amber-500/20 font-medium">
														ID Required
													</span>
												)}
											</div>
										</button>
									);
								})}
							</div>
						)}

						{!isLoading && displayItems.length === 0 && (
							<div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
								<Package className="h-10 w-10 mb-2 opacity-20" />
								<p className="text-sm font-medium">
									No items found
								</p>
								<p className="text-xs">
									{searchQuery
										? "Try different search terms"
										: activeTab === "memberships" ||
										  activeTab === "passes"
										? "Configure items in admin settings"
										: "Add items in POS Configuration"}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}
