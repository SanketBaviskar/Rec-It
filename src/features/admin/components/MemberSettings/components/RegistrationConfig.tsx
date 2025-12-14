import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function RegistrationConfig() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">
					Registration & Onboarding
				</h3>
				<p className="text-sm text-muted-foreground">
					Configure the intake process for new members.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Required Information</CardTitle>
					<CardDescription>
						Select which fields are mandatory during sign-up.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Emergency Contact</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>Medical Conditions / Allergies</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>Referral Source</Label>
						<Switch />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Member ID Formatting</CardTitle>
					<CardDescription>
						Define how system IDs are generated for new accounts.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RadioGroup defaultValue="auto">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="auto" id="auto" />
							<Label htmlFor="auto">
								Auto-Increment (e.g. 1001, 1002)
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="random" id="random" />
							<Label htmlFor="random">
								Random Alphanumeric (e.g. A7X-92B)
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="custom" id="custom" />
							<Label htmlFor="custom">
								Custom Format (Use prefix defined in Access
								Settings)
							</Label>
						</div>
					</RadioGroup>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Liability Waiver</CardTitle>
					<CardDescription>
						Manage the legal agreement members must sign.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Require Signature Before First Check-in</Label>
						<Switch defaultChecked />
					</div>
					<div className="pt-2">
						<Label className="block mb-2">
							Waiver Document (PDF)
						</Label>
						<div className="flex items-center gap-4">
							<div className="border border-dashed rounded-md p-6 w-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
								<span className="text-sm">
									current_waiver_v2.pdf
								</span>
							</div>
							<Button variant="outline">
								<Upload className="h-4 w-4 mr-2" /> Upload New
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
