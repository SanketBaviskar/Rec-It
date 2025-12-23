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
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function BookingWindow() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Calendar className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Booking Window</CardTitle>
						<CardDescription>
							Configure how far in advance bookings can be made.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label>Advance Booking (days)</Label>
						<Input
							type="number"
							value={config.advanceBookingDays}
							onChange={(e) =>
								updateConfig({
									advanceBookingDays:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Min Booking Duration (hours)</Label>
						<Input
							type="number"
							value={config.minBookingHours}
							onChange={(e) =>
								updateConfig({
									minBookingHours:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Max Booking Duration (hours)</Label>
						<Input
							type="number"
							value={config.maxBookingHours}
							onChange={(e) =>
								updateConfig({
									maxBookingHours:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Allow Same-Day Booking</Label>
						<p className="text-xs text-muted-foreground">
							Users can book facilities on the same day.
						</p>
					</div>
					<Switch
						checked={config.sameDayBookingAllowed}
						onCheckedChange={(c) =>
							updateConfig({
								sameDayBookingAllowed: c,
							})
						}
					/>
				</div>

				{config.sameDayBookingAllowed && (
					<div className="space-y-2">
						<Label>Same-Day Cutoff (hours before)</Label>
						<Input
							type="number"
							value={config.sameDayBookingCutoffHours}
							onChange={(e) =>
								updateConfig({
									sameDayBookingCutoffHours:
										parseInt(e.target.value) || 0,
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
