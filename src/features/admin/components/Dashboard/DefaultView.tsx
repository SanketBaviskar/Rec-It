import { useMemo } from "react";
import {
	Users,
	DollarSign,
	Activity,
	TrendingUp,
	AlertTriangle,
	CheckCircle2,
	Clock,
	UserPlus,
	ShoppingCart,
	Calendar,
	Dumbbell,
	ArrowUpRight,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Separator } from "@/components/ui/separator";

// Mock Data
const MOCK_STATS = {
	todayCheckins: 1284,
	checkinChange: 12,
	activeCapacity: 64,
	revenueToday: 4320,
	revenueChange: 5,
	pendingTasks: 12,
	highPriorityTasks: 3,
	activeMembers: 2847,
	revenueMonth: 87450,
};

const FACILITY_ZONES = [
	{ name: "Weight Room", current: 145, capacity: 170, percentage: 85 },
	{ name: "Cardio Deck", current: 32, capacity: 70, percentage: 45 },
	{ name: "Spin Studio", current: 5, capacity: 50, percentage: 10 },
	{ name: "Pool Lanes", current: 54, capacity: 60, percentage: 90 },
	{ name: "Basketball Courts", current: 28, capacity: 40, percentage: 70 },
	{ name: "Yoga Studio", current: 12, capacity: 30, percentage: 40 },
];

const TRIAGE_ITEMS = [
	{
		id: 1,
		type: "Waiver",
		message: "15 unsigned waivers for new members",
		time: "2m ago",
		priority: "High",
		count: 15,
	},
	{
		id: 2,
		type: "Equipment",
		message: "3 items overdue (Basketball #42, Yoga Mat #18)",
		time: "15m ago",
		priority: "High",
		count: 3,
	},
	{
		id: 3,
		type: "Access",
		message: "Suspicious passback detected at Gate 1",
		time: "1h ago",
		priority: "Medium",
		count: 1,
	},
	{
		id: 4,
		type: "Membership",
		message: "24 memberships expiring this week",
		time: "2h ago",
		priority: "Medium",
		count: 24,
	},
];

const RECENT_ACTIVITIES = [
	{
		id: 1,
		type: "checkin",
		member: "John Doe",
		action: "Checked in at Main Entrance",
		time: "Just now",
	},
	{
		id: 2,
		type: "sale",
		member: "Jane Smith",
		action: "Purchased Day Pass - $15.00",
		time: "2m ago",
	},
	{
		id: 3,
		type: "checkout",
		member: "Bob Johnson",
		action: "Checked out Basketball #42",
		time: "5m ago",
	},
	{
		id: 4,
		type: "signup",
		member: "Alice Brown",
		action: "New Gold Membership signup",
		time: "12m ago",
	},
	{
		id: 5,
		type: "return",
		member: "Charlie Davis",
		action: "Returned Yoga Mat #18 (2h late)",
		time: "18m ago",
	},
];

const QUICK_ACTIONS = [
	{ icon: UserPlus, label: "New Member", path: "/admin/member-settings" },
	{ icon: ShoppingCart, label: "Sell Pass", path: "#" },
	{ icon: Dumbbell, label: "Equipment Checkout", path: "#" },
	{ icon: Calendar, label: "Book Facility", path: "#" },
];

export default function DefaultView() {
	// Calculate facility status
	const facilityStatus = useMemo(() => {
		const critical = FACILITY_ZONES.filter(
			(z) => z.percentage >= 80
		).length;
		const high = FACILITY_ZONES.filter(
			(z) => z.percentage >= 60 && z.percentage < 80
		).length;
		return { critical, high };
	}, []);

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "bg-red-100 text-red-600 border-red-200";
			case "Medium":
				return "bg-orange-100 text-orange-600 border-orange-200";
			default:
				return "bg-blue-100 text-blue-600 border-blue-200";
		}
	};

	const getActivityIcon = (type: string) => {
		switch (type) {
			case "checkin":
				return { icon: Activity, color: "text-green-600 bg-green-100" };
			case "sale":
				return { icon: DollarSign, color: "text-blue-600 bg-blue-100" };
			case "checkout":
				return {
					icon: Dumbbell,
					color: "text-purple-600 bg-purple-100",
				};
			case "signup":
				return {
					icon: UserPlus,
					color: "text-emerald-600 bg-emerald-100",
				};
			case "return":
				return {
					icon: CheckCircle2,
					color: "text-teal-600 bg-teal-100",
				};
			default:
				return { icon: Activity, color: "text-gray-600 bg-gray-100" };
		}
	};

	return (
		<div className="p-6 md:p-8 space-y-6 min-h-full">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Dashboard
					</h1>
					<p className="text-muted-foreground mt-1">
						Operational Overview & Real-time Status
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Activity className="w-4 h-4 mr-2" />
						System: Online
					</Button>
					<Button size="sm">View Full Report</Button>
				</div>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Today's Check-ins */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Today's Check-ins
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{MOCK_STATS.todayCheckins.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground flex items-center mt-1">
							<ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
							<span className="text-green-600">
								+{MOCK_STATS.checkinChange}%
							</span>{" "}
							from yesterday
						</p>
					</CardContent>
				</Card>

				{/* Active Capacity */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Capacity
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{MOCK_STATS.activeCapacity}%
						</div>
						<div className="flex items-center gap-2 mt-2">
							<Progress
								value={MOCK_STATS.activeCapacity}
								className="h-2"
							/>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{facilityStatus.critical} zones critical
						</p>
					</CardContent>
				</Card>

				{/* Revenue Today */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Revenue Today
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							${MOCK_STATS.revenueToday.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground flex items-center mt-1">
							<ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
							<span className="text-green-600">
								+{MOCK_STATS.revenueChange}%
							</span>{" "}
							from last week
						</p>
					</CardContent>
				</Card>

				{/* Pending Tasks */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Tasks
						</CardTitle>
						<AlertTriangle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{MOCK_STATS.pendingTasks}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-destructive font-medium">
								{MOCK_STATS.highPriorityTasks} High Priority
							</span>
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
				{/* Left Column - Triage Queue */}
				<div className="lg:col-span-4 space-y-6">
					{/* Triage Queue */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Triage Queue</CardTitle>
									<CardDescription>
										Items requiring immediate attention
									</CardDescription>
								</div>
								<Badge
									variant="destructive"
									className="animate-pulse"
								>
									{
										TRIAGE_ITEMS.filter(
											(i) => i.priority === "High"
										).length
									}{" "}
									Critical
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{TRIAGE_ITEMS.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
									>
										<div className="flex items-start gap-4 flex-1">
											<div
												className={`mt-1 p-2 rounded-full border ${getPriorityColor(
													item.priority
												)}`}
											>
												<AlertTriangle className="w-4 h-4" />
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<p className="text-sm font-medium">
														{item.message}
													</p>
													{item.count > 1 && (
														<Badge
															variant="secondary"
															className="text-xs"
														>
															{item.count}
														</Badge>
													)}
												</div>
												<p className="text-xs text-muted-foreground mt-1 flex items-center">
													<Clock className="w-3 h-3 mr-1" />
													{item.time} • {item.type}
												</p>
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="opacity-0 group-hover:opacity-100 transition-opacity"
										>
											Resolve
										</Button>
									</div>
								))}
								<div className="flex items-center justify-center pt-2">
									<Button
										variant="link"
										className="text-muted-foreground"
									>
										View all tasks
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions */}
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>
								Common operations and shortcuts
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-3">
								{QUICK_ACTIONS.map((action, idx) => (
									<Button
										key={idx}
										variant="outline"
										className="h-auto py-4 flex flex-col items-center gap-2"
										onClick={() => {
											if (action.path !== "#") {
												window.location.href =
													action.path;
											}
										}}
									>
										<action.icon className="w-5 h-5" />
										<span className="text-sm">
											{action.label}
										</span>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column */}
				<div className="lg:col-span-3 space-y-6">
					{/* Facility Pulse */}
					<Card>
						<CardHeader>
							<CardTitle>Facility Pulse</CardTitle>
							<CardDescription>
								Live occupancy monitoring
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{FACILITY_ZONES.map((zone) => (
									<div key={zone.name} className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium">
												{zone.name}
											</span>
											<span
												className={`font-semibold ${
													zone.percentage >= 80
														? "text-red-600"
														: zone.percentage >= 60
														? "text-orange-600"
														: "text-green-600"
												}`}
											>
												{zone.current}/{zone.capacity}
											</span>
										</div>
										<Progress
											value={zone.percentage}
											className={`h-2 ${
												zone.percentage >= 80
													? "[&>div]:bg-red-500"
													: zone.percentage >= 60
													? "[&>div]:bg-orange-500"
													: "[&>div]:bg-green-500"
											}`}
										/>
									</div>
								))}

								{facilityStatus.critical > 0 && (
									<>
										<Separator className="my-4" />
										<div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 flex gap-3">
											<TrendingUp className="w-5 h-5 text-blue-600 shrink-0" />
											<div>
												<h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
													Staffing Recommendation
												</h4>
												<p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
													{facilityStatus.critical}{" "}
													zone(s) at capacity.
													Consider redistributing
													staff to high-traffic areas.
												</p>
											</div>
										</div>
									</>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Recent Activity Feed */}
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>
								Last 5 transactions
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{RECENT_ACTIVITIES.map((activity) => {
									const { icon: Icon, color } =
										getActivityIcon(activity.type);
									return (
										<div
											key={activity.id}
											className="flex items-start gap-3"
										>
											<div
												className={`p-2 rounded-full ${color}`}
											>
												<Icon className="w-3 h-3" />
											</div>
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium leading-none">
													{activity.member}
												</p>
												<p className="text-xs text-muted-foreground">
													{activity.action}
												</p>
											</div>
											<span className="text-xs text-muted-foreground">
												{activity.time}
											</span>
										</div>
									);
								})}
								<div className="flex items-center justify-center pt-2">
									<Button
										variant="link"
										className="text-muted-foreground"
									>
										View all activity
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
