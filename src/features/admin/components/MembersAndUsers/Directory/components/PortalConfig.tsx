import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, RotateCcw, Bell, Mail, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	// Self-Service Capabilities
	updatePersonalInfo: true,
	updateCreditCards: true,
	viewCheckInHistory: true,
	downloadReceipts: true,
	cancelOnline: false,

	// Booking Permissions
	bookFacilities: true,
	purchaseGuestPasses: true,
	registerForClasses: true,
	viewClassSchedule: true,
	messageStaff: true,

	// Notification Preferences
	emailNotifications: true,
	smsNotifications: false,
	pushNotifications: true,
};

export default function PortalConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving portal config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Portal permissions have been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Portal permissions restored to defaults.",
		});
	};

	return (
		<div className="space-y-6">
			{/* Action Buttons */}
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={handleReset}>
					<RotateCcw className="w-4 h-4 mr-2" />
					Reset
				</Button>
				<Button onClick={handleSave} disabled={isSaving}>
					<Save className="w-4 h-4 mr-2" />
					{isSaving ? "Saving..." : "Save Settings"}
				</Button>
			</div>

			{/* Self-Service Capabilities Card */}
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
						<div className="space-y-0.5">
							<Label>Update Personal Information</Label>
							<p className="text-xs text-muted-foreground">
								Email, phone, address
							</p>
						</div>
						<Switch
							checked={config.updatePersonalInfo}
							onCheckedChange={(c) =>
								setConfig({ ...config, updatePersonalInfo: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Update Saved Credit Cards</Label>
							<p className="text-xs text-muted-foreground">
								Add, remove, or change payment methods
							</p>
						</div>
						<Switch
							checked={config.updateCreditCards}
							onCheckedChange={(c) =>
								setConfig({ ...config, updateCreditCards: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>View Check-in History</Label>
							<p className="text-xs text-muted-foreground">
								See past visits and timestamps
							</p>
						</div>
						<Switch
							checked={config.viewCheckInHistory}
							onCheckedChange={(c) =>
								setConfig({ ...config, viewCheckInHistory: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Download Receipts</Label>
							<p className="text-xs text-muted-foreground">
								Download PDF invoices and receipts
							</p>
						</div>
						<Switch
							checked={config.downloadReceipts}
							onCheckedChange={(c) =>
								setConfig({ ...config, downloadReceipts: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label className="text-destructive">
								Cancel Membership Online
							</Label>
							<p className="text-xs text-muted-foreground">
								Allows cancellation without staff interaction
								(high risk)
							</p>
						</div>
						<Switch
							checked={config.cancelOnline}
							onCheckedChange={(c) =>
								setConfig({ ...config, cancelOnline: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Booking Permissions Card */}
			<Card>
				<CardHeader>
					<CardTitle>Booking & Activity Permissions</CardTitle>
					<CardDescription>
						Control what members can book and access.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Book Facilities Online</Label>
							<p className="text-xs text-muted-foreground">
								Reserve courts, rooms, lanes
							</p>
						</div>
						<Switch
							checked={config.bookFacilities}
							onCheckedChange={(c) =>
								setConfig({ ...config, bookFacilities: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Purchase Guest Passes Online</Label>
							<p className="text-xs text-muted-foreground">
								Buy day passes for guests
							</p>
						</div>
						<Switch
							checked={config.purchaseGuestPasses}
							onCheckedChange={(c) =>
								setConfig({ ...config, purchaseGuestPasses: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Register for Classes/Events</Label>
							<p className="text-xs text-muted-foreground">
								Sign up for fitness classes and programs
							</p>
						</div>
						<Switch
							checked={config.registerForClasses}
							onCheckedChange={(c) =>
								setConfig({ ...config, registerForClasses: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>View Class Schedule</Label>
							<p className="text-xs text-muted-foreground">
								See upcoming classes and availability
							</p>
						</div>
						<Switch
							checked={config.viewClassSchedule}
							onCheckedChange={(c) =>
								setConfig({ ...config, viewClassSchedule: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Message Staff</Label>
							<p className="text-xs text-muted-foreground">
								In-app messaging with facility staff
							</p>
						</div>
						<Switch
							checked={config.messageStaff}
							onCheckedChange={(c) =>
								setConfig({ ...config, messageStaff: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Notification Preferences Card */}
			<Card>
				<CardHeader>
					<CardTitle>Notification Channels</CardTitle>
					<CardDescription>
						Configure how members receive notifications.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-blue-500/10">
								<Mail className="h-4 w-4 text-blue-500" />
							</div>
							<div className="space-y-0.5">
								<Label>Email Notifications</Label>
								<p className="text-xs text-muted-foreground">
									Billing, reminders, announcements
								</p>
							</div>
						</div>
						<Switch
							checked={config.emailNotifications}
							onCheckedChange={(c) =>
								setConfig({ ...config, emailNotifications: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-green-500/10">
								<Smartphone className="h-4 w-4 text-green-500" />
							</div>
							<div className="space-y-0.5">
								<Label>SMS Notifications</Label>
								<p className="text-xs text-muted-foreground">
									Text messages for urgent alerts
								</p>
							</div>
						</div>
						<Switch
							checked={config.smsNotifications}
							onCheckedChange={(c) =>
								setConfig({ ...config, smsNotifications: c })
							}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-purple-500/10">
								<Bell className="h-4 w-4 text-purple-500" />
							</div>
							<div className="space-y-0.5">
								<Label>Push Notifications</Label>
								<p className="text-xs text-muted-foreground">
									Mobile app notifications
								</p>
							</div>
						</div>
						<Switch
							checked={config.pushNotifications}
							onCheckedChange={(c) =>
								setConfig({ ...config, pushNotifications: c })
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
