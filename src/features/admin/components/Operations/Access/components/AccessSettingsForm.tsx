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
import { Button } from "@/components/ui/button";
import { useAccessConfig } from "../useAccessConfig";

export default function AccessSettingsForm() {
	const { accessConfig, updateAccessConfig } = useAccessConfig();

	return (
		<div className="space-y-6">
			{/* General Settings */}
			<Card>
				<CardHeader>
					<CardTitle>General Settings</CardTitle>
					<CardDescription>
						Configure global access system settings.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Enable Access Events Without Entry</Label>
							<p className="text-xs text-muted-foreground">
								Allow saving access events with no recorded
								entry.
							</p>
						</div>
						<Switch
							checked={accessConfig.enableAccessEvents}
							onCheckedChange={(c) =>
								updateAccessConfig({ enableAccessEvents: c })
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Multi-Visit Pass Removal</Label>
							<p className="text-xs text-muted-foreground">
								Remove a Multi-Visit Pass use when saving access
								event.
							</p>
						</div>
						<Switch
							checked={accessConfig.enableMultiVisitPassRemoval}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enableMultiVisitPassRemoval: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Access Profile Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Access Profile Settings</CardTitle>
					<CardDescription>
						Configure default access profile behavior.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Grant Facility Access Automatically</Label>
							<p className="text-xs text-muted-foreground">
								When membership type or pass doesn't specify an
								access profile.
							</p>
						</div>
						<Switch
							checked={accessConfig.grantFacilityAccess}
							onCheckedChange={(c) =>
								updateAccessConfig({ grantFacilityAccess: c })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Forgot Access Media Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Forgot Access Media</CardTitle>
					<CardDescription>
						Configure limits for forgotten access media.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Forgot Access Media Limit</Label>
						<Input
							type="number"
							value={accessConfig.forgotAccessMediaLimit}
							onChange={(e) =>
								updateAccessConfig({
									forgotAccessMediaLimit:
										parseInt(e.target.value) || 0,
								})
							}
							className="w-20"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Access When Limit Exceeded</Label>
							<p className="text-xs text-muted-foreground">
								Grant facility access even if member exceeds
								limit.
							</p>
						</div>
						<Switch
							checked={
								accessConfig.allowFacilityAccessExceedLimit
							}
							onCheckedChange={(c) =>
								updateAccessConfig({
									allowFacilityAccessExceedLimit: c,
								})
							}
						/>
					</div>
					<Separator />
					<Button variant="outline">
						Reset All Forgotten Media Counts
					</Button>
				</CardContent>
			</Card>

			{/* Group Access Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Group Access</CardTitle>
					<CardDescription>
						Configure group access options.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Enable Anonymous Group Access</Label>
						<Switch
							checked={accessConfig.enableAnonymousGroupAccess}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enableAnonymousGroupAccess: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Enable Group Access for Organizations</Label>
						<Switch
							checked={
								accessConfig.enableGroupAccessOrganizations
							}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enableGroupAccessOrganizations: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Enable Group Access for Members</Label>
						<Switch
							checked={accessConfig.enableGroupAccessMembers}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enableGroupAccessMembers: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Passback Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Passback Settings</CardTitle>
					<CardDescription>
						Configure passback detection and warnings.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Enable Passback Warnings</Label>
						<Switch
							checked={accessConfig.enablePassbackWarnings}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enablePassbackWarnings: c,
								})
							}
						/>
					</div>
					{accessConfig.enablePassbackWarnings && (
						<div className="space-y-2">
							<Label>Warning Period (minutes)</Label>
							<Input
								type="number"
								value={accessConfig.warningPeriodMinutes}
								onChange={(e) =>
									updateAccessConfig({
										warningPeriodMinutes:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-20"
							/>
						</div>
					)}
					<div className="flex items-center justify-between">
						<Label>Allow Access If Passback Detected</Label>
						<Switch
							checked={accessConfig.allowFacilityAccessPassback}
							onCheckedChange={(c) =>
								updateAccessConfig({
									allowFacilityAccessPassback: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Passback Warnings for Multi-Visit Passes</Label>
						<Switch
							checked={
								accessConfig.enablePassbackWarningsMultiVisit
							}
							onCheckedChange={(c) =>
								updateAccessConfig({
									enablePassbackWarningsMultiVisit: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
