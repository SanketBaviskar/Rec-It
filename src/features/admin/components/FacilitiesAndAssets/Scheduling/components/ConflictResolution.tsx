import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function ConflictResolution() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Conflict Resolution</CardTitle>
				<CardDescription>
					Configure how overlapping bookings are handled.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Priority System</Label>
					<Select
						value={config.prioritySystem}
						onValueChange={(v) =>
							updateConfig({ prioritySystem: v })
						}
					>
						<SelectTrigger className="w-64">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="firstComeFirstServed">
								First Come, First Served
							</SelectItem>
							<SelectItem value="memberPriority">
								Member Priority
							</SelectItem>
							<SelectItem value="staffPriority">
								Staff Priority
							</SelectItem>
							<SelectItem value="departmentPriority">
								Department Priority
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>Buffer Time Between Bookings (minutes)</Label>
					<Input
						type="number"
						value={config.bufferMinutes}
						onChange={(e) =>
							updateConfig({
								bufferMinutes: parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
