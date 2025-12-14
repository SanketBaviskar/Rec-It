import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function EmailSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Email Notifications</h3>
				<p className="text-sm text-muted-foreground">
					Configure automated emails sent to members.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Email Triggers</CardTitle>
					<CardDescription>
						Toggle which actions trigger an email notification.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label className="flex-1">Booking Confirmation</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label className="flex-1">Booking Cancellation</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label className="flex-1">
							Membership Expiry Warning
						</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label className="flex-1">Payment Receipt</Label>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
