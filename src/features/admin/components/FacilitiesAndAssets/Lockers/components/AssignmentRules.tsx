import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useLockerConfig } from "../useLockerConfig";

export default function AssignmentRules() {
	const { config, updateConfig } = useLockerConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Settings className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Assignment Rules</CardTitle>
						<CardDescription>
							Configure how lockers are assigned to members.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Auto-Assign Lockers</Label>
						<p className="text-xs text-muted-foreground">
							Automatically assign the next available locker.
						</p>
					</div>
					<Switch
						checked={config.autoAssign}
						onCheckedChange={(c) => updateConfig({ autoAssign: c })}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Preference Selection</Label>
						<p className="text-xs text-muted-foreground">
							Members can request a specific locker number.
						</p>
					</div>
					<Switch
						checked={config.allowPreference}
						onCheckedChange={(c) =>
							updateConfig({ allowPreference: c })
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
