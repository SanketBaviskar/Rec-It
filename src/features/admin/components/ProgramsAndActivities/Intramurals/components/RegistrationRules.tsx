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
import { Calendar } from "lucide-react";
import { useIntramuralConfig } from "../useIntramuralConfig";

export default function RegistrationRules() {
	const { config, updateConfig } = useIntramuralConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Calendar className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Registration Settings</CardTitle>
						<CardDescription>
							Configure registration windows and fees.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Registration Opens (days before season)</Label>
						<Input
							type="number"
							value={config.registrationOpenDays}
							onChange={(e) =>
								updateConfig({
									registrationOpenDays:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Registration Closes (days before season)</Label>
						<Input
							type="number"
							value={config.registrationCloseDays}
							onChange={(e) =>
								updateConfig({
									registrationCloseDays:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Late Registration</Label>
						<p className="text-xs text-muted-foreground">
							Teams can register after deadline with a fee.
						</p>
					</div>
					<Switch
						checked={config.allowLateRegistration}
						onCheckedChange={(c) =>
							updateConfig({
								allowLateRegistration: c,
							})
						}
					/>
				</div>

				{config.allowLateRegistration && (
					<div className="space-y-2">
						<Label>Late Registration Fee ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.lateRegistrationFee}
							onChange={(e) =>
								updateConfig({
									lateRegistrationFee:
										parseFloat(e.target.value) || 0,
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
