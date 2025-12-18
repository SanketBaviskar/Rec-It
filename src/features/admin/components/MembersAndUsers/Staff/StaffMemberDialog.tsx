import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface StaffMemberDialogProps {
	staffMember?: any; // To be typed properly later
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
}

export default function StaffMemberDialog({
	staffMember,
	isOpen,
	onClose,
	onSave,
}: StaffMemberDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>
						{staffMember ? "Edit Staff Member" : "Add New Staff"}
					</DialogTitle>
					<DialogDescription>
						{staffMember
							? "Update specific details for this employee."
							: "Create a new staff profile with permissions and payroll info."}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 py-4">
					{/* Identity Section */}
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								defaultValue={staffMember?.firstName}
								placeholder="Jane"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								defaultValue={staffMember?.lastName}
								placeholder="Doe"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								defaultValue={staffMember?.email}
								placeholder="jane@rec-it.edu"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input
								id="phone"
								defaultValue={staffMember?.phoneNumber}
								placeholder="(555) 123-4567"
							/>
						</div>
					</div>

					{/* Role & Payroll Section */}
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label>Role Assignment</Label>
							<Select defaultValue="front_desk">
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="gm">
										General Manager
									</SelectItem>
									<SelectItem value="front_desk">
										Front Desk Lead
									</SelectItem>
									<SelectItem value="aquatics">
										Aquatics Director
									</SelectItem>
									<SelectItem value="trainer">
										Personal Trainer
									</SelectItem>
									<SelectItem value="lifeguard">
										Lifeguard
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="payRate">Hourly Pay Rate ($)</Label>
							<Input
								id="payRate"
								type="number"
								defaultValue={staffMember?.payRate || 15.0}
								placeholder="0.00"
							/>
						</div>
					</div>

					{/* Certifications Stub */}
					<div className="grid gap-2">
						<Label>Certifications</Label>
						<Textarea placeholder="List certifications (CPR, AED, WSI) - Future: This will be a multi-select with expiry dates." />
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" onClick={() => onSave({})}>
						Save Profile
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
