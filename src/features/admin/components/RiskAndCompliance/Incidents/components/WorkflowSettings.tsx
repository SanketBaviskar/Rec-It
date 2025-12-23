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
import { useIncidentConfig } from "../useIncidentConfig";

export default function WorkflowSettings() {
	const { config, updateConfig } = useIncidentConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Follow-up & Workflow</CardTitle>
				<CardDescription>
					Configure incident review and closure requirements.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Follow-up</Label>
						<p className="text-xs text-muted-foreground">
							Incidents need follow-up action within deadline.
						</p>
					</div>
					<Switch
						checked={config.requireFollowUp}
						onCheckedChange={(c) =>
							updateConfig({ requireFollowUp: c })
						}
					/>
				</div>

				{config.requireFollowUp && (
					<div className="space-y-2">
						<Label>Follow-up Deadline (days)</Label>
						<Input
							type="number"
							value={config.followUpDays}
							onChange={(e) =>
								updateConfig({
									followUpDays: parseInt(e.target.value) || 0,
								})
							}
							className="w-32"
						/>
					</div>
				)}

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Manager Review</Label>
						<p className="text-xs text-muted-foreground">
							Incidents must be reviewed by manager.
						</p>
					</div>
					<Switch
						checked={config.requireReview}
						onCheckedChange={(c) =>
							updateConfig({ requireReview: c })
						}
					/>
				</div>

				<div className="space-y-2">
					<Label>Record Retention (years)</Label>
					<Input
						type="number"
						value={config.retentionYears}
						onChange={(e) =>
							updateConfig({
								retentionYears: parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
					<p className="text-xs text-muted-foreground">
						How long to keep incident records for compliance.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
