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
import { useGroupFitnessConfig } from "../useGroupFitnessConfig";

export default function GuestAccess() {
	const { config, updateConfig } = useGroupFitnessConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Guest Access</CardTitle>
				<CardDescription>
					Configure non-member class access.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Guest Access to Classes</Label>
						<p className="text-xs text-muted-foreground">
							Non-members can attend classes for a fee.
						</p>
					</div>
					<Switch
						checked={config.allowGuestAccess}
						onCheckedChange={(c) =>
							updateConfig({ allowGuestAccess: c })
						}
					/>
				</div>

				{config.allowGuestAccess && (
					<div className="space-y-2">
						<Label>Guest Fee Per Class ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.guestFeePerClass}
							onChange={(e) =>
								updateConfig({
									guestFeePerClass:
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
