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
import { Label } from "@/components/ui/label";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Plus, Edit, Trash2 } from "lucide-react";
import { useIncidentConfig, IncidentType } from "../useIncidentConfig";

export default function IncidentTypes() {
	const {
		incidentTypes,
		addIncidentType,
		updateIncidentType,
		removeIncidentType,
	} = useIncidentConfig();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<Partial<IncidentType>>({
		name: "",
		severity: "Low",
		requiresReport: true,
		active: true,
	});

	const handleOpenDialog = (type?: IncidentType) => {
		if (type) {
			setEditingId(type.id);
			setFormData(type);
		} else {
			setEditingId(null);
			setFormData({
				name: "",
				severity: "Low",
				requiresReport: true,
				active: true,
			});
		}
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		if (!formData.name) return;

		if (editingId) {
			updateIncidentType(editingId, formData);
		} else {
			addIncidentType(formData as Omit<IncidentType, "id">);
		}
		setIsDialogOpen(false);
	};

	const getSeverityBadge = (severity: string) => {
		switch (severity) {
			case "Critical":
				return <Badge variant="destructive">{severity}</Badge>;
			case "High":
				return <Badge className="bg-orange-600">{severity}</Badge>;
			case "Medium":
				return <Badge className="bg-yellow-600">{severity}</Badge>;
			default:
				return <Badge variant="secondary">{severity}</Badge>;
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						<div>
							<CardTitle>Incident Types</CardTitle>
							<CardDescription>
								Define categories and severity levels for
								incidents.
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
								Add Type
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editingId
										? "Edit Incident Type"
										: "Add Incident Type"}
								</DialogTitle>
								<DialogDescription>
									Configure incident category details.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label>Type Name</Label>
									<Input
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										placeholder="e.g. Equipment Damage"
									/>
								</div>
								<div className="space-y-2">
									<Label>Severity Level</Label>
									<Select
										value={formData.severity}
										onValueChange={(v) =>
											setFormData({
												...formData,
												severity:
													v as IncidentType["severity"],
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Low">
												Low
											</SelectItem>
											<SelectItem value="Medium">
												Medium
											</SelectItem>
											<SelectItem value="High">
												High
											</SelectItem>
											<SelectItem value="Critical">
												Critical
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={formData.requiresReport}
										onCheckedChange={(c) =>
											setFormData({
												...formData,
												requiresReport: c,
											})
										}
									/>
									<Label>Requires Formal Report</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={formData.active}
										onCheckedChange={(c) =>
											setFormData({
												...formData,
												active: c,
											})
										}
									/>
									<Label>Active</Label>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleSave}>
									{editingId ? "Save Changes" : "Add Type"}
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
							<TableHead>Incident Type</TableHead>
							<TableHead>Severity</TableHead>
							<TableHead>Report Required</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-20">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{incidentTypes.map((type) => (
							<TableRow key={type.id}>
								<TableCell className="font-medium">
									{type.name}
								</TableCell>
								<TableCell>
									{getSeverityBadge(type.severity)}
								</TableCell>
								<TableCell>
									{type.requiresReport ? "Yes" : "Optional"}
								</TableCell>
								<TableCell>
									<Badge
										variant={
											type.active
												? "default"
												: "secondary"
										}
									>
										{type.active ? "Active" : "Inactive"}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={() =>
												handleOpenDialog(type)
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
														"Delete this incident type?"
													)
												) {
													removeIncidentType(type.id);
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
