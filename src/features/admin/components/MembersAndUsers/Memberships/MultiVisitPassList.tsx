import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
	Ticket,
	Plus,
	Trash2,
	Edit,
	Archive,
	ArchiveRestore,
	Clock,
	DollarSign,
} from "lucide-react";
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
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type PassType = {
	id: string;
	name: string;
	visits: number;
	price: number;
	active: boolean;
	expiryDays: number | null;
	expiryUnit: "Days" | "Months" | "Years" | null;
};

const INITIAL_PASSES: PassType[] = [
	{
		id: "1",
		name: "10-Visit Punch Card",
		visits: 10,
		price: 50,
		active: true,
		expiryDays: 90,
		expiryUnit: "Days",
	},
	{
		id: "2",
		name: "Day Pass Bundle (5)",
		visits: 5,
		price: 30,
		active: true,
		expiryDays: 30,
		expiryUnit: "Days",
	},
	{
		id: "3",
		name: "Summer 20-Pack",
		visits: 20,
		price: 80,
		active: false,
		expiryDays: null,
		expiryUnit: null,
	},
];

const MultiVisitPassList = () => {
	const [passes, setPasses] = useState<PassType[]>(INITIAL_PASSES);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingPass, setEditingPass] = useState<PassType | null>(null);
	const [newPass, setNewPass] = useState<Omit<PassType, "id" | "active">>({
		name: "",
		visits: 10,
		price: 0,
		expiryDays: null,
		expiryUnit: null,
	});
	const [hasExpiry, setHasExpiry] = useState(false);

	// Calculate statistics
	const stats = useMemo(() => {
		const activePasses = passes.filter((p) => p.active);
		const totalVisits = activePasses.reduce((sum, p) => sum + p.visits, 0);
		const avgPrice =
			activePasses.length > 0
				? activePasses.reduce((sum, p) => sum + p.price, 0) /
				  activePasses.length
				: 0;

		return {
			totalPasses: passes.length,
			activePasses: activePasses.length,
			totalVisits,
			avgPrice: avgPrice.toFixed(2),
		};
	}, [passes]);

	const handleOpenDialog = (pass?: PassType) => {
		if (pass) {
			setEditingPass(pass);
			setNewPass({
				name: pass.name,
				visits: pass.visits,
				price: pass.price,
				expiryDays: pass.expiryDays,
				expiryUnit: pass.expiryUnit,
			});
			setHasExpiry(pass.expiryDays !== null);
		} else {
			setEditingPass(null);
			setNewPass({
				name: "",
				visits: 10,
				price: 0,
				expiryDays: null,
				expiryUnit: null,
			});
			setHasExpiry(false);
		}
		setIsDialogOpen(true);
	};

	const handleSavePass = () => {
		if (!newPass.name) return;

		const passData: PassType = {
			id: editingPass?.id || Date.now().toString(),
			name: newPass.name,
			visits: newPass.visits,
			price: newPass.price,
			active: editingPass?.active ?? true,
			expiryDays: hasExpiry ? newPass.expiryDays : null,
			expiryUnit: hasExpiry ? newPass.expiryUnit : null,
		};

		if (editingPass) {
			setPasses(
				passes.map((p) => (p.id === editingPass.id ? passData : p))
			);
		} else {
			setPasses([...passes, passData]);
		}

		setIsDialogOpen(false);
		setEditingPass(null);
	};

	const handleDelete = (id: string) => {
		setPasses(passes.filter((p) => p.id !== id));
	};

	const handleToggleArchive = (id: string) => {
		setPasses(
			passes.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
		);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Punch Cards
					</h2>
					<p className="text-muted-foreground">
						Configure multi-visit passes and bundles.
					</p>
				</div>
				<Button onClick={() => handleOpenDialog()}>
					<Plus className="w-4 h-4 mr-2" />
					Add Pass Type
				</Button>
			</div>

			{/* Statistics Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-primary/10">
							<Ticket className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Active Passes
							</p>
							<p className="text-2xl font-bold">
								{stats.activePasses}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-green-500/10">
							<Clock className="h-5 w-5 text-green-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total Visits Offered
							</p>
							<p className="text-2xl font-bold">
								{stats.totalVisits}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-blue-500/10">
							<DollarSign className="h-5 w-5 text-blue-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Avg. Price
							</p>
							<p className="text-2xl font-bold">
								${stats.avgPrice}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Passes Table */}
			<div className="border rounded-lg overflow-hidden bg-card">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead>Pass Name</TableHead>
							<TableHead>Visits</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Expiry</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[120px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{passes.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="h-32 text-center"
								>
									<div className="text-muted-foreground">
										<Ticket className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No pass types yet.</p>
										<p className="text-sm">
											Click "Add Pass Type" to create your
											first.
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							passes.map((pass) => (
								<TableRow
									key={pass.id}
									className={!pass.active ? "opacity-60" : ""}
								>
									<TableCell className="font-medium">
										{pass.name}
									</TableCell>
									<TableCell>{pass.visits}</TableCell>
									<TableCell>
										${pass.price.toFixed(2)}
									</TableCell>
									<TableCell>
										{pass.expiryDays && pass.expiryUnit ? (
											<span className="text-sm">
												{pass.expiryDays}{" "}
												{pass.expiryUnit}
											</span>
										) : (
											<span className="text-sm text-muted-foreground">
												No Expiry
											</span>
										)}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												pass.active
													? "default"
													: "secondary"
											}
										>
											{pass.active
												? "Active"
												: "Archived"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleOpenDialog(pass)
												}
												title="Edit"
											>
												<Edit className="w-4 h-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleToggleArchive(pass.id)
												}
												title={
													pass.active
														? "Archive"
														: "Restore"
												}
											>
												{pass.active ? (
													<Archive className="w-4 h-4" />
												) : (
													<ArchiveRestore className="w-4 h-4" />
												)}
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="text-destructive"
														title="Delete"
													>
														<Trash2 className="w-4 h-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete Pass Type?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This will
															permanently delete "
															{pass.name}". This
															action cannot be
															undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={() =>
																handleDelete(
																	pass.id
																)
															}
															className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>
							{editingPass
								? "Edit Pass Type"
								: "Create Pass Type"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 pt-4">
						<div className="space-y-2">
							<Label htmlFor="pass-name">Pass Name</Label>
							<Input
								id="pass-name"
								value={newPass.name}
								onChange={(e) =>
									setNewPass({
										...newPass,
										name: e.target.value,
									})
								}
								placeholder="e.g., 20-Visit Pack"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="pass-visits">
									Visits Included
								</Label>
								<Input
									id="pass-visits"
									type="number"
									value={newPass.visits}
									onChange={(e) =>
										setNewPass({
											...newPass,
											visits:
												parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="pass-price">Price ($)</Label>
								<Input
									id="pass-price"
									type="number"
									step="0.01"
									value={newPass.price}
									onChange={(e) =>
										setNewPass({
											...newPass,
											price:
												parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						</div>

						{/* Expiry Toggle */}
						<div className="flex items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<Label htmlFor="has-expiry">
									Set Expiration
								</Label>
								<p className="text-sm text-muted-foreground">
									Pass expires after a set period from
									purchase.
								</p>
							</div>
							<Switch
								id="has-expiry"
								checked={hasExpiry}
								onCheckedChange={(checked) => {
									setHasExpiry(checked);
									if (!checked) {
										setNewPass({
											...newPass,
											expiryDays: null,
											expiryUnit: null,
										});
									} else {
										setNewPass({
											...newPass,
											expiryDays: 30,
											expiryUnit: "Days",
										});
									}
								}}
							/>
						</div>

						{/* Expiry Fields */}
						{hasExpiry && (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="expiry-value">
										Expires After
									</Label>
									<Input
										id="expiry-value"
										type="number"
										value={newPass.expiryDays ?? ""}
										onChange={(e) =>
											setNewPass({
												...newPass,
												expiryDays:
													parseInt(e.target.value) ||
													null,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="expiry-unit">Unit</Label>
									<Select
										value={newPass.expiryUnit || "Days"}
										onValueChange={(v) =>
											setNewPass({
												...newPass,
												expiryUnit: v as
													| "Days"
													| "Months"
													| "Years",
											})
										}
									>
										<SelectTrigger id="expiry-unit">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Days">
												Days
											</SelectItem>
											<SelectItem value="Months">
												Months
											</SelectItem>
											<SelectItem value="Years">
												Years
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						)}

						<div className="flex justify-end gap-2 pt-4">
							<Button
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleSavePass}>
								{editingPass ? "Save Changes" : "Create Pass"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default MultiVisitPassList;
