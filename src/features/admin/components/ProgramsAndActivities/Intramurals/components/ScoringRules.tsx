import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useIntramuralConfig, IntramuralConfig } from "../useIntramuralConfig";

export default function ScoringRules() {
	const { config, updateConfig } = useIntramuralConfig();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Scoring & Standings</CardTitle>
				<CardDescription>
					Configure how standings are calculated.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label>Win Points</Label>
						<Input
							type="number"
							value={config.winPoints}
							onChange={(e) =>
								updateConfig({
									winPoints: parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Tie Points</Label>
						<Input
							type="number"
							value={config.tiePoints}
							onChange={(e) =>
								updateConfig({
									tiePoints: parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Loss Points</Label>
						<Input
							type="number"
							value={config.lossPoints}
							onChange={(e) =>
								updateConfig({
									lossPoints: parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label>Tiebreaker Method</Label>
					<Select
						value={config.tiebreaker}
						onValueChange={(v: IntramuralConfig["tiebreaker"]) =>
							updateConfig({ tiebreaker: v })
						}
					>
						<SelectTrigger className="w-64">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="headToHead">
								Head-to-Head Record
							</SelectItem>
							<SelectItem value="pointDiff">
								Point Differential
							</SelectItem>
							<SelectItem value="pointsScored">
								Total Points Scored
							</SelectItem>
							<SelectItem value="coinFlip">Coin Flip</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Forfeit Wait Time (minutes)</Label>
						<Input
							type="number"
							value={config.forfeitWaitMinutes}
							onChange={(e) =>
								updateConfig({
									forfeitWaitMinutes:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Max Forfeits Before Removal</Label>
						<Input
							type="number"
							value={config.maxForfeitsBeforeRemoval}
							onChange={(e) =>
								updateConfig({
									maxForfeitsBeforeRemoval:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
