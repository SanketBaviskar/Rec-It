import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function BookingPoliciesSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Booking Policies</h3>
				<p className="text-sm text-muted-foreground">
					Set rules for facility usage and reservations.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Booking & Capacity Rules</CardTitle>
					<CardDescription>
						Control how members interact with your facilities.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between space-x-4">
						<div className="flex flex-col space-y-1">
							<Label className="text-base">
								Require Check-in
							</Label>
							<span className="text-sm text-muted-foreground">
								Members must check in upon arrival.
							</span>
						</div>
						<Switch defaultChecked />
					</div>
					<Separator />
					<div className="flex items-center justify-between space-x-4">
						<div className="flex flex-col space-y-1">
							<Label className="text-base">
								Allow Guest Passes
							</Label>
							<span className="text-sm text-muted-foreground">
								Members can bring guests.
							</span>
						</div>
						<Switch />
					</div>
					<Separator />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
						<div className="grid gap-2">
							<Label htmlFor="maxBooking">
								Max Booking Duration (minutes)
							</Label>
							<Input
								id="maxBooking"
								type="number"
								defaultValue="120"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="interBooking">
								Buffer Time Between Slots (minutes)
							</Label>
							<Input
								id="interBooking"
								type="number"
								defaultValue="15"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="advanceWindow">
								Advance Booking Window (days)
							</Label>
							<Input
								id="advanceWindow"
								type="number"
								defaultValue="14"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="cancelWindow">
								Cancellation Deadline (hours before)
							</Label>
							<Input
								id="cancelWindow"
								type="number"
								defaultValue="24"
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
