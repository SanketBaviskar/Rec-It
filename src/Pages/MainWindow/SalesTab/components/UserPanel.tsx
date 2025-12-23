import { useState } from "react";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	AlertCircle,
	CheckCircle2,
	Clock,
	Gift,
	User,
	XCircle,
} from "lucide-react";

interface UserPanelProps {
	selectedUser: any | null;
	onSelectUser: (user: any) => void;
	onClearUser: () => void;
}

// Mock eligibility data - in production this would come from API
const getMockEligibility = (user: any) => {
	if (!user) return null;
	return {
		status: "active" as "active" | "warning" | "blocked",
		membership: "Student Premium",
		memberSince: "Aug 2023",
		alerts: [
			{
				id: 1,
				type: "warning",
				icon: Clock,
				message: "Waiver expires in 3 days",
			},
			{
				id: 2,
				type: "info",
				icon: Gift,
				message: "Birthday today! 🎂",
			},
		],
		// For equipment checkout context
		overdueItems: [],
		canCheckout: true,
	};
};

const statusConfig = {
	active: {
		color: "bg-emerald-500",
		textColor: "text-emerald-500",
		bgLight: "bg-emerald-500/10",
		label: "Active",
		icon: CheckCircle2,
	},
	warning: {
		color: "bg-amber-500",
		textColor: "text-amber-500",
		bgLight: "bg-amber-500/10",
		label: "Warning",
		icon: AlertCircle,
	},
	blocked: {
		color: "bg-red-500",
		textColor: "text-red-500",
		bgLight: "bg-red-500/10",
		label: "Blocked",
		icon: XCircle,
	},
};

export function UserPanel({
	selectedUser,
	onSelectUser,
	onClearUser,
}: UserPanelProps) {
	const eligibility = getMockEligibility(selectedUser);
	const [searchResults, setSearchResults] = useState<any[]>([]);

	return (
		<div className="flex flex-col h-full gap-4">
			{/* Search Header */}
			<div className="space-y-2">
				<h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
					<User className="h-5 w-5 text-primary" />
					Customer
				</h2>
				<SearchBar
					placeholder="Scan ID or search name..."
					onSelect={(user) => {
						onSelectUser(user);
						setSearchResults([]);
					}}
					onClear={() => {
						onClearUser();
						setSearchResults([]);
					}}
					onResults={(results) => {
						setSearchResults(results);
					}}
					variant="inline"
				/>
			</div>

			{/* User Eligibility Card */}
			{selectedUser && eligibility && (
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm flex-1 overflow-hidden">
					<CardContent className="p-4">
						{/* Visual Verification - Large Photo */}
						<div className="flex items-start gap-4 mb-4">
							<div className="relative">
								<Avatar className="h-20 w-20 border-2 border-border">
									<AvatarImage
										src={selectedUser.image}
										alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
									/>
									<AvatarFallback className="text-lg">
										{selectedUser.firstName?.[0]}
										{selectedUser.lastName?.[0]}
									</AvatarFallback>
								</Avatar>
								{/* Status Indicator Dot */}
								<div
									className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background ${
										statusConfig[eligibility.status].color
									}`}
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-lg truncate">
									{selectedUser.firstName}{" "}
									{selectedUser.lastName}
								</h3>
								<p className="text-sm text-muted-foreground">
									{selectedUser.email}
								</p>
								<div className="flex items-center gap-2 mt-1">
									<Badge
										variant="outline"
										className={`${
											statusConfig[eligibility.status]
												.bgLight
										} ${
											statusConfig[eligibility.status]
												.textColor
										} border-0`}
									>
										{(() => {
											const StatusIcon =
												statusConfig[eligibility.status]
													.icon;
											return (
												<StatusIcon className="h-3 w-3 mr-1" />
											);
										})()}
										{statusConfig[eligibility.status].label}
									</Badge>
								</div>
							</div>
						</div>

						{/* Membership Info */}
						<div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg bg-muted/30">
							<div>
								<p className="text-xs text-muted-foreground">
									Membership
								</p>
								<p className="font-medium text-sm">
									{eligibility.membership}
								</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">
									Member Since
								</p>
								<p className="font-medium text-sm">
									{eligibility.memberSince}
								</p>
							</div>
						</div>

						{/* Alerts */}
						{eligibility.alerts.length > 0 && (
							<div className="space-y-2">
								<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
									Alerts
								</p>
								{eligibility.alerts.map((alert) => (
									<div
										key={alert.id}
										className={`flex items-center gap-2 p-2 rounded-md text-sm ${
											alert.type === "warning"
												? "bg-amber-500/10 text-amber-500"
												: alert.type === "danger"
												? "bg-red-500/10 text-red-500"
												: "bg-blue-500/10 text-blue-500"
										}`}
									>
										<alert.icon className="h-4 w-4 flex-shrink-0" />
										<span>{alert.message}</span>
									</div>
								))}
							</div>
						)}

						{/* Quick Actions */}
						<div className="mt-4 pt-4 border-t flex gap-2">
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								View Profile
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								History
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Search Results List - shown when searching and no user selected */}
			{!selectedUser && searchResults.length > 0 && (
				<div className="flex-1 min-h-0 rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
					<div className="border-b bg-muted/50 px-4 py-3 shrink-0">
						<p className="text-sm font-medium text-muted-foreground">
							{searchResults.length > 0
								? `${searchResults.length} Customers Found`
								: "Search Results"}
						</p>
					</div>
					<ScrollArea className="flex-1 min-h-0">
						<div className="p-3 space-y-2">
							{searchResults.map((user: any) => (
								<button
									key={user.id}
									className="w-full flex items-center gap-3 p-3 rounded-lg transition-all bg-background hover:bg-muted border-2 border-transparent hover:border-muted-foreground/20"
									onClick={() => {
										onSelectUser(user);
										setSearchResults([]);
									}}
								>
									<div className="h-10 w-10 rounded-full shrink-0 bg-muted flex items-center justify-center overflow-hidden">
										{user.image ? (
											<img
												src={user.image}
												alt={`${user.firstName} ${user.lastName}`}
												className="h-full w-full rounded-full object-cover"
											/>
										) : (
											<User className="h-5 w-5 text-muted-foreground" />
										)}
									</div>
									<div className="flex-1 text-left min-w-0">
										<div className="font-medium truncate">
											{user.firstName} {user.lastName}
										</div>
										<div className="text-xs text-muted-foreground truncate">
											{user.email}
										</div>
									</div>
								</button>
							))}
						</div>
					</ScrollArea>
				</div>
			)}

			{/* Empty State - shown when not searching and no user selected */}
			{!selectedUser && searchResults.length === 0 && (
				<div className="flex-1 min-h-0 rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
					<div className="border-b bg-muted/50 px-4 py-3 shrink-0">
						<p className="text-sm font-medium text-muted-foreground">
							Search Results
						</p>
					</div>
					<div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
						<User className="h-12 w-12 mb-3 opacity-30" />
						<p className="text-sm">No results yet</p>
						<p className="text-xs mt-1">
							Scan customer ID or search to begin transaction
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
