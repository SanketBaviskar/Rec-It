import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Save,
	RotateCcw,
	Trophy,
	Users,
	Calendar,
	Plus,
	Edit,
	Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

// Mock Sport Types
const SPORT_TYPES = [
	{
		id: 1,
		name: "Basketball",
		teamsPerLeague: 8,
		playersPerTeam: 12,
		active: true,
	},
	{
		id: 2,
		name: "Soccer",
		teamsPerLeague: 10,
		playersPerTeam: 18,
		active: true,
	},
	{
		id: 3,
		name: "Volleyball",
		teamsPerLeague: 8,
		playersPerTeam: 10,
		active: true,
	},
	{
		id: 4,
		name: "Flag Football",
		teamsPerLeague: 8,
		playersPerTeam: 15,
		active: true,
	},
	{
		id: 5,
		name: "Softball",
		teamsPerLeague: 6,
		playersPerTeam: 15,
		active: false,
	},
];

const DEFAULT_CONFIG = {
	// Registration Settings
	registrationOpenDays: 14,
	registrationCloseDays: 3,
	allowLateRegistration: true,
	lateRegistrationFee: 25.0,

	// Team Settings
	minPlayersToStart: 5,
	allowFreeAgents: true,
	freeAgentDeadlineDays: 7,

	// Eligibility
	requireActiveMembers: true,
	allowGuestPlayers: false,
	maxGuestsPerTeam: 2,
	requireWaiver: true,

	// Scheduling
	defaultGameLength: 60,
	timeBetweenGames: 15,
	allowReschedule: true,
	rescheduleDeadlineHours: 48,

	// Forfeit Policy
	forfeitWaitMinutes: 10,
	forfeitPenaltyPoints: 2,
	maxForfeitsBeforeRemoval: 3,

	// Scoring & Standings
	winPoints: 3,
	tiePoints: 1,
	lossPoints: 0,
	tiebreaker: "headToHead",
};

export default function IntramuralsConfig() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [sports, setSports] = useState(SPORT_TYPES);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Intramural sports configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Intramural settings restored to defaults.",
		});
	};

	const toggleSport = (id: number) => {
		setSports(
			sports.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
		);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Intramural Sports</h1>
					<p className="text-muted-foreground mt-1">
						Configure leagues, eligibility, and scheduling rules.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleReset}>
						<RotateCcw className="w-4 h-4 mr-2" />
						Reset
					</Button>
					<Button onClick={handleSave} disabled={isSaving}>
						<Save className="w-4 h-4 mr-2" />
						{isSaving ? "Saving..." : "Save Settings"}
					</Button>
				</div>
			</div>

			{/* Sport Types */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Trophy className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Sport Types</CardTitle>
								<CardDescription>
									Manage available intramural sports.
								</CardDescription>
							</div>
						</div>
						<Button size="sm">
							<Plus className="h-4 w-4 mr-2" />
							Add Sport
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Sport</TableHead>
								<TableHead>Teams/League</TableHead>
								<TableHead>Players/Team</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-20">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sports.map((sport) => (
								<TableRow key={sport.id}>
									<TableCell className="font-medium">
										{sport.name}
									</TableCell>
									<TableCell>
										{sport.teamsPerLeague}
									</TableCell>
									<TableCell>
										{sport.playersPerTeam}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												sport.active
													? "default"
													: "secondary"
											}
										>
											{sport.active
												? "Active"
												: "Inactive"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Switch
												checked={sport.active}
												onCheckedChange={() =>
													toggleSport(sport.id)
												}
											/>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Registration Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Registration Settings</CardTitle>
							<CardDescription>
								Configure registration windows and fees.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>
								Registration Opens (days before season)
							</Label>
							<Input
								type="number"
								value={config.registrationOpenDays}
								onChange={(e) =>
									setConfig({
										...config,
										registrationOpenDays:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Registration Closes (days before season)
							</Label>
							<Input
								type="number"
								value={config.registrationCloseDays}
								onChange={(e) =>
									setConfig({
										...config,
										registrationCloseDays:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Late Registration</Label>
							<p className="text-xs text-muted-foreground">
								Teams can register after deadline with a fee.
							</p>
						</div>
						<Switch
							checked={config.allowLateRegistration}
							onCheckedChange={(c) =>
								setConfig({
									...config,
									allowLateRegistration: c,
								})
							}
						/>
					</div>

					{config.allowLateRegistration && (
						<div className="space-y-2">
							<Label>Late Registration Fee ($)</Label>
							<Input
								type="number"
								step="0.01"
								value={config.lateRegistrationFee}
								onChange={(e) =>
									setConfig({
										...config,
										lateRegistrationFee:
											parseFloat(e.target.value) || 0,
									})
								}
								className="w-32"
							/>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Team & Eligibility */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Team & Eligibility</CardTitle>
							<CardDescription>
								Configure team requirements and player
								eligibility.
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
									setConfig({
										...config,
										minPlayersToStart:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Free Agent Deadline (days before season)
							</Label>
							<Input
								type="number"
								value={config.freeAgentDeadlineDays}
								onChange={(e) =>
									setConfig({
										...config,
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
									setConfig({
										...config,
										requireActiveMembers: c,
									})
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Allow Free Agents</Label>
								<p className="text-xs text-muted-foreground">
									Individual players can sign up without a
									team.
								</p>
							</div>
							<Switch
								checked={config.allowFreeAgents}
								onCheckedChange={(c) =>
									setConfig({ ...config, allowFreeAgents: c })
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
									setConfig({ ...config, requireWaiver: c })
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Scoring & Standings */}
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
									setConfig({
										...config,
										winPoints:
											parseInt(e.target.value) || 0,
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
									setConfig({
										...config,
										tiePoints:
											parseInt(e.target.value) || 0,
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
									setConfig({
										...config,
										lossPoints:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Tiebreaker Method</Label>
						<Select
							value={config.tiebreaker}
							onValueChange={(v) =>
								setConfig({ ...config, tiebreaker: v })
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
								<SelectItem value="coinFlip">
									Coin Flip
								</SelectItem>
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
									setConfig({
										...config,
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
									setConfig({
										...config,
										maxForfeitsBeforeRemoval:
											parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
