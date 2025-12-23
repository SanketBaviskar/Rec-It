import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { useIncidentConfig } from "../useIncidentConfig";

export default function ReportingRequirements() {
	const { config, updateConfig } = useIncidentConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Reporting Requirements</CardTitle>
						<CardDescription>
							Configure what information is required when logging
							incidents.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Photo Evidence</Label>
							<p className="text-xs text-muted-foreground">
								Staff must upload photos.
							</p>
						</div>
						<Switch
							checked={config.requirePhotoEvidence}
							onCheckedChange={(c) =>
								updateConfig({
									requirePhotoEvidence: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Body Map</Label>
							<p className="text-xs text-muted-foreground">
								Mark injury location on diagram.
							</p>
						</div>
						<Switch
							checked={config.requireBodyMap}
							onCheckedChange={(c) =>
								updateConfig({ requireBodyMap: c })
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Witness Information</Label>
							<p className="text-xs text-muted-foreground">
								Must record witness names.
							</p>
						</div>
						<Switch
							checked={config.requireWitnessInfo}
							onCheckedChange={(c) =>
								updateConfig({
									requireWitnessInfo: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Signature</Label>
							<p className="text-xs text-muted-foreground">
								Staff must sign the report.
							</p>
						</div>
						<Switch
							checked={config.requireSignature}
							onCheckedChange={(c) =>
								updateConfig({
									requireSignature: c,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Anonymous Reports</Label>
						<p className="text-xs text-muted-foreground">
							Members can report incidents anonymously.
						</p>
					</div>
					<Switch
						checked={config.allowAnonymous}
						onCheckedChange={(c) =>
							updateConfig({ allowAnonymous: c })
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
