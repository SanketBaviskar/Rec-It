import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function OperatingHoursSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Operating Hours</h3>
				<p className="text-sm text-muted-foreground">
					Configure when your facility is open.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Standard Operating Hours</CardTitle>
					<CardDescription>
						Defines when the facility is open for bookings.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{[
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
						"Sunday",
					].map((day) => (
						<div
							key={day}
							className="flex items-center justify-between"
						>
							<div className="flex items-center space-x-4">
								<Switch
									id={`open-${day}`}
									defaultChecked={day !== "Sunday"}
								/>
								<Label
									htmlFor={`open-${day}`}
									className="w-24 font-medium"
								>
									{day}
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									type="time"
									className="w-32"
									defaultValue="08:00"
								/>
								<span className="text-muted-foreground">-</span>
								<Input
									type="time"
									className="w-32"
									defaultValue="22:00"
								/>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
