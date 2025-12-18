import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	description: z.string().min(5, "Details must be at least 5 characters"),
	duration: z.enum(["Monthly", "Semester", "Annual", "One-Time"]),
	price: z.number().min(0, "Price must be positive"),
	status: z.enum(["Active", "Archived"]),
	accessLevel: z.enum(["Full", "Limited", "Student-Only"]),
	isFamilyPlan: z.boolean(),
	maxYouthAge: z.number().min(0).max(25).nullable(),
});

export type MembershipFormValues = z.infer<typeof formSchema>;

interface AddMembershipTypeFormProps {
	initialData?: MembershipFormValues;
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
		defaultValues: initialData || {
			name: "",
			description: "",
			duration: "Monthly",
			price: 0,
			status: "Active",
			accessLevel: "Full",
			isFamilyPlan: false,
			maxYouthAge: 18,
		},
	});

	const isFamilyPlan = form.watch("isFamilyPlan");

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

				{/* Pricing Section */}
				<div className="space-y-4">
					<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
						Pricing & Duration
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									<Label>Billing Cycle</Label>
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
					</div>
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
									<FormDescription>
										Determines which facilities this plan
										can access.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
