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
import { Dumbbell, Plus, Edit, Trash2 } from "lucide-react";
import { useGroupFitnessConfig, ClassType } from "../useGroupFitnessConfig";

export default function ClassTypes() {
	const { classTypes, addClassType, updateClassType, removeClassType } =
		useGroupFitnessConfig();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<Partial<ClassType>>({
		name: "",
		duration: 60,
		capacity: 20,
		active: true,
	});

	const handleOpenDialog = (classType?: ClassType) => {
		if (classType) {
			setEditingId(classType.id);
			setFormData(classType);
		} else {
			setEditingId(null);
			setFormData({
				name: "",
				duration: 60,
				capacity: 20,
				active: true,
			});
		}
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		if (!formData.name) return;

		if (editingId) {
			updateClassType(editingId, formData);
		} else {
			addClassType(formData as Omit<ClassType, "id">);
		}
		setIsDialogOpen(false);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Dumbbell className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Class Types</CardTitle>
							<CardDescription>
								Manage available group fitness classes.
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
								Add Class Type
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editingId
										? "Edit Class Type"
										: "Add Class Type"}
								</DialogTitle>
								<DialogDescription>
									Configure class defaults and limits.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label>Class Name</Label>
									<Input
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										placeholder="e.g. Yoga Flow"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Duration (min)</Label>
										<Input
											type="number"
											value={formData.duration}
											onChange={(e) =>
												setFormData({
													...formData,
													duration:
														parseInt(
															e.target.value
														) || 0,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Default Capacity</Label>
										<Input
											type="number"
											value={formData.capacity}
											onChange={(e) =>
												setFormData({
													...formData,
													capacity:
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
										Active (Available for scheduling)
									</Label>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleSave}>
									{editingId ? "Save Changes" : "Add Class"}
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
							<TableHead>Class</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Capacity</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-20">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{classTypes.map((cls) => (
							<TableRow key={cls.id}>
								<TableCell className="font-medium">
									{cls.name}
								</TableCell>
								<TableCell>{cls.duration} min</TableCell>
								<TableCell>{cls.capacity}</TableCell>
								<TableCell>
									<Badge
										variant={
											cls.active ? "default" : "secondary"
										}
									>
										{cls.active ? "Active" : "Inactive"}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={() =>
												handleOpenDialog(cls)
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
														"Delete this class type?"
													)
												) {
													removeClassType(cls.id);
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
