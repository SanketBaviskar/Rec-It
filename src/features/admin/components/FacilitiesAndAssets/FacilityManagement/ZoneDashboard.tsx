import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zone } from "@/services/Api/Zone/zoneApi";
import { Space } from "@/services/Api/Space/spaceApi";
import SpaceItems from "./SpaceItems";
import { Edit, Trash } from "lucide-react";

interface ZoneDashboardProps {
	zone: Zone;
	spaces: Space[];
	onEditZone: (zone: Zone) => void;
	onDeleteZone: (zoneId: number) => void;
	onAddSpace: () => void;
	onEditSpace: (space: Space) => void;
	onSelectSpace: (space: Space) => void;
}

export default function ZoneDashboard({
	zone,
	spaces,
	onEditZone,
	onDeleteZone,
	onAddSpace,
	onEditSpace,
	onSelectSpace,
}: ZoneDashboardProps) {
	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			<div className="flex justify-between items-start">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-primary">
						{zone.name}
					</h1>
					<p className="text-muted-foreground mt-1">
						Manage spaces and details for this zone.
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEditZone(zone)}
					>
						<Edit className="h-4 w-4 mr-2" /> Edit Zone
					</Button>
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDeleteZone(zone.id)}
					>
						<Trash className="h-4 w-4 mr-2" /> Delete Zone
					</Button>
				</div>
			</div>

			<Tabs defaultValue="spaces" className="w-full">
				<TabsList className="grid w-full grid-cols-3 max-w-[600px]">
					<TabsTrigger value="spaces">Spaces</TabsTrigger>
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="rules">Rules & Hours</TabsTrigger>
				</TabsList>
				<TabsContent value="spaces" className="mt-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-semibold">
							Spaces in {zone.name}
						</h3>
						<button
							onClick={onAddSpace}
							className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
						>
							+ Add Space
						</button>
					</div>
					<SpaceItems
						spaces={spaces}
						onBack={() => {}}
						onEdit={onEditSpace}
						onSelect={onSelectSpace}
					/>
				</TabsContent>
				<TabsContent value="details" className="mt-4">
					<Card>
						<CardHeader>
							<CardTitle>Zone Information</CardTitle>
							<CardDescription>
								General details about this zone.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h4 className="font-semibold text-sm text-muted-foreground">
									Description
								</h4>
								<p className="mt-1 leading-relaxed">
									{zone.description ||
										"No description provided."}
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-sm text-muted-foreground">
									Total Spaces
								</h4>
								<p className="mt-1 text-2xl font-bold">
									{spaces.length}
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="rules" className="mt-4 space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Operational Hours</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="prose text-muted-foreground whitespace-pre-wrap">
								{zone.timings ||
									"No specific operational hours set for this zone."}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Zone Rules & Regulations</CardTitle>
						</CardHeader>
						<CardContent>
							{zone.rules ? (
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									{zone.rules
										.split("\n")
										.filter((line) => line.trim())
										.map((rule, i) => (
											<li key={i}>{rule}</li>
										))}
								</ul>
							) : (
								<p className="text-muted-foreground italic">
									No specific rules set for this zone.
								</p>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
