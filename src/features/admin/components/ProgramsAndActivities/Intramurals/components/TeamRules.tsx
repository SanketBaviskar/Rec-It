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
import { Users } from "lucide-react";
import { useIntramuralConfig } from "../useIntramuralConfig";

export default function TeamRules() {
	const { config, updateConfig } = useIntramuralConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Users className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Team & Eligibility</CardTitle>
						<CardDescription>
							Configure team requirements and player eligibility.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Minimum Players to Start Game</Label>
						<Input
							type="number"
							value={config.minPlayersToStart}
							onChange={(e) =>
								updateConfig({
									minPlayersToStart:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Free Agent Deadline (days before season)</Label>
						<Input
							type="number"
							value={config.freeAgentDeadlineDays}
							onChange={(e) =>
								updateConfig({
									freeAgentDeadlineDays:
										parseInt(e.target.value) || 0,
								})
							}
						/>
					</div>
				</div>

				<Separator />

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Active Membership</Label>
							<p className="text-xs text-muted-foreground">
								Players must have valid membership to
								participate.
							</p>
						</div>
						<Switch
							checked={config.requireActiveMembers}
							onCheckedChange={(c) =>
								updateConfig({
									requireActiveMembers: c,
								})
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Free Agents</Label>
							<p className="text-xs text-muted-foreground">
								Individual players can sign up without a team.
							</p>
						</div>
						<Switch
							checked={config.allowFreeAgents}
							onCheckedChange={(c) =>
								updateConfig({ allowFreeAgents: c })
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Require Waiver</Label>
							<p className="text-xs text-muted-foreground">
								Players must sign waiver before first game.
							</p>
						</div>
						<Switch
							checked={config.requireWaiver}
							onCheckedChange={(c) =>
								updateConfig({ requireWaiver: c })
							}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
