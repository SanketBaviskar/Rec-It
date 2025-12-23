import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const DAYS_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const formSchema = z.object({
	// Basic Info
	name: z.string().min(2, "Name must be at least 2 characters"),
	description: z.string().min(5, "Details must be at least 5 characters"),
	duration: z.enum(["Monthly", "Semester", "Annual", "One-Time"]),
	price: z.number().min(0, "Price must be positive"),
	status: z.enum(["Active", "Archived"]),
	accessLevel: z.enum(["Full", "Limited", "Student-Only"]),
	isFamilyPlan: z.boolean(),
	maxYouthAge: z.number().min(0).max(25).nullable(),

	// Billing & Renewal
	billingType: z.enum(["recurring", "fixed_term", "one_time"]),
	isAutoRenew: z.boolean(),
	renewalReminderDays: z.number().min(0).max(90),
	gracePeriodDays: z.number().min(0).max(30),
	prorationEnabled: z.boolean(),

	// Rules & Security
	requiresWaiver: z.boolean(),
	allowGuestPasses: z.boolean(),
	maxGuestsPerVisit: z.number().min(0).max(10),
	requiresPhotoId: z.boolean(),
	allowsPlusOne: z.boolean(),

	// Access Hours
	hasRestrictedHours: z.boolean(),
	allowedDays: z.array(z.string()),
	accessStartTime: z.string().nullable(),
	accessEndTime: z.string().nullable(),

	// Kiosk Settings
	kioskCheckInEnabled: z.boolean(),
	kioskSelfRegistration: z.boolean(),
	kioskDisplayMessage: z.string().nullable(),

	// Access Zones
	accessAllZones: z.boolean(),
});

export type MembershipFormValues = z.infer<typeof formSchema>;

interface AddMembershipTypeFormProps {
	initialData?: Partial<MembershipFormValues>;
	onSubmit: (values: MembershipFormValues) => void;
	onCancel: () => void;
}

export default function AddMembershipTypeForm({
	initialData,
	onSubmit,
	onCancel,
}: AddMembershipTypeFormProps) {
	const form = useForm<MembershipFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			duration: "Monthly",
			price: 0,
			status: "Active",
			accessLevel: "Full",
			isFamilyPlan: false,
			maxYouthAge: 18,
			// Billing
			billingType: "recurring",
			isAutoRenew: true,
			renewalReminderDays: 7,
			gracePeriodDays: 0,
			prorationEnabled: true,
			// Rules
			requiresWaiver: true,
			allowGuestPasses: true,
			maxGuestsPerVisit: 2,
			requiresPhotoId: false,
			allowsPlusOne: false,
			// Hours
			hasRestrictedHours: false,
			allowedDays: [],
			accessStartTime: null,
			accessEndTime: null,
			// Kiosk
			kioskCheckInEnabled: true,
			kioskSelfRegistration: false,
			kioskDisplayMessage: null,
			// Zones
			accessAllZones: true,
			...initialData,
		},
	});

	const isFamilyPlan = form.watch("isFamilyPlan");
	const hasRestrictedHours = form.watch("hasRestrictedHours");
	const billingType = form.watch("billingType");
	const accessAllZones = form.watch("accessAllZones");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Basic Info Section */}
				<div className="space-y-4">
					<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
						Basic Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Name Field */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<Label>Plan Name</Label>
									<FormControl>
										<Input
											{...field}
											placeholder="e.g., Gold Plan"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Status Field */}
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<Label>Status</Label>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Active">
												Active
											</SelectItem>
											<SelectItem value="Archived">
												Archived
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Description Field */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<Label>Description</Label>
								<FormControl>
									<Textarea
										{...field}
										className="min-h-[80px]"
										placeholder="Describe the plan benefits..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Separator />

				{/* Pricing & Billing Section */}
				<div className="space-y-4">
					<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
						Pricing & Billing
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Price Field */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<Label>Price ($)</Label>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											{...field}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
											placeholder="29.99"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Duration Field */}
						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<Label>Duration</Label>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select duration" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Monthly">
												Monthly
											</SelectItem>
											<SelectItem value="Semester">
												Semester
											</SelectItem>
											<SelectItem value="Annual">
												Annual
											</SelectItem>
											<SelectItem value="One-Time">
												One-Time
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Billing Type Field */}
						<FormField
							control={form.control}
							name="billingType"
							render={({ field }) => (
								<FormItem>
									<Label>Billing Type</Label>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="recurring">
												Recurring (Auto-renew)
											</SelectItem>
											<SelectItem value="fixed_term">
												Fixed Term (End Date)
											</SelectItem>
											<SelectItem value="one_time">
												One-Time Purchase
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										{billingType === "fixed_term"
											? "Ideal for student semester passes"
											: billingType === "recurring"
											? "Automatically renews each period"
											: "Single purchase, no renewal"}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Auto-Renew Options (only for recurring) */}
					{billingType === "recurring" && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
							<FormField
								control={form.control}
								name="isAutoRenew"
								render={({ field }) => (
									<FormItem className="flex items-center justify-between">
										<div>
											<Label>Auto-Renew</Label>
											<FormDescription>
												Automatically renew membership
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="renewalReminderDays"
								render={({ field }) => (
									<FormItem>
										<Label>Reminder (days before)</Label>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) =>
													field.onChange(
														Number(e.target.value)
													)
												}
												min={0}
												max={90}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="gracePeriodDays"
								render={({ field }) => (
									<FormItem>
										<Label>Grace Period (days)</Label>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) =>
													field.onChange(
														Number(e.target.value)
													)
												}
												min={0}
												max={30}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					)}

					<FormField
						control={form.control}
						name="prorationEnabled"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between rounded-lg border p-4">
								<div>
									<Label>Allow Proration</Label>
									<FormDescription>
										Calculate prorated price for mid-period
										signups
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<Separator />

				{/* Access Section */}
				<div className="space-y-4">
					<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
						Access & Eligibility
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Access Level Field */}
						<FormField
							control={form.control}
							name="accessLevel"
							render={({ field }) => (
								<FormItem>
									<Label>Access Level</Label>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select access level" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Full">
												Full Access
											</SelectItem>
											<SelectItem value="Limited">
												Limited Access
											</SelectItem>
											<SelectItem value="Student-Only">
												Student-Only
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Access All Zones */}
						<FormField
							control={form.control}
							name="accessAllZones"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<div>
										<Label>Access All Zones</Label>
										<FormDescription>
											Access to all facilities
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					{!accessAllZones && (
						<div className="p-4 bg-muted/50 rounded-lg">
							<p className="text-sm text-muted-foreground">
								Zone selection will be available in facility
								settings.
							</p>
						</div>
					)}

					{/* Family Plan Toggle */}
					<div className="flex items-center justify-between rounded-lg border p-4">
						<div className="space-y-0.5">
							<Label htmlFor="family-plan">Family Plan</Label>
							<p className="text-sm text-muted-foreground">
								Allow linking dependents to this membership.
							</p>
						</div>
						<FormField
							control={form.control}
							name="isFamilyPlan"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Switch
											id="family-plan"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					{/* Max Youth Age (only shown if Family Plan is enabled) */}
					{isFamilyPlan && (
						<FormField
							control={form.control}
							name="maxYouthAge"
							render={({ field }) => (
								<FormItem>
									<Label>Max Age for Youth Dependents</Label>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value === ""
														? null
														: Number(e.target.value)
												)
											}
											placeholder="18"
											className="w-32"
										/>
									</FormControl>
									<FormDescription>
										Dependents exceeding this age will be
										flagged for upgrade.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				{/* Advanced Settings Accordion */}
				<Accordion type="single" collapsible className="w-full">
					{/* Rules & Security */}
					<AccordionItem value="rules">
						<AccordionTrigger>Rules & Security</AccordionTrigger>
						<AccordionContent className="space-y-4 pt-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="requiresWaiver"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Requires Waiver</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="requiresPhotoId"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Requires Photo ID</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="allowGuestPasses"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Allow Guest Passes</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="maxGuestsPerVisit"
									render={({ field }) => (
										<FormItem>
											<Label>Max Guests Per Visit</Label>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) =>
														field.onChange(
															Number(
																e.target.value
															)
														)
													}
													min={0}
													max={10}
													className="w-24"
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="allowsPlusOne"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Allows Plus-One Entry</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* Access Hours */}
					<AccordionItem value="hours">
						<AccordionTrigger>Access Hours</AccordionTrigger>
						<AccordionContent className="space-y-4 pt-4">
							<FormField
								control={form.control}
								name="hasRestrictedHours"
								render={({ field }) => (
									<FormItem className="flex items-center justify-between rounded-lg border p-4">
										<div>
											<Label>Restrict Access Hours</Label>
											<FormDescription>
												Limit when this membership can
												access facilities
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{hasRestrictedHours && (
								<>
									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="accessStartTime"
											render={({ field }) => (
												<FormItem>
													<Label>Start Time</Label>
													<FormControl>
														<Input
															type="time"
															value={
																field.value ||
																""
															}
															onChange={(e) =>
																field.onChange(
																	e.target
																		.value ||
																		null
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="accessEndTime"
											render={({ field }) => (
												<FormItem>
													<Label>End Time</Label>
													<FormControl>
														<Input
															type="time"
															value={
																field.value ||
																""
															}
															onChange={(e) =>
																field.onChange(
																	e.target
																		.value ||
																		null
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="allowedDays"
										render={({ field }) => (
											<FormItem>
												<Label>Allowed Days</Label>
												<FormDescription>
													Leave empty for all days
												</FormDescription>
												<div className="flex flex-wrap gap-2 pt-2">
													{DAYS_OF_WEEK.map((day) => (
														<div
															key={day}
															className="flex items-center space-x-2"
														>
															<Checkbox
																id={day}
																checked={field.value?.includes(
																	day
																)}
																onCheckedChange={(
																	checked
																) => {
																	const newValue =
																		checked
																			? [
																					...(field.value ||
																						[]),
																					day,
																			  ]
																			: (
																					field.value ||
																					[]
																			  ).filter(
																					(
																						d
																					) =>
																						d !==
																						day
																			  );
																	field.onChange(
																		newValue
																	);
																}}
															/>
															<label
																htmlFor={day}
																className="text-sm cursor-pointer"
															>
																{day.slice(
																	0,
																	3
																)}
															</label>
														</div>
													))}
												</div>
											</FormItem>
										)}
									/>
								</>
							)}
						</AccordionContent>
					</AccordionItem>

					{/* Kiosk Settings */}
					<AccordionItem value="kiosk">
						<AccordionTrigger>Kiosk Settings</AccordionTrigger>
						<AccordionContent className="space-y-4 pt-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="kioskCheckInEnabled"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Kiosk Check-In</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="kioskSelfRegistration"
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3">
											<Label>Self-Registration</Label>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="kioskDisplayMessage"
								render={({ field }) => (
									<FormItem>
										<Label>Kiosk Welcome Message</Label>
										<FormControl>
											<Input
												{...field}
												value={field.value || ""}
												onChange={(e) =>
													field.onChange(
														e.target.value || null
													)
												}
												placeholder="Custom message for kiosk display..."
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Form Actions */}
				<div className="flex justify-end gap-4 pt-4">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">
						{initialData ? "Save Changes" : "Create Plan"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
