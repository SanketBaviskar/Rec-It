import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trophy, Plus, Edit, Trash2 } from "lucide-react";
import { useIntramuralConfig, SportType } from "../useIntramuralConfig";

export default function SportTypes() {
	const { sports, addSport, updateSport, removeSport } =
		useIntramuralConfig();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<Partial<SportType>>({
		name: "",
		teamsPerLeague: 8,
		playersPerTeam: 10,
		active: true,
	});

	const handleOpenDialog = (sport?: SportType) => {
		if (sport) {
			setEditingId(sport.id);
			setFormData(sport);
		} else {
			setEditingId(null);
			setFormData({
				name: "",
				teamsPerLeague: 8,
				playersPerTeam: 10,
				active: true,
			});
		}
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		if (!formData.name) return;

		if (editingId) {
			updateSport(editingId, formData);
		} else {
			addSport(formData as Omit<SportType, "id">);
		}
		setIsDialogOpen(false);
	};

	return (
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
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button
								size="sm"
								onClick={() => handleOpenDialog()}
							>
								<Plus className="h-4 w-4 mr-2" />
								Add Sport
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editingId ? "Edit Sport" : "Add Sport"}
								</DialogTitle>
								<DialogDescription>
									Configure sport details and defaults.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label>Sport Name</Label>
									<Input
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										placeholder="e.g. Futsal"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Teams per League</Label>
										<Input
											type="number"
											value={formData.teamsPerLeague}
											onChange={(e) =>
												setFormData({
													...formData,
													teamsPerLeague:
														parseInt(
															e.target.value
														) || 0,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Players per Team</Label>
										<Input
											type="number"
											value={formData.playersPerTeam}
											onChange={(e) =>
												setFormData({
													...formData,
													playersPerTeam:
														parseInt(
															e.target.value
														) || 0,
												})
											}
										/>
									</div>
								</div>
								<div className="flex items-center space-x-2 pt-2">
									<Switch
										checked={formData.active}
										onCheckedChange={(c) =>
											setFormData({
												...formData,
												active: c,
											})
										}
									/>
									<Label>
										Active (Available for registration)
									</Label>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleSave}>
									{editingId ? "Save Changes" : "Add Sport"}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
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
								<TableCell>{sport.teamsPerLeague}</TableCell>
								<TableCell>{sport.playersPerTeam}</TableCell>
								<TableCell>
									<Badge
										variant={
											sport.active
												? "default"
												: "secondary"
										}
									>
										{sport.active ? "Active" : "Inactive"}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={() =>
												handleOpenDialog(sport)
											}
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
											onClick={() => {
												if (
													confirm(
														"Are you sure you want to delete this sport?"
													)
												) {
													removeSport(sport.id);
												}
											}}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
