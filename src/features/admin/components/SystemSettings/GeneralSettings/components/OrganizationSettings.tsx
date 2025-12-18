import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OrganizationSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Center Profile</h3>
				<p className="text-sm text-muted-foreground">
					Manage your recreational center's core information.
				</p>
			</div>

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
						<Input id="address" placeholder="123 Recreation Way" />
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
		</div>
	);
}
