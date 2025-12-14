import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PortalConfig() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">
					Member Portal Permissions
				</h3>
				<p className="text-sm text-muted-foreground">
					Control what actions members can perform themselves online.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Self-Service Capabilities</CardTitle>
					<CardDescription>
						Enable or disable features in the member mobile
						app/website.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>
							Update Personal Information (Email, Phone)
						</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>Update Saved Credit Cards</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>View Check-in History</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<Label className="text-destructive">
								Cancel Membership Online
							</Label>
							<span className="text-xs text-muted-foreground">
								Allows cancellation without staff interaction.
							</span>
						</div>
						<Switch />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Booking Permissions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Book Facilities Online</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>Purchase Guest Passes Online</Label>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
