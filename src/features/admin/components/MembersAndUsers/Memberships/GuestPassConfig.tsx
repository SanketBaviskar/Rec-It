import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Save,
	UserPlus,
	QrCode,
	RotateCcw,
	DollarSign,
	Shield,
	Clock,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/hooks/use-toast";

const DEFAULT_CONFIG = {
	dayPassPrice: 15.0,
	weekendPassPrice: 25.0,
	requireWaiver: true,
	requirePhoto: true,
	maxGuestsPerMember: 2,
	kioskModeEnabled: true,
	accessZones: ["Gym", "Cardio", "Courts"] as string[],
	validHoursStart: "06:00",
	validHoursEnd: "22:00",
	minGuestAge: 16,
};

const AVAILABLE_ZONES = ["Gym", "Cardio", "Courts", "Pool", "Track", "Studios"];

const GuestPassConfig = () => {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

	const handleSave = async () => {
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log("Saving guest pass config:", config);
		setIsSaving(false);
		toast({
			title: "Settings Saved",
			description: "Guest pass configuration has been updated.",
		});
	};

	const handleReset = () => {
		setConfig(DEFAULT_CONFIG);
		toast({
			title: "Settings Reset",
			description: "Guest pass configuration restored to defaults.",
		});
	};

	const toggleZone = (zone: string) => {
		if (config.accessZones.includes(zone)) {
			setConfig({
				...config,
				accessZones: config.accessZones.filter((z) => z !== zone),
			});
		} else {
			setConfig({
				...config,
				accessZones: [...config.accessZones, zone],
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Guest Passes
					</h2>
					<p className="text-muted-foreground">
						Configure self-service guest pass rules and kiosk
						settings.
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

			{/* Summary Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-primary/10">
							<DollarSign className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Day Pass
							</p>
							<p className="text-2xl font-bold">
								${config.dayPassPrice.toFixed(2)}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-green-500/10">
							<Shield className="h-5 w-5 text-green-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Access Zones
							</p>
							<p className="text-2xl font-bold">
								{config.accessZones.length}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="p-2 rounded-full bg-blue-500/10">
							<Clock className="h-5 w-5 text-blue-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Valid Hours
							</p>
							<p className="text-lg font-bold">
								{config.validHoursStart} -{" "}
								{config.validHoursEnd}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Configuration */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Pricing Section */}
				<div className="space-y-6 p-6 border rounded-lg bg-card">
					<div className="flex items-center gap-2">
						<DollarSign className="w-5 h-5 text-primary" />
						<h3 className="text-lg font-semibold">Pricing</h3>
					</div>
					<div className="grid gap-4">
						<div className="space-y-2">
							<Label htmlFor="day-price">
								Day Pass Price ($)
							</Label>
							<Input
								id="day-price"
								type="number"
								step="0.01"
								value={config.dayPassPrice}
								onChange={(e) =>
									setConfig({
										...config,
										dayPassPrice:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="weekend-price">
								Weekend Pass Price ($)
							</Label>
							<Input
								id="weekend-price"
								type="number"
								step="0.01"
								value={config.weekendPassPrice}
								onChange={(e) =>
									setConfig({
										...config,
										weekendPassPrice:
											parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
				</div>

				{/* Rules Section */}
				<div className="space-y-6 p-6 border rounded-lg bg-card">
					<div className="flex items-center gap-2">
						<Shield className="w-5 h-5 text-primary" />
						<h3 className="text-lg font-semibold">
							Rules & Security
						</h3>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="waiver" className="flex flex-col">
								<span>Require Digital Waiver</span>
								<span className="font-normal text-xs text-muted-foreground">
									Guests must sign before payment
								</span>
							</Label>
							<Switch
								id="waiver"
								checked={config.requireWaiver}
								onCheckedChange={(c) =>
									setConfig({ ...config, requireWaiver: c })
								}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<Label htmlFor="photo" className="flex flex-col">
								<span>Capture Guest Photo</span>
								<span className="font-normal text-xs text-muted-foreground">
									Kiosk takes photo for ID
								</span>
							</Label>
							<Switch
								id="photo"
								checked={config.requirePhoto}
								onCheckedChange={(c) =>
									setConfig({ ...config, requirePhoto: c })
								}
							/>
						</div>
						<Separator />
						<div className="space-y-2">
							<Label>Max Guests per Member</Label>
							<Select
								value={config.maxGuestsPerMember.toString()}
								onValueChange={(v) =>
									setConfig({
										...config,
										maxGuestsPerMember: parseInt(v),
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">1 Guest</SelectItem>
									<SelectItem value="2">2 Guests</SelectItem>
									<SelectItem value="3">3 Guests</SelectItem>
									<SelectItem value="5">5 Guests</SelectItem>
									<SelectItem value="99">
										Unlimited
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="min-age">Minimum Guest Age</Label>
							<Input
								id="min-age"
								type="number"
								value={config.minGuestAge}
								onChange={(e) =>
									setConfig({
										...config,
										minGuestAge:
											parseInt(e.target.value) || 0,
									})
								}
								className="w-24"
							/>
						</div>
					</div>
				</div>

				{/* Access Zones Section */}
				<div className="space-y-6 p-6 border rounded-lg bg-card">
					<div className="flex items-center gap-2">
						<UserPlus className="w-5 h-5 text-primary" />
						<h3 className="text-lg font-semibold">Access Zones</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Select which areas guests can access with a day pass.
					</p>
					<div className="grid grid-cols-2 gap-3">
						{AVAILABLE_ZONES.map((zone) => (
							<div
								key={zone}
								className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
								onClick={() => toggleZone(zone)}
							>
								<Checkbox
									id={`zone-${zone}`}
									checked={config.accessZones.includes(zone)}
									onCheckedChange={() => toggleZone(zone)}
								/>
								<Label
									htmlFor={`zone-${zone}`}
									className="cursor-pointer"
								>
									{zone}
								</Label>
							</div>
						))}
					</div>
				</div>

				{/* Hours & Kiosk Section */}
				<div className="space-y-6 p-6 border rounded-lg bg-card">
					<div className="flex items-center gap-2">
						<Clock className="w-5 h-5 text-primary" />
						<h3 className="text-lg font-semibold">Hours & Kiosk</h3>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="hours-start">Valid From</Label>
							<Input
								id="hours-start"
								type="time"
								value={config.validHoursStart}
								onChange={(e) =>
									setConfig({
										...config,
										validHoursStart: e.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="hours-end">Valid Until</Label>
							<Input
								id="hours-end"
								type="time"
								value={config.validHoursEnd}
								onChange={(e) =>
									setConfig({
										...config,
										validHoursEnd: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<Separator />
					<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-full text-primary">
								<QrCode className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">Kiosk Mode</p>
								<p className="text-sm text-muted-foreground">
									Enable self-service tablet interface
								</p>
							</div>
						</div>
						<Switch
							checked={config.kioskModeEnabled}
							onCheckedChange={(c) =>
								setConfig({ ...config, kioskModeEnabled: c })
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GuestPassConfig;
