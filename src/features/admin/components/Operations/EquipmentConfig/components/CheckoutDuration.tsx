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
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function CheckoutDuration() {
	const {
		config,
		updateConfig,
		checkoutPolicies,
		addCheckoutPolicy,
		removeCheckoutPolicy,
		updateCheckoutPolicy,
		setDefaultPolicy,
	} = useEquipmentPolicy();

	return (
		<div className="space-y-6">
			{/* Global Checkout Settings */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Global Checkout Settings</CardTitle>
							<CardDescription>
								Configure default checkout limits for all
								equipment.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="default-checkout">
								Default Checkout Duration (hours)
							</Label>
							<Input
								id="default-checkout"
								type="number"
								value={config.defaultCheckoutHours}
								onChange={(e) =>
									updateConfig({
										defaultCheckoutHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								Standard return time for equipment loans.
							</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor="max-checkout">
								Maximum Checkout Duration (hours)
							</Label>
							<Input
								id="max-checkout"
								type="number"
								value={config.maxCheckoutHours}
								onChange={(e) =>
									updateConfig({
										maxCheckoutHours:
											parseInt(e.target.value) || 0,
									})
								}
							/>
							<p className="text-xs text-muted-foreground">
								Absolute maximum, even with extensions.
							</p>
						</div>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Allow Extensions</Label>
							<p className="text-xs text-muted-foreground">
								Members can request additional time.
							</p>
						</div>
						<Switch
							checked={config.allowExtensions}
							onCheckedChange={(c) =>
								updateConfig({ allowExtensions: c })
							}
						/>
					</div>

					{config.allowExtensions && (
						<div className="grid grid-cols-2 gap-4 pt-2">
							<div className="space-y-2">
								<Label htmlFor="max-extensions">
									Max Extensions Allowed
								</Label>
								<Input
									id="max-extensions"
									type="number"
									value={config.maxExtensions}
									onChange={(e) =>
										updateConfig({
											maxExtensions:
												parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="extension-hours">
									Hours Per Extension
								</Label>
								<Input
									id="extension-hours"
									type="number"
									value={config.extensionHours}
									onChange={(e) =>
										updateConfig({
											extensionHours:
												parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Checkout Policies */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Checkout Policies</CardTitle>
								<CardDescription>
									Define named checkout duration policies for
									equipment tracking.
								</CardDescription>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={addCheckoutPolicy}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Policy
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Policy Name</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className="w-20 text-center">
									Default
								</TableHead>
								<TableHead className="w-12"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{checkoutPolicies.map((policy) => (
								<TableRow key={policy.id}>
									<TableCell>
										<Input
											value={policy.name}
											onChange={(e) =>
												updateCheckoutPolicy(
													policy.id,
													"name",
													e.target.value
												)
											}
											className="h-8 w-[140px]"
											placeholder="Policy name"
										/>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Input
												type="number"
												value={policy.durationValue}
												onChange={(e) =>
													updateCheckoutPolicy(
														policy.id,
														"durationValue",
														parseInt(
															e.target.value
														) || 0
													)
												}
												className="h-8 w-16"
											/>
											<Select
												value={policy.durationUnit}
												onValueChange={(val) =>
													updateCheckoutPolicy(
														policy.id,
														"durationUnit",
														val
													)
												}
											>
												<SelectTrigger className="h-8 w-24">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="hours">
														Hours
													</SelectItem>
													<SelectItem value="days">
														Days
													</SelectItem>
													<SelectItem value="weeks">
														Weeks
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</TableCell>
									<TableCell>
										<Input
											value={policy.description}
											onChange={(e) =>
												updateCheckoutPolicy(
													policy.id,
													"description",
													e.target.value
												)
											}
											className="h-8 w-[180px]"
											placeholder="Optional description"
										/>
									</TableCell>
									<TableCell className="text-center">
										<input
											type="radio"
											name="defaultPolicy"
											checked={policy.isDefault}
											onChange={() =>
												setDefaultPolicy(policy.id)
											}
											className="h-4 w-4 accent-primary cursor-pointer"
										/>
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-destructive hover:bg-destructive/10"
											onClick={() =>
												removeCheckoutPolicy(policy.id)
											}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
							{checkoutPolicies.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center text-muted-foreground h-24"
									>
										No checkout policies defined. Click "Add
										Policy" to create one.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
