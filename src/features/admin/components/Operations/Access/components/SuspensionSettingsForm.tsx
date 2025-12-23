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
import { useAccessConfig } from "../useAccessConfig";

export default function SuspensionSettingsForm() {
	const { suspensionConfig, updateSuspensionConfig } = useAccessConfig();

	return (
		<div className="space-y-6">
			{/* RecIt Default Suspension Settings */}
			<Card>
				<CardHeader>
					<CardTitle>RecIt - Default Suspension Settings</CardTitle>
					<CardDescription>
						Configure default suspension behavior for RecIt
						violations.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Suspend from Facility Access</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromFacilityAccessRecIt
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromFacilityAccessRecIt: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Intramurals</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromIntramuralsRecIt
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromIntramuralsRecIt: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Programs</Label>
						<Switch
							checked={suspensionConfig.suspendFromProgramsRecIt}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromProgramsRecIt: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Bookings</Label>
						<Switch
							checked={suspensionConfig.suspendFromBookingsRecIt}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromBookingsRecIt: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			<Separator />

			{/* Intramural Default Suspension Settings */}
			<Card>
				<CardHeader>
					<CardTitle>
						Intramural - Default Suspension Settings
					</CardTitle>
					<CardDescription>
						Configure default suspension behavior for intramural
						violations.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Suspend from Facility Access</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromFacilityAccessIntramural
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromFacilityAccessIntramural: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Intramurals</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromIntramuralsIntramural
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromIntramuralsIntramural: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Programs</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromProgramsIntramural
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromProgramsIntramural: c,
								})
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label>Suspend from Bookings</Label>
						<Switch
							checked={
								suspensionConfig.suspendFromBookingsIntramural
							}
							onCheckedChange={(c) =>
								updateSuspensionConfig({
									suspendFromBookingsIntramural: c,
								})
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
