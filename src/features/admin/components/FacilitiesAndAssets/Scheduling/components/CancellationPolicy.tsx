import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSchedulingConfig } from "../useSchedulingConfig";

export default function CancellationPolicy() {
	const { config, updateConfig } = useSchedulingConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cancellation Policy</CardTitle>
				<CardDescription>
					Configure cancellation windows and fees.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Free Cancellation Window (hours before)</Label>
					<Input
						type="number"
						value={config.freeCancellationHours}
						onChange={(e) =>
							updateConfig({
								freeCancellationHours:
									parseInt(e.target.value) || 0,
							})
						}
						className="w-32"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Late Cancellation Fee ($)</Label>
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
				</div>
			</CardContent>
		</Card>
	);
}
