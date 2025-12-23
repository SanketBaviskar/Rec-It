import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { Space } from "@/services/Api/Space/spaceApi";

interface SpaceDashboardProps {
	space: Space;
	onBack: () => void;
	onEdit: () => void;
}

export default function SpaceDashboard({
	space,
	onBack,
	onEdit,
}: SpaceDashboardProps) {
	const getStatusBadge = (status: string) => {
		const variants: Record<
			string,
			"default" | "secondary" | "destructive" | "outline"
		> = {
			available: "default",
			occupied: "secondary",
			maintenance: "outline",
			closed: "destructive",
		};
		return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
	};

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			<div className="flex flex-col gap-4">
				<Button
					variant="ghost"
					size="sm"
					className="w-fit"
					onClick={onBack}
				>
					<ArrowLeft className="h-4 w-4 mr-2" /> Back to Zone
				</Button>
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-3xl font-bold tracking-tight text-primary">
								{space.name}
							</h1>
							{getStatusBadge(space.status || "closed")}
						</div>
						<div className="flex items-center gap-2 mt-2 text-muted-foreground">
							{space.location && (
								<>
									<MapPin className="h-4 w-4" />
									<span>{space.location}</span>
									<span>•</span>
								</>
							)}
							<Users className="h-4 w-4" />
							<span>Capacity: {space.capacity || "N/A"}</span>
						</div>
					</div>
					<Button onClick={onEdit} variant="outline">
						Edit Space
					</Button>
				</div>
			</div>

			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-3 max-w-[450px]">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="schedule">Schedule</TabsTrigger>
					<TabsTrigger value="rules">Rules</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="mt-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>About this Space</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed">
								{space.description ||
									"No description provided."}
							</p>
						</CardContent>
					</Card>

					{/* Status Overview */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									{" "}
									Current Occupancy{" "}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									0 / {space.capacity || 50}
								</div>
								<div className="text-xs text-muted-foreground mt-1">
									0% Full
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									{" "}
									Daily Traffic{" "}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">0</div>
								<div className="text-xs text-muted-foreground mt-1">
									+0% from yesterday
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									{" "}
									Status{" "}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold capitalize">
									{space.status}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="schedule" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="h-5 w-5" />
								Operating Hours & Schedule
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="prose text-muted-foreground whitespace-pre-wrap">
								{space.timings ||
									"No specific timings defined. Default building hours apply."}
							</div>
							{/* Enhancement: Add a calendar or list of current bookings here */}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="rules" className="space-y-4 pt-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								Usage Rules
							</CardTitle>
						</CardHeader>
						<CardContent>
							{space.rules ? (
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									{space.rules
										.split("\n")
										.filter((line) => line.trim())
										.map((rule, i) => (
											<li key={i}>{rule}</li>
										))}
								</ul>
							) : (
								<p className="text-muted-foreground italic">
									No specific rules listed.
								</p>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
