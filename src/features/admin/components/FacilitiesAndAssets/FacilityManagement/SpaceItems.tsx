import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Edit, Building } from "lucide-react";
import { Space } from "@/services/Api/Space/spaceApi";

interface SpaceItemsProps {
	spaces: Space[];
	onBack: () => void;
	onEdit: (space: Space) => void;
	onSelect?: (space: Space) => void;
}

export default function SpaceItems({
	spaces,
	onBack,
	onEdit,
	onSelect,
}: SpaceItemsProps) {
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
		<div className="space-y-6">
			{/* Removed Header/Stats from here as they should be in the Dashboard */}
			{/* Keeping simpler structure */}

			{/* Facilities Grid */}
			{spaces.length === 0 ? (
				<Card className="col-span-full">
					<CardContent className="p-6 text-center text-muted-foreground">
						No spaces in this zone yet.
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{spaces.map((space) => (
						<Card
							key={space.id}
							className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/60 flex flex-col group cursor-pointer"
							onClick={() => onSelect && onSelect(space)}
						>
							<div className="h-2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-70 group-hover:opacity-100 transition-opacity" />
							<CardContent className="p-4 flex-1">
								<div className="flex justify-between items-start mb-3">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-full bg-primary/10 text-primary">
											<Building className="h-4 w-4" />
										</div>
										<h3 className="font-semibold text-lg hover:text-primary transition-colors">
											{space.name}
										</h3>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
										onClick={(e) => {
											e.stopPropagation();
											onEdit(space);
										}}
									>
										<Edit className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex justify-between items-center mb-4">
									{getStatusBadge(space.status || "closed")}
								</div>

								{space.description && (
									<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
										{space.description}
									</p>
								)}

								<div className="space-y-1 text-sm text-muted-foreground">
									{space.location && (
										<div className="flex items-center gap-2">
											<MapPin className="h-3 w-3" />
											<span>{space.location}</span>
										</div>
									)}
									{space.capacity && (
										<div className="flex items-center gap-2">
											<Users className="h-3 w-3" />
											<span>
												Capacity: {space.capacity}
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
