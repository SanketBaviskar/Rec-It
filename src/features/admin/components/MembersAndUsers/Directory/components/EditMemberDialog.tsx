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
import { User } from "@/services/Api/User/userApi";

interface EditMemberDialogProps {
	member: User | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedMember: User) => void;
}

export default function EditMemberDialog({
	member,
	isOpen,
	onClose,
	onSave,
}: EditMemberDialogProps) {
	const [formData, setFormData] = useState<User | null>(null);

	useEffect(() => {
		if (member) {
			setFormData({ ...member });
		}
	}, [member]);

	const handleChange = (field: keyof User, value: any) => {
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
						<Label htmlFor="phoneNumber" className="text-right">
							Phone
						</Label>
						<Input
							id="phoneNumber"
							value={formData.phoneNumber || ""}
							onChange={(e) =>
								handleChange("phoneNumber", e.target.value)
							}
							className="col-span-3"
						/>
					</div>

					{/* Status Selection */}
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
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">
									Inactive
								</SelectItem>
								<SelectItem value="suspended">
									Suspended
								</SelectItem>
								<SelectItem value="expired">Expired</SelectItem>
								<SelectItem value="banned">Banned</SelectItem>
								<SelectItem value="archived">
									Archived
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Role Selection */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<Select
							value={formData.role.toString()}
							onValueChange={(val) => handleChange("role", val)}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="0">Member</SelectItem>
								<SelectItem value="1">Staff Level 1</SelectItem>
								<SelectItem value="2">Staff Level 2</SelectItem>
								<SelectItem value="3">Admin</SelectItem>
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
