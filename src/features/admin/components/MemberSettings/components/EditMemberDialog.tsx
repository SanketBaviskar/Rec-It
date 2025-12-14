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
import { useState, useEffect } from "react";

// Mock Member Interface
interface Member {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	membershipType: string;
	status: "Active" | "Inactive" | "Suspended" | "Expired";
}

interface EditMemberDialogProps {
	member: Member | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedMember: Member) => void;
}

export default function EditMemberDialog({
	member,
	isOpen,
	onClose,
	onSave,
}: EditMemberDialogProps) {
	const [formData, setFormData] = useState<Member | null>(null);

	useEffect(() => {
		if (member) {
			setFormData({ ...member });
		}
	}, [member]);

	const handleChange = (field: keyof Member, value: string) => {
		if (formData) {
			setFormData({ ...formData, [field]: value });
		}
	};

	const handleSave = () => {
		if (formData) {
			onSave(formData);
			onClose();
		}
	};

	if (!formData) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Member Details</DialogTitle>
					<DialogDescription>
						Make changes to the member's profile here. Click save
						when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="firstName" className="text-right">
							First Name
						</Label>
						<Input
							id="firstName"
							value={formData.firstName}
							onChange={(e) =>
								handleChange("firstName", e.target.value)
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="lastName" className="text-right">
							Last Name
						</Label>
						<Input
							id="lastName"
							value={formData.lastName}
							onChange={(e) =>
								handleChange("lastName", e.target.value)
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							value={formData.email}
							onChange={(e) =>
								handleChange("email", e.target.value)
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="phone" className="text-right">
							Phone
						</Label>
						<Input
							id="phone"
							value={formData.phoneNumber}
							onChange={(e) =>
								handleChange("phoneNumber", e.target.value)
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="membership" className="text-right">
							Membership
						</Label>
						<Select
							value={formData.membershipType}
							onValueChange={(val) =>
								handleChange("membershipType", val)
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select plan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Gold Membership">
									Gold Membership
								</SelectItem>
								<SelectItem value="Student Monthly">
									Student Monthly
								</SelectItem>
								<SelectItem value="Day Pass">
									Day Pass
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="status" className="text-right">
							Status
						</Label>
						<Select
							value={formData.status}
							onValueChange={(val) => handleChange("status", val)}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Active">Active</SelectItem>
								<SelectItem value="Inactive">
									Inactive
								</SelectItem>
								<SelectItem value="Suspended">
									Suspended
								</SelectItem>
								<SelectItem value="Expired">Expired</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
