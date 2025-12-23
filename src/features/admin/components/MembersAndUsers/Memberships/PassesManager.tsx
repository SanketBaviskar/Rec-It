import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Edit,
	Trash2,
	Plus,
	Archive,
	ArchiveRestore,
	Ticket,
	UserPlus,
	Calendar,
	Search,
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
	DialogTrigger,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Pass Type definition
interface PassType {
	id: string;
	name: string;
	passCategory: "punch_card" | "guest_pass" | "day_pass";
	visits: number; // For punch cards, 1 for day/guest passes
	price: number;
	memberPrice?: number;
	active: boolean;
	expiryDays: number | null;
	expiryUnit: "Days" | "Months" | "Years" | null;
	// Guest-specific
	requiresWaiver: boolean;
	requiresSponsor: boolean;
	maxPerMember: number;
	// Access settings
	accessZones: string[];
	accessAllZones: boolean;
	validHoursStart: string | null;
	validHoursEnd: string | null;
	// Kiosk settings
	kioskEnabled: boolean;
	qrCodeEnabled: boolean;
	description?: string;
}

// Initial sample data
const INITIAL_PASSES: PassType[] = [
	{
		id: "1",
		name: "10-Visit Punch Card",
		passCategory: "punch_card",
		visits: 10,
		price: 50,
		memberPrice: 45,
		active: true,
		expiryDays: 90,
		expiryUnit: "Days",
		requiresWaiver: false,
		requiresSponsor: false,
		maxPerMember: 0,
		accessZones: [],
		accessAllZones: true,
		validHoursStart: null,
		validHoursEnd: null,
		kioskEnabled: true,
		qrCodeEnabled: true,
		description: "10 visits, perfect for occasional users",
	},
	{
		id: "2",
		name: "Day Pass Bundle (5)",
		passCategory: "punch_card",
		visits: 5,
		price: 30,
		memberPrice: 25,
		active: true,
		expiryDays: 30,
		expiryUnit: "Days",
		requiresWaiver: false,
		requiresSponsor: false,
		maxPerMember: 0,
		accessZones: [],
		accessAllZones: true,
		validHoursStart: null,
		validHoursEnd: null,
		kioskEnabled: true,
		qrCodeEnabled: true,
		description: "5 day passes at a discount",
	},
	{
		id: "3",
		name: "Guest Day Pass",
		passCategory: "guest_pass",
		visits: 1,
		price: 15,
		memberPrice: 10,
		active: true,
		expiryDays: 1,
		expiryUnit: "Days",
		requiresWaiver: true,
		requiresSponsor: true,
		maxPerMember: 2,
		accessZones: ["Gym", "Cardio", "Courts"],
		accessAllZones: false,
		validHoursStart: "06:00",
		validHoursEnd: "22:00",
		kioskEnabled: true,
		qrCodeEnabled: true,
		description: "Single day guest access with member sponsor",
	},
	{
		id: "4",
		name: "Single Day Pass",
		passCategory: "day_pass",
		visits: 1,
		price: 12,
		active: true,
		expiryDays: 1,
		expiryUnit: "Days",
		requiresWaiver: true,
		requiresSponsor: false,
		maxPerMember: 0,
		accessZones: [],
		accessAllZones: true,
		validHoursStart: null,
		validHoursEnd: null,
		kioskEnabled: true,
		qrCodeEnabled: true,
		description: "Single day access for non-members",
	},
];

const AVAILABLE_ZONES = [
	"Gym",
	"Cardio",
	"Courts",
	"Pool",
	"Track",
	"Studios",
	"Climbing Wall",
];

const PassesManager = () => {
	const [passes, setPasses] = useState<PassType[]>(INITIAL_PASSES);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterCategory, setFilterCategory] = useState<string>("all");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingPass, setEditingPass] = useState<PassType | null>(null);

	// Form state
	const [formData, setFormData] = useState<Partial<PassType>>({
		name: "",
		passCategory: "punch_card",
		visits: 1,
		price: 0,
		memberPrice: undefined,
		active: true,
		expiryDays: 30,
		expiryUnit: "Days",
		requiresWaiver: false,
		requiresSponsor: false,
		maxPerMember: 2,
		accessZones: [],
		accessAllZones: true,
		validHoursStart: null,
		validHoursEnd: null,
		kioskEnabled: true,
		qrCodeEnabled: true,
		description: "",
	});

	// Filtered passes
	const filteredPasses = useMemo(() => {
		return passes.filter((pass) => {
			const matchesSearch = pass.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory =
				filterCategory === "all" ||
				pass.passCategory === filterCategory;
			return matchesSearch && matchesCategory;
		});
	}, [passes, searchQuery, filterCategory]);

	// Stats
	const stats = useMemo(() => {
		const activePasses = passes.filter((p) => p.active);
		const punchCards = passes.filter(
			(p) => p.passCategory === "punch_card"
		);
		const guestPasses = passes.filter(
			(p) => p.passCategory === "guest_pass"
		);
		return {
			total: passes.length,
			active: activePasses.length,
			punchCards: punchCards.length,
			guestPasses: guestPasses.length,
		};
	}, [passes]);

	const handleOpenDialog = (pass?: PassType) => {
		if (pass) {
			setEditingPass(pass);
			setFormData(pass);
		} else {
			setEditingPass(null);
			setFormData({
				name: "",
				passCategory: "punch_card",
				visits: 1,
				price: 0,
				memberPrice: undefined,
				active: true,
				expiryDays: 30,
				expiryUnit: "Days",
				requiresWaiver: false,
				requiresSponsor: false,
				maxPerMember: 2,
				accessZones: [],
				accessAllZones: true,
				validHoursStart: null,
				validHoursEnd: null,
				kioskEnabled: true,
				qrCodeEnabled: true,
				description: "",
			});
		}
		setIsDialogOpen(true);
	};

	const handleSavePass = () => {
		if (!formData.name || !formData.price) return;

		const newPass: PassType = {
			id: editingPass?.id || Date.now().toString(),
			name: formData.name || "",
			passCategory: formData.passCategory || "punch_card",
			visits: formData.visits || 1,
			price: formData.price || 0,
			memberPrice: formData.memberPrice,
			active: formData.active ?? true,
			expiryDays: formData.expiryDays || null,
			expiryUnit: formData.expiryUnit || null,
			requiresWaiver: formData.requiresWaiver ?? false,
			requiresSponsor: formData.requiresSponsor ?? false,
			maxPerMember: formData.maxPerMember || 0,
			accessZones: formData.accessZones || [],
			accessAllZones: formData.accessAllZones ?? true,
			validHoursStart: formData.validHoursStart || null,
			validHoursEnd: formData.validHoursEnd || null,
			kioskEnabled: formData.kioskEnabled ?? true,
			qrCodeEnabled: formData.qrCodeEnabled ?? true,
			description: formData.description,
		};

		if (editingPass) {
			setPasses(
				passes.map((p) => (p.id === editingPass.id ? newPass : p))
			);
		} else {
			setPasses([...passes, newPass]);
		}

		setIsDialogOpen(false);
		setEditingPass(null);
	};

	const handleDelete = (id: string) => {
		setPasses(passes.filter((p) => p.id !== id));
	};

	const handleToggleActive = (id: string) => {
		setPasses(
			passes.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
		);
	};

	const toggleZone = (zone: string) => {
		const currentZones = formData.accessZones || [];
		if (currentZones.includes(zone)) {
			setFormData({
				...formData,
				accessZones: currentZones.filter((z) => z !== zone),
			});
		} else {
			setFormData({
				...formData,
				accessZones: [...currentZones, zone],
			});
		}
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "punch_card":
				return <Ticket className="h-4 w-4" />;
			case "guest_pass":
				return <UserPlus className="h-4 w-4" />;
			case "day_pass":
				return <Calendar className="h-4 w-4" />;
			default:
				return <Ticket className="h-4 w-4" />;
		}
	};

	const getCategoryLabel = (category: string) => {
		switch (category) {
			case "punch_card":
				return "Punch Card";
			case "guest_pass":
				return "Guest Pass";
			case "day_pass":
				return "Day Pass";
			default:
				return category;
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Passes
					</h2>
					<p className="text-muted-foreground">
						Manage punch cards, guest passes, and day passes
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => handleOpenDialog()}>
							<Plus className="w-4 h-4 mr-2" />
							Add Pass Type
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingPass
									? "Edit Pass Type"
									: "Create New Pass Type"}
							</DialogTitle>
						</DialogHeader>
						<Tabs defaultValue="basic" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="basic">
									Basic Info
								</TabsTrigger>
								<TabsTrigger value="access">
									Access & Rules
								</TabsTrigger>
								<TabsTrigger value="settings">
									Settings
								</TabsTrigger>
							</TabsList>

							{/* Basic Info Tab */}
							<TabsContent
								value="basic"
								className="space-y-4 mt-4"
							>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Pass Name</Label>
										<Input
											value={formData.name || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													name: e.target.value,
												})
											}
											placeholder="e.g., 10-Visit Punch Card"
										/>
									</div>
									<div className="space-y-2">
										<Label>Category</Label>
										<Select
											value={formData.passCategory}
											onValueChange={(v) =>
												setFormData({
													...formData,
													passCategory:
														v as PassType["passCategory"],
													visits:
														v === "punch_card"
															? 10
															: 1,
													requiresSponsor:
														v === "guest_pass",
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="punch_card">
													Punch Card (Multi-Visit)
												</SelectItem>
												<SelectItem value="guest_pass">
													Guest Pass
												</SelectItem>
												<SelectItem value="day_pass">
													Day Pass
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								{formData.passCategory === "punch_card" && (
									<div className="space-y-2">
										<Label>Number of Visits</Label>
										<Input
											type="number"
											value={formData.visits || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													visits:
														parseInt(
															e.target.value
														) || 1,
												})
											}
											min={1}
										/>
									</div>
								)}

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Price ($)</Label>
										<Input
											type="number"
											step="0.01"
											value={formData.price || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													price:
														parseFloat(
															e.target.value
														) || 0,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Member Price ($)</Label>
										<Input
											type="number"
											step="0.01"
											value={formData.memberPrice || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													memberPrice:
														parseFloat(
															e.target.value
														) || undefined,
												})
											}
											placeholder="Optional discount"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Expiry Duration</Label>
										<Input
											type="number"
											value={formData.expiryDays || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													expiryDays:
														parseInt(
															e.target.value
														) || null,
												})
											}
											placeholder="Leave empty for no expiry"
										/>
									</div>
									<div className="space-y-2">
										<Label>Expiry Unit</Label>
										<Select
											value={
												formData.expiryUnit || "Days"
											}
											onValueChange={(v) =>
												setFormData({
													...formData,
													expiryUnit:
														v as PassType["expiryUnit"],
												})
											}
										>
											<SelectTrigger>
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

								<div className="space-y-2">
									<Label>Description</Label>
									<Textarea
										value={formData.description || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
										placeholder="Brief description for this pass type..."
									/>
								</div>

								<div className="flex items-center justify-between rounded-lg border p-4">
									<div>
										<Label>Active</Label>
										<p className="text-sm text-muted-foreground">
											Pass is available for purchase
										</p>
									</div>
									<Switch
										checked={formData.active}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												active: checked,
											})
										}
									/>
								</div>
							</TabsContent>

							{/* Access & Rules Tab */}
							<TabsContent
								value="access"
								className="space-y-4 mt-4"
							>
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div>
										<Label>Requires Waiver</Label>
										<p className="text-sm text-muted-foreground">
											User must sign waiver before entry
										</p>
									</div>
									<Switch
										checked={formData.requiresWaiver}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												requiresWaiver: checked,
											})
										}
									/>
								</div>

								{formData.passCategory === "guest_pass" && (
									<>
										<div className="flex items-center justify-between rounded-lg border p-4">
											<div>
												<Label>
													Requires Member Sponsor
												</Label>
												<p className="text-sm text-muted-foreground">
													Guest must be accompanied by
													a member
												</p>
											</div>
											<Switch
												checked={
													formData.requiresSponsor
												}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														requiresSponsor:
															checked,
													})
												}
											/>
										</div>
										<div className="space-y-2">
											<Label>
												Max Guests Per Member Visit
											</Label>
											<Input
												type="number"
												value={
													formData.maxPerMember || ""
												}
												onChange={(e) =>
													setFormData({
														...formData,
														maxPerMember:
															parseInt(
																e.target.value
															) || 0,
													})
												}
												min={0}
												max={10}
											/>
										</div>
									</>
								)}

								<Separator />

								<div className="flex items-center justify-between rounded-lg border p-4">
									<div>
										<Label>Access All Zones</Label>
										<p className="text-sm text-muted-foreground">
											Full facility access
										</p>
									</div>
									<Switch
										checked={formData.accessAllZones}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												accessAllZones: checked,
											})
										}
									/>
								</div>

								{!formData.accessAllZones && (
									<div className="space-y-2 p-4 bg-muted/50 rounded-lg">
										<Label>Allowed Zones</Label>
										<div className="flex flex-wrap gap-2 mt-2">
											{AVAILABLE_ZONES.map((zone) => (
												<div
													key={zone}
													className="flex items-center space-x-2"
												>
													<Checkbox
														id={zone}
														checked={formData.accessZones?.includes(
															zone
														)}
														onCheckedChange={() =>
															toggleZone(zone)
														}
													/>
													<label
														htmlFor={zone}
														className="text-sm cursor-pointer"
													>
														{zone}
													</label>
												</div>
											))}
										</div>
									</div>
								)}

								<Separator />

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Valid Hours Start</Label>
										<Input
											type="time"
											value={
												formData.validHoursStart || ""
											}
											onChange={(e) =>
												setFormData({
													...formData,
													validHoursStart:
														e.target.value || null,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Valid Hours End</Label>
										<Input
											type="time"
											value={formData.validHoursEnd || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													validHoursEnd:
														e.target.value || null,
												})
											}
										/>
									</div>
								</div>
							</TabsContent>

							{/* Settings Tab */}
							<TabsContent
								value="settings"
								className="space-y-4 mt-4"
							>
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div>
										<Label>Kiosk Check-In</Label>
										<p className="text-sm text-muted-foreground">
											Allow self-service kiosk check-in
										</p>
									</div>
									<Switch
										checked={formData.kioskEnabled}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												kioskEnabled: checked,
											})
										}
									/>
								</div>

								<div className="flex items-center justify-between rounded-lg border p-4">
									<div>
										<Label>QR Code Entry</Label>
										<p className="text-sm text-muted-foreground">
											Generate QR codes for pass holders
										</p>
									</div>
									<Switch
										checked={formData.qrCodeEnabled}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												qrCodeEnabled: checked,
											})
										}
									/>
								</div>
							</TabsContent>
						</Tabs>

						<div className="flex justify-end gap-4 pt-4 border-t">
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
					</DialogContent>
				</Dialog>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Passes
						</CardTitle>
						<Ticket className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active
						</CardTitle>
						<Badge variant="secondary">{stats.active}</Badge>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{stats.active}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Punch Cards
						</CardTitle>
						<Ticket className="h-4 w-4 text-blue-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.punchCards}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Guest Passes
						</CardTitle>
						<UserPlus className="h-4 w-4 text-purple-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.guestPasses}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<div className="flex gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search passes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Select
					value={filterCategory}
					onValueChange={setFilterCategory}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="punch_card">Punch Cards</SelectItem>
						<SelectItem value="guest_pass">Guest Passes</SelectItem>
						<SelectItem value="day_pass">Day Passes</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Passes Table */}
			<div className="border rounded-lg overflow-hidden bg-card">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead className="w-[250px]">
								Pass Type
							</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Visits</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Expiry</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[120px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredPasses.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="h-32 text-center"
								>
									<div className="text-muted-foreground">
										<Ticket className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No passes found.</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							filteredPasses.map((pass) => (
								<TableRow
									key={pass.id}
									className={!pass.active ? "opacity-60" : ""}
								>
									<TableCell className="font-medium">
										<div>
											<div className="flex items-center gap-2">
												{getCategoryIcon(
													pass.passCategory
												)}
												{pass.name}
											</div>
											{pass.description && (
												<p className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
													{pass.description}
												</p>
											)}
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{getCategoryLabel(
												pass.passCategory
											)}
										</Badge>
									</TableCell>
									<TableCell>
										{pass.visits > 1
											? `${pass.visits} visits`
											: "1 visit"}
									</TableCell>
									<TableCell>
										<div>
											<span className="font-medium">
												${pass.price.toFixed(2)}
											</span>
											{pass.memberPrice && (
												<span className="text-xs text-muted-foreground ml-2">
													($
													{pass.memberPrice.toFixed(
														2
													)}{" "}
													member)
												</span>
											)}
										</div>
									</TableCell>
									<TableCell>
										{pass.expiryDays
											? `${pass.expiryDays} ${pass.expiryUnit}`
											: "No expiry"}
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
													handleToggleActive(pass.id)
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
		</div>
	);
};

export default PassesManager;
