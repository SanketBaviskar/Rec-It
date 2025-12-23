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
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { useGroupFitnessConfig } from "../useGroupFitnessConfig";

export default function RegistrationRules() {
	const { config, updateConfig } = useGroupFitnessConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Clock className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Registration Settings</CardTitle>
						<CardDescription>
							Configure class booking windows and waitlist.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Online Registration</Label>
						<p className="text-xs text-muted-foreground">
							Members can book classes through the app/website.
						</p>
					</div>
					<Switch
						checked={config.allowOnlineRegistration}
						onCheckedChange={(c) =>
							updateConfig({
								allowOnlineRegistration: c,
							})
						}
					/>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Registration Opens (hours before class)</Label>
						<Input
							type="number"
							value={config.registrationOpensHours}
							onChange={(e) =>
								updateConfig({
									registrationOpensHours:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							Registration Closes (minutes before class)
						</Label>
						<Input
							type="number"
							value={config.registrationClosesMinutes}
							onChange={(e) =>
								updateConfig({
									registrationClosesMinutes:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Waitlist</Label>
						<p className="text-xs text-muted-foreground">
							Members can join waitlist when class is full.
						</p>
					</div>
					<Switch
						checked={config.allowWaitlist}
						onCheckedChange={(c) =>
							updateConfig({ allowWaitlist: c })
						}
					/>
				</div>

				{config.allowWaitlist && (
					<div className="space-y-2">
						<Label>Maximum Waitlist Size</Label>
						<Input
							type="number"
							value={config.maxWaitlistSize}
							onChange={(e) =>
								updateConfig({
									maxWaitlistSize:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
