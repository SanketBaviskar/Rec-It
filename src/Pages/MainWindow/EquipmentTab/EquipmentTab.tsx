import { useState, useCallback } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/hooks/use-toast";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { User } from "lucide-react";
import EquipmentNavBar from "./EquipmentNavBar";
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
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	// Fetch user's active checkouts when a customer is selected
	const loadUserCheckouts = useCallback(async (userId: string) => {
		try {
			setIsLoading(true);
			const response = await fetchUserActiveCheckouts(parseInt(userId));
			if (response.status === "success" && response.data) {
				const checkouts: MemberEquipment[] = response.data.map(
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
		loadUserCheckouts(user.id);
		toast({
			title: "Member Selected",
			description: `${user.firstName} ${user.lastName} is now selected for checkout.`,
			variant: "default",
		});
	};

	const handleClearSelection = () => {
		setSelectedCustomer(null);
		setMemberEquipment([]);
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
		<div className="flex h-[90vh] gap-4">
			{/* Left Side - Search Results */}
			<div className="w-[25%] flex flex-col gap-4 py-4 pl-4">
				<SearchBar
					placeholder="Search members..."
					onSelect={(user) => handleUserSelect(user as UserType)}
					onClear={handleClearSelection}
					onResults={(results: UserType[]) =>
						setSearchResults(results)
					}
					triggerSearchOnClick={false}
					variant="inline"
				/>
				<ScrollArea className="flex-1 rounded-lg border bg-card">
					<div className="p-4 space-y-4">
						{searchResults.length === 0 ? (
							<div className="text-center text-muted-foreground py-4">
								No search results
							</div>
						) : (
							searchResults.map((user) => (
								<UserCard
									key={user.id}
									user={user}
									onClick={handleUserSelect}
									isSelected={
										selectedCustomer?.id === user.id
									}
								/>
							))
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Equipment Navbar */}
			<div className="w-[50%] border-l border-r">
				<EquipmentNavBar
					selectedMember={selectedCustomer}
					onCheckout={handleCheckout}
				/>
			</div>

			{/* Member Details */}
			<div className="w-[25%]">
				<MemberDetails
					userDetails={selectedCustomer}
					isLoading={isLoading}
					checkedOutItems={memberEquipment}
					onCheckIn={handleCheckIn}
				/>
			</div>

			{/* Toast notifications */}
			<Toaster />
		</div>
	);
}

// Extracted UserCard Component
interface UserCardProps {
	user: UserType;
	onClick: (user: UserType) => void;
	isSelected?: boolean;
}

function UserCard({ user, onClick, isSelected }: UserCardProps) {
	return (
		<div
			className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
				isSelected
					? "bg-primary/10 border border-primary/30"
					: "hover:bg-muted"
			}`}
			onClick={() => onClick(user)}
		>
			<Avatar>
				{user.avatarUrl ? (
					<img
						src={user.avatarUrl}
						alt={`${user.firstName} ${user.lastName}`}
					/>
				) : (
					<User className="h-5 w-5" />
				)}
			</Avatar>
			<div className="flex-1">
				<div className="font-medium">
					{user.firstName} {user.lastName}
				</div>
				<div className="text-sm text-muted-foreground">
					{user.membershipType}
				</div>
			</div>
			<Badge variant={isSelected ? "default" : "secondary"}>
				{isSelected ? "Selected" : "Active"}
			</Badge>
		</div>
	);
}
