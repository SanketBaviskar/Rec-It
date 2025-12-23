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
import { Megaphone, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { useMarketingConfig, Campaign } from "../useMarketingConfig";

export default function Campaigns() {
	const { campaigns, addCampaign, updateCampaign, removeCampaign } =
		useMarketingConfig();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<Partial<Campaign>>({
		name: "",
		type: "Email",
		status: "Draft",
		sent: 0,
	});

	const handleOpenDialog = (campaign?: Campaign) => {
		if (campaign) {
			setEditingId(campaign.id);
			setFormData(campaign);
		} else {
			setEditingId(null);
			setFormData({
				name: "",
				type: "Email",
				status: "Draft",
				sent: 0,
			});
		}
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		if (!formData.name) return;

		if (editingId) {
			updateCampaign(editingId, formData);
		} else {
			addCampaign(formData as Omit<Campaign, "id">);
		}
		setIsDialogOpen(false);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Megaphone className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Campaigns</CardTitle>
							<CardDescription>
								Manage marketing campaigns and templates.
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
								New Campaign
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editingId
										? "Edit Campaign"
										: "New Campaign"}
								</DialogTitle>
								<DialogDescription>
									Configure campaign details.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label>Campaign Name</Label>
									<Input
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										placeholder="e.g. Summer Promotion"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Type</Label>
										<Select
											value={formData.type}
											onValueChange={(v) =>
												setFormData({
													...formData,
													type: v as Campaign["type"],
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Email">
													Email
												</SelectItem>
												<SelectItem value="Push">
													Push
												</SelectItem>
												<SelectItem value="SMS">
													SMS
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label>Status</Label>
										<Select
											value={formData.status}
											onValueChange={(v) =>
												setFormData({
													...formData,
													status: v as Campaign["status"],
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Draft">
													Draft
												</SelectItem>
												<SelectItem value="Active">
													Active
												</SelectItem>
												<SelectItem value="Paused">
													Paused
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleSave}>
									{editingId ? "Save Changes" : "Create"}
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
							<TableHead>Campaign Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Sent</TableHead>
							<TableHead className="w-24">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{campaigns.map((campaign) => (
							<TableRow key={campaign.id}>
								<TableCell className="font-medium">
									{campaign.name}
								</TableCell>
								<TableCell>
									<Badge variant="outline">
										{campaign.type}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										variant={
											campaign.status === "Active"
												? "default"
												: "secondary"
										}
									>
										{campaign.status}
									</Badge>
								</TableCell>
								<TableCell>
									{campaign.sent.toLocaleString()}
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
										>
											<Eye className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={() =>
												handleOpenDialog(campaign)
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
														"Delete this campaign?"
													)
												) {
													removeCampaign(campaign.id);
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
