import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/hooks/use-toast";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { User, CheckCircle2, ArrowLeft } from "lucide-react";
import { EquipmentNavBar } from "./EquipmentNavBar";
import MemberDetails from "./MemberDetails";
import { MemberEquipment, IndividualEquipment } from "./types";
import {
	checkoutEquipment,
	checkinEquipment,
	fetchUserActiveCheckouts,
	CheckoutRecord,
} from "@/services/Api/Equipment/checkoutApi";

// Define TypeScript types for user objects
interface UserType {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
	membershipType: string;
	studentId?: string;
}

export default function EquipmentTab() {
	const [searchResults, setSearchResults] = useState<UserType[]>([]);
	const [selectedCustomer, setSelectedCustomer] = useState<UserType | null>(
		null
	);
	const [memberEquipment, setMemberEquipment] = useState<MemberEquipment[]>(
		[]
	);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false); // Toggle between search and details
	const { toast } = useToast();

	// Fetch user's active checkouts when a customer is selected
	const loadUserCheckouts = useCallback(async (userId: string) => {
		try {
			setIsLoading(true);
			const response = await fetchUserActiveCheckouts(parseInt(userId));
			if (response.status === "success" && response.data) {
				const responseData = response.data as any;
				const checkoutsData = responseData.items || responseData || [];

				const checkouts: MemberEquipment[] = checkoutsData.map(
					(checkout: CheckoutRecord) => ({
						id: checkout.id.toString(),
						itemId:
							checkout.equipmentItem?.serialNumber ||
							checkout.equipmentItemId.toString(),
						name:
							checkout.equipmentItem?.equipment?.name ||
							"Unknown",
						checkedOutDate: new Date(
							checkout.checkedOutAt
						).toLocaleDateString(),
						dueDate: checkout.dueAt
							? new Date(checkout.dueAt).toLocaleDateString()
							: "No due date",
						checkoutRecordId: checkout.id, // Keep track of actual checkout ID
					})
				);
				setMemberEquipment(checkouts);
			}
		} catch (error) {
			console.error("Error fetching user checkouts:", error);
			// Don't show error toast - user might not have any checkouts
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleUserSelect = (user: UserType) => {
		setSelectedCustomer(user);
		setShowDetails(true); // Switch to details view
		loadUserCheckouts(user.id);
		toast({
			title: "Member Selected",
			description: `${user.firstName} ${user.lastName} is now selected for checkout.`,
			variant: "default",
		});
	};

	const handleClearSelection = () => {
		setSelectedCustomer(null);
		setShowDetails(false); // Go back to search
		setMemberEquipment([]);
	};

	const handleBackToSearch = () => {
		setShowDetails(false); // Go back to search while keeping member selected
	};

	// Handle checkout from inventory - calls backend API
	const handleCheckout = async (items: IndividualEquipment[]) => {
		if (!selectedCustomer) return;

		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days

		try {
			// For each item, call the checkout API
			// Note: In a real scenario, you'd want to batch these or use a transaction
			const checkoutPromises = items.map((item) =>
				checkoutEquipment({
					equipmentItemId: parseInt(item.id),
					userId: parseInt(selectedCustomer.id),
					dueAt: dueDate.toISOString(),
				})
			);

			await Promise.all(checkoutPromises);

			// Trigger inventory refresh
			setRefreshTrigger((prev) => prev + 1);

			// Reload user's checkouts to get fresh data
			await loadUserCheckouts(selectedCustomer.id);

			toast({
				title: "Equipment Checked Out",
				description: `${items.length} item(s) checked out to ${
					selectedCustomer.firstName
				} ${
					selectedCustomer.lastName
				}. Due: ${dueDate.toLocaleDateString()}`,
				variant: "default",
			});
		} catch (error) {
			console.error("Error checking out equipment:", error);
			toast({
				title: "Checkout Failed",
				description: "Failed to checkout equipment. Please try again.",
				variant: "destructive",
			});
		}
	};

	// Handle check-in from member details - calls backend API
	const handleCheckIn = async (equipmentId: string) => {
		const item = memberEquipment.find((e) => e.id === equipmentId);
		if (!item) return;

		try {
			// Use the checkout record ID to check in
			const checkoutRecordId =
				(item as any).checkoutRecordId || parseInt(equipmentId);
			await checkinEquipment(checkoutRecordId, {
				conditionIn: "good",
			});

			// Remove from local state
			setMemberEquipment((prev) =>
				prev.filter((eq) => eq.id !== equipmentId)
			);

			toast({
				title: "Equipment Checked In",
				description: item
					? `${item.name} (${item.itemId}) has been returned.`
					: "Item has been returned successfully.",
				variant: "default",
			});
		} catch (error) {
			console.error("Error checking in equipment:", error);
			toast({
				title: "Check-in Failed",
				description: "Failed to check in equipment. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="flex h-full gap-6 p-6 bg-gradient-to-br from-background via-background to-muted/20">
			{/* Left Side - Member Search OR Member Details */}
			<div className="w-[30%] flex flex-col gap-4">
				{!showDetails ? (
					<>
						{/* Search Header */}
						<div className="space-y-2">
							<h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
								<User className="h-5 w-5 text-primary" />
								Member Search
							</h2>
							<SearchBar
								placeholder="Search members..."
								onSelect={(user) =>
									handleUserSelect(user as UserType)
								}
								onClear={handleClearSelection}
								onResults={(results: UserType[]) =>
									setSearchResults(results)
								}
								triggerSearchOnClick={false}
								variant="inline"
							/>
						</div>

						{/* Search Results */}
						<div className="flex-1 rounded-xl border bg-card shadow-sm overflow-hidden">
							<div className="border-b bg-muted/50 px-4 py-3">
								<p className="text-sm font-medium text-muted-foreground">
									{searchResults.length > 0
										? `${searchResults.length} Members Found`
										: "Search Results"}
								</p>
							</div>
							<ScrollArea className="h-[calc(100%-52px)]">
								<div className="p-3 space-y-2">
									{searchResults.length === 0 ? (
										<div className="text-center text-muted-foreground py-12">
											<User className="h-12 w-12 mx-auto mb-3 opacity-30" />
											<p className="text-sm">
												No results yet
											</p>
											<p className="text-xs mt-1">
												Search for members above
											</p>
										</div>
									) : (
										searchResults.map((user) => (
											<UserCard
												key={user.id}
												user={user}
												onClick={handleUserSelect}
												isSelected={
													selectedCustomer?.id ===
													user.id
												}
											/>
										))
									)}
								</div>
							</ScrollArea>
						</div>
					</>
				) : (
					/* Member Details View */
					<div className="h-full flex flex-col gap-3">
						{/* Back Button */}
						<Button
							variant="outline"
							size="sm"
							onClick={handleBackToSearch}
							className="w-fit gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Search
						</Button>

						{/* Details Card */}
						<div className="flex-1 rounded-xl border bg-card shadow-sm overflow-hidden">
							<MemberDetails
								userDetails={selectedCustomer}
								isLoading={isLoading}
								checkedOutItems={memberEquipment}
								onCheckIn={handleCheckIn}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Right - Equipment Navbar */}
			<div className="flex-1 rounded-xl border bg-card shadow-sm overflow-hidden">
				<EquipmentNavBar
					selectedMember={selectedCustomer}
					onCheckout={handleCheckout}
					refreshTrigger={refreshTrigger}
				/>
			</div>

			{/* Toast notifications */}
			<Toaster />
		</div>
	);
}

// Enhanced UserCard Component
interface UserCardProps {
	user: UserType;
	onClick: (user: UserType) => void;
	isSelected?: boolean;
}

function UserCard({ user, onClick, isSelected }: UserCardProps) {
	return (
		<button
			className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
				isSelected
					? "bg-primary/10 border-2 border-primary/50 shadow-sm"
					: "bg-background hover:bg-muted border-2 border-transparent hover:border-muted-foreground/20"
			}`}
			onClick={() => onClick(user)}
		>
			<div
				className={`h-10 w-10 rounded-full ${
					isSelected ? "ring-2 ring-primary ring-offset-2" : ""
				} shrink-0 bg-muted flex items-center justify-center`}
			>
				{user.avatarUrl ? (
					<img
						src={user.avatarUrl}
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
					{user.membershipType}
					{user.studentId && ` • ${user.studentId}`}
				</div>
			</div>
			{isSelected && (
				<Badge variant="default" className="shrink-0 gap-1">
					<CheckCircle2 className="h-3 w-3" />
					Selected
				</Badge>
			)}
		</button>
	);
}
