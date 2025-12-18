import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Save,
	RotateCcw,
	Megaphone,
	Mail,
	Plus,
	Edit,
	Eye,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Campaign Templates
const CAMPAIGNS = [
	{
		id: 1,
		name: "Welcome Series",
		type: "Email",
		status: "Active",
		sent: 1250,
	},
	{
		id: 2,
		name: "Membership Renewal",
		type: "Email",
		status: "Active",
		sent: 340,
	},
	{
		id: 3,
		name: "Birthday Discount",
		type: "Email",
		status: "Active",
		sent: 89,
	},
	{ id: 4, name: "Re-engagement", type: "Email", status: "Draft", sent: 0 },
	{
		id: 5,
		name: "New Class Alert",
		type: "Push",
		status: "Active",
		sent: 2100,
	},
];

const DEFAULT_CONFIG = {
	// Email Settings
	emailEnabled: true,
	senderName: "Campus Recreation",
	senderEmail: "rec@university.edu",
	replyToEmail: "support@university.edu",

	// SMS Settings
	smsEnabled: false,
	smsProviderConfigured: false,

	// Push Notifications
	pushEnabled: true,
	pushForNewClasses: true,
	pushForClosures: true,
	pushForPromotions: false,

	// Automations
	welcomeEmailEnabled: true,
	birthdayEmailEnabled: true,
	renewalReminderEnabled: true,
	renewalReminderDays: 30,

	// Frequency Limits
	maxEmailsPerWeek: 3,
	unsubscribeEnabled: true,
};

export default function MarketingConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [campaigns] = useState(CAMPAIGNS);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description:
				"Marketing & engagement configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Marketing settings restored to defaults.",
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">
						Marketing & Engagement
					</h1>
					<p className="text-muted-foreground mt-1">
						Configure email campaigns, push notifications, and
						automations.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleReset}>
						<RotateCcw className="w-4 h-4 mr-2" />
						Reset
					</Button>
					<Button onClick={handleSave} disabled={isSaving}>
						<Save className="w-4 h-4 mr-2" />
						{isSaving ? "Saving..." : "Save Settings"}
					</Button>
				</div>
			</div>

			{/* Campaigns */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Megaphone className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Campaigns</CardTitle>
								<CardDescription>
									Manage marketing campaigns and templates.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							New Campaign
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Campaign Name</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Sent</TableHead>
								<TableHead className="w-24">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{campaigns.map((campaign) => (
								<TableRow key={campaign.id}>
									<TableCell className="font-medium">
										{campaign.name}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{campaign.type}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												campaign.status === "Active"
													? "default"
													: "secondary"
											}
										>
											{campaign.status}
										</Badge>
									</TableCell>
									<TableCell>
										{campaign.sent.toLocaleString()}
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
											>
												<Edit className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Email Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Mail className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Email Settings</CardTitle>
							<CardDescription>
								Configure email sender information.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Email Marketing</Label>
							<p className="text-xs text-muted-foreground">
								Allow sending marketing emails to members.
							</p>
						</div>
						<Switch
							checked={config.emailEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, emailEnabled: c })
							}
						/>
					</div>

					{config.emailEnabled && (
						<>
							<Separator />
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Sender Name</Label>
									<Input
										value={config.senderName}
										onChange={(e) =>
											setConfig({
												...config,
												senderName: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Sender Email</Label>
									<Input
										type="email"
										value={config.senderEmail}
										onChange={(e) =>
											setConfig({
												...config,
												senderEmail: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Reply-To Email</Label>
								<Input
									type="email"
									value={config.replyToEmail}
									onChange={(e) =>
										setConfig({
											...config,
											replyToEmail: e.target.value,
										})
									}
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Automations */}
			<Card>
				<CardHeader>
					<CardTitle>Automated Campaigns</CardTitle>
					<CardDescription>
						Enable or disable automated marketing triggers.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Welcome Email Series</Label>
							<p className="text-xs text-muted-foreground">
								Automatically email new members.
							</p>
						</div>
						<Switch
							checked={config.welcomeEmailEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, welcomeEmailEnabled: c })
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Birthday Email</Label>
							<p className="text-xs text-muted-foreground">
								Send birthday greetings with special offers.
							</p>
						</div>
						<Switch
							checked={config.birthdayEmailEnabled}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									birthdayEmailEnabled: c,
								})
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Renewal Reminders</Label>
							<p className="text-xs text-muted-foreground">
								Remind members before membership expires.
							</p>
						</div>
						<Switch
							checked={config.renewalReminderEnabled}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									renewalReminderEnabled: c,
								})
							}
						/>
					</div>

					{config.renewalReminderEnabled && (
						<div className="space-y-2">
							<Label>Days Before Expiration</Label>
							<Input
								type="number"
								value={config.renewalReminderDays}
								onChange={(e) =>
									setConfig({
										...config,
										renewalReminderDays:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Push Notifications */}
			<Card>
				<CardHeader>
					<CardTitle>Push Notifications</CardTitle>
					<CardDescription>
						Configure mobile app push notification preferences.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Push Notifications</Label>
							<p className="text-xs text-muted-foreground">
								Send push notifications to mobile app users.
							</p>
						</div>
						<Switch
							checked={config.pushEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, pushEnabled: c })
							}
						/>
					</div>

					{config.pushEnabled && (
						<>
							<Separator />
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<Label>New Classes / Events</Label>
									<Switch
										checked={config.pushForNewClasses}
										onCheckedChange={(c) =>
											setConfig({
												...config,
												pushForNewClasses: c,
											})
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label>Facility Closures</Label>
									<Switch
										checked={config.pushForClosures}
										onCheckedChange={(c) =>
											setConfig({
												...config,
												pushForClosures: c,
											})
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label>Promotions & Offers</Label>
									<Switch
										checked={config.pushForPromotions}
										onCheckedChange={(c) =>
											setConfig({
												...config,
												pushForPromotions: c,
											})
										}
									/>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Frequency Limits */}
			<Card>
				<CardHeader>
					<CardTitle>Frequency & Compliance</CardTitle>
					<CardDescription>
						Prevent over-communication and ensure compliance.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Max Marketing Emails Per Week</Label>
						<Input
							type="number"
							value={config.maxEmailsPerWeek}
							onChange={(e) =>
								setConfig({
									...config,
									maxEmailsPerWeek:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Unsubscribe</Label>
							<p className="text-xs text-muted-foreground">
								Include unsubscribe link in all emails (required
								by law).
							</p>
						</div>
						<Switch
							checked={config.unsubscribeEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, unsubscribeEnabled: c })
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
