import {
	Users,
	Settings,
	ClipboardList,
	Dumbbell,
	AlertTriangle,
	Activity,
	CheckCircle2,
	Clock,
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

// Mock Data for "Facility Pulse"
const facilityZones = [
	{ name: "Weight Room", capacity: 85, status: "Critical" },
	{ name: "Cardio Deck", capacity: 45, status: "Normal" },
	{ name: "Spin Studio", capacity: 10, status: "Low" },
	{ name: "Pool Lanes", capacity: 90, status: "Critical" },
];

// Mock Data for "Triage Queue"
const triageItems = [
	{
		id: 1,
		type: "Waiver",
		message: "Unsigned waiver for Jane Doe (Class in 10m)",
		time: "2m ago",
		priority: "High",
	},
	{
		id: 2,
		type: "Equipment",
		message: "Bball #42 overdue by 2 hours",
		time: "15m ago",
		priority: "Medium",
	},
	{
		id: 3,
		type: "Access",
		message: "Suspicious passback detected at Gate 1",
		time: "1h ago",
		priority: "Low",
	},
];

export default function DefaultView() {
	return (
		<div className="p-8 space-y-8 bg-gray-50/50 min-h-full">
			{/* 1. Header with Stats */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Dashboard
					</h1>
					<p className="text-muted-foreground mt-1">
						Operational Overview & Real-time Status
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Activity className="w-4 h-4 mr-2" /> System Status:
						Online
					</Button>
					<Button>View Full Report</Button>
				</div>
			</div>

			{/* 2. Top Level Stats (Mocked) */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Check-ins
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,284</div>
						<p className="text-xs text-muted-foreground">
							+12% from yesterday
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Capacity
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">64%</div>
						<p className="text-xs text-muted-foreground">
							High traffic warning
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Revenue Today
						</CardTitle>
						<Dumbbell className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$4,320</div>
						<p className="text-xs text-muted-foreground">
							+5% from last Monday
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Tasks
						</CardTitle>
						<ClipboardList className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12</div>
						<p className="text-xs text-muted-foreground">
							3 High Priority
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
				{/* 3. Triage Queue Widget (Actionable) */}
				<div className="lg:col-span-4 space-y-6">
					<Card className="h-full">
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
									3 Critical
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{triageItems.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
									>
										<div className="flex items-start gap-4">
											<div
												className={`mt-1 p-2 rounded-full ${
													item.priority === "High"
														? "bg-red-100 text-red-600"
														: "bg-orange-100 text-orange-600"
												}`}
											>
												<AlertTriangle className="w-4 h-4" />
											</div>
											<div>
												<p className="text-sm font-medium leading-none">
													{item.message}
												</p>
												<p className="text-xs text-muted-foreground mt-1 flex items-center">
													<Clock className="w-3 h-3 mr-1" />{" "}
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
				</div>

				{/* 4. Facility Pulse Widget (Real-time Visuals) */}
				<div className="lg:col-span-3 space-y-6">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Facility Pulse</CardTitle>
							<CardDescription>
								Live occupancy heatmaps
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{facilityZones.map((zone) => (
									<div key={zone.name} className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium">
												{zone.name}
											</span>
											<span
												className={`${
													zone.capacity > 80
														? "text-red-500 font-bold"
														: "text-muted-foreground"
												}`}
											>
												{zone.capacity}%
											</span>
										</div>
										<Progress
											value={zone.capacity}
											className={`h-2 ${
												zone.capacity > 80
													? "[&>div]:bg-red-500"
													: ""
											}`}
										/>
									</div>
								))}

								<div className="pt-4 border-t mt-4">
									<div className="rounded-lg bg-blue-50 p-4 flex gap-3">
										<CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
										<div>
											<h4 className="text-sm font-semibold text-blue-900">
												Staffing Recommendation
											</h4>
											<p className="text-xs text-blue-700 mt-1">
												Weight room is near capacity.
												Redeploy 1 floor staff from
												Cardio Deck to Weight Room.
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
