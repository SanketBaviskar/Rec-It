import { Package, User, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MemberEquipment } from "./types";

interface MemberDetailsProps {
	userDetails: {
		firstName?: string;
		lastName?: string;
		studentId?: string;
		avatarUrl?: string;
		membershipType?: string;
	} | null;
	checkedOutItems: MemberEquipment[];
	onCheckIn: (equipmentId: string) => void;
	isLoading?: boolean;
}

export default function MemberDetails({
	userDetails,
	checkedOutItems,
	onCheckIn,
	isLoading = false,
}: MemberDetailsProps) {
	// Render when no user is selected
	if (!userDetails) {
		return (
			<div className="h-full p-4 flex flex-col">
				<h2 className="text-xl font-semibold mb-4">Member Details</h2>
				<Card className="flex-1 flex items-center justify-center">
					<CardContent className="text-center py-12">
						<User className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
						<p className="text-muted-foreground">
							No user selected
						</p>
						<p className="text-sm text-muted-foreground mt-1">
							Search and select a member to view details
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	const initials = `${userDetails.firstName?.charAt(0) || ""}${
		userDetails.lastName?.charAt(0) || ""
	}`;

	return (
		<div className="h-full p-4 flex flex-col gap-4">
			{/* Member Info Card */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg">Member Details</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-4">
						{/* Avatar */}
						<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
							{userDetails.avatarUrl ? (
								<img
									src={userDetails.avatarUrl}
									alt={`${userDetails.firstName} ${userDetails.lastName}`}
									className="h-full w-full rounded-full object-cover"
								/>
							) : (
								initials || <User className="h-8 w-8" />
							)}
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold">
								{userDetails.firstName} {userDetails.lastName}
							</h3>
							<p className="text-sm text-muted-foreground">
								Student ID: {userDetails.studentId || "N/A"}
							</p>
							{userDetails.membershipType && (
								<Badge variant="secondary" className="mt-1">
									{userDetails.membershipType}
								</Badge>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Equipment Checkout Card */}
			<Card className="flex-1 flex flex-col overflow-hidden">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">
							Equipment Checkout
						</CardTitle>
						<Badge variant="outline">
							{checkedOutItems.length} items
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="flex-1 overflow-hidden p-0">
					<ScrollArea className="h-full px-6 pb-4">
						<div className="space-y-3">
							{checkedOutItems.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">
									{isLoading ? (
										<>
											<Loader2 className="h-10 w-10 mx-auto mb-2 opacity-50 animate-spin" />
											<p>Loading checkouts...</p>
										</>
									) : (
										<>
											<Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
											<p>No equipment checked out</p>
											<p className="text-sm mt-1">
												Click on equipment in the
												inventory to checkout
											</p>
										</>
									)}
								</div>
							) : (
								checkedOutItems.map((equipment) => (
									<div
										key={equipment.id}
										className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors"
									>
										{/* Equipment Icon */}
										<div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center flex-shrink-0 border">
											<Package className="h-5 w-5 text-muted-foreground" />
										</div>
										{/* Equipment Details */}
										<div className="flex-1 min-w-0">
											<h4 className="font-medium truncate">
												{equipment.name}
											</h4>
											<p className="text-xs text-muted-foreground font-mono">
												ID: {equipment.itemId}
											</p>
											<p className="text-xs text-muted-foreground">
												Due: {equipment.dueDate}
											</p>
										</div>
										{/* Check-in Button */}
										<Button
											variant="outline"
											size="sm"
											className="flex-shrink-0"
											onClick={() =>
												onCheckIn(equipment.id)
											}
										>
											<CheckCircle2 className="h-4 w-4 mr-1" />
											Check In
										</Button>
									</div>
								))
							)}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
