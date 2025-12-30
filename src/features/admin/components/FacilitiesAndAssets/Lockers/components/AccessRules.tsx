import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { useLockerConfig } from "../useLockerConfig";

export default function AccessRules() {
	const { config, updateConfig } = useLockerConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Shield className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Access Rules</CardTitle>
						<CardDescription>
							Configure membership and guest access requirements.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Active Membership</Label>
						<p className="text-xs text-muted-foreground">
							Only active members can rent lockers.
						</p>
					</div>
					<Switch
						checked={config.requireMembership}
						onCheckedChange={(c) =>
							updateConfig({ requireMembership: c })
						}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Guest Lockers</Label>
						<p className="text-xs text-muted-foreground">
							Non-members can rent day-use lockers.
						</p>
					</div>
					<Switch
						checked={config.allowGuestLockers}
						onCheckedChange={(c) =>
							updateConfig({ allowGuestLockers: c })
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
