import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGroupFitnessConfig } from "../useGroupFitnessConfig";

export default function CancellationPolicy() {
	const { config, updateConfig } = useGroupFitnessConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cancellation Policy</CardTitle>
				<CardDescription>
					Configure penalties for late cancellations and no-shows.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Late Cancel Window (minutes before)</Label>
						<Input
							type="number"
							value={config.lateCancelMinutes}
							onChange={(e) =>
								updateConfig({
									lateCancelMinutes:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							Cancellations within this window are "late."
						</p>
					</div>
					<div className="space-y-2">
						<Label>Late Cancel Fee ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.lateCancelFee}
							onChange={(e) =>
								updateConfig({
									lateCancelFee:
										parseFloat(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>No-Show Fee ($)</Label>
						<Input
							type="number"
							step="0.01"
							value={config.noShowFee}
							onChange={(e) =>
								updateConfig({
									noShowFee: parseFloat(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Max No-Shows Per Month</Label>
						<Input
							type="number"
							value={config.maxNoShowsPerMonth}
							onChange={(e) =>
								updateConfig({
									maxNoShowsPerMonth:
										parseInt(e.target.value) || 0,
								})
							}
						/>
						<p className="text-xs text-muted-foreground">
							Before booking privileges suspended.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
