import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

export default function GeneralSettings() {
	return (
		<div className="p-8 max-w-5xl mx-auto space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						General Settings
					</h1>
					<p className="text-muted-foreground mt-2">
						Manage your recreational center's profile, operating
						hours, and core policies.
					</p>
				</div>
				<Button>
					<Save className="mr-2 h-4 w-4" /> Save Changes
				</Button>
			</div>

			<Tabs defaultValue="profile" className="space-y-6">
				<TabsList className="bg-card p-1 rounded-lg border">
					<TabsTrigger value="profile">Center Profile</TabsTrigger>
					<TabsTrigger value="hours">Operating Hours</TabsTrigger>
					<TabsTrigger value="policies">Booking Policies</TabsTrigger>
					<TabsTrigger value="notifications">
						Notifications
					</TabsTrigger>
				</TabsList>

				<TabsContent value="profile" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Center Information</CardTitle>
							<CardDescription>
								Publicly visible details about your facility.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="centerName">Center Name</Label>
								<Input
									id="centerName"
									placeholder="e.g. Springfield Rec Center"
									defaultValue="Rec-It Sports Complex"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Tell us about your center..."
									className="min-h-[100px]"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Contact Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="contact@example.com"
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										type="tel"
										placeholder="+1 (555) 000-0000"
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="address">Address</Label>
								<Input
									id="address"
									placeholder="123 Recreation Way"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="city">City</Label>
									<Input id="city" placeholder="City" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="zip">Zip Code</Label>
									<Input id="zip" placeholder="Zip Code" />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="hours" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Standard Operating Hours</CardTitle>
							<CardDescription>
								Defines when the facility is open for bookings.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{[
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
								"Saturday",
								"Sunday",
							].map((day) => (
								<div
									key={day}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-4">
										<Switch
											id={`open-${day}`}
											defaultChecked={day !== "Sunday"}
										/>
										<Label
											htmlFor={`open-${day}`}
											className="w-24 font-medium"
										>
											{day}
										</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input
											type="time"
											className="w-32"
											defaultValue="08:00"
										/>
										<span className="text-muted-foreground">
											-
										</span>
										<Input
											type="time"
											className="w-32"
											defaultValue="22:00"
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="policies" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Booking & Capacity Rules</CardTitle>
							<CardDescription>
								Control how members interact with your
								facilities.
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
				</TabsContent>

				<TabsContent value="notifications" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Email Notifications</CardTitle>
							<CardDescription>
								Configure automated emails sent to members.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="flex-1">
									Booking Confirmation
								</Label>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<Label className="flex-1">
									Booking Cancellation
								</Label>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<Label className="flex-1">
									Membership Expiry Warning
								</Label>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<Label className="flex-1">
									Payment Receipt
								</Label>
								<Switch defaultChecked />
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
