import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, Shield, Users } from "lucide-react";
import PermissionMatrix from "./PermissionMatrix";
import { Separator } from "@/components/ui/separator";

const INITIAL_ROLES = [
	{
		id: "gm",
		name: "General Manager",
		description: "Full system access.",
		usersCount: 2,
	},
	{
		id: "front_desk",
		name: "Front Desk Staff",
		description: "Check-ins, POS, and basic member mgmt.",
		usersCount: 15,
	},
	{
		id: "trainer",
		name: "Personal Trainer",
		description: "Schedule management and client tracking.",
		usersCount: 8,
	},
];

export default function RoleManager() {
	const [roles, setRoles] = useState(INITIAL_ROLES);
	const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);

	return (
		<div className="flex h-[calc(100vh-100px)]">
			{/* Sidebar list of roles */}
			<div className="w-1/4 border-r pr-6 space-y-4">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-lg">Roles</h3>
					<Button size="sm" variant="ghost">
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-y-2">
					{roles.map((role) => (
						<div
							key={role.id}
							onClick={() => setSelectedRole(role)}
							className={`p-3 rounded-md cursor-pointer border transition-colors ${
								selectedRole.id === role.id
									? "bg-primary/5 border-primary"
									: "hover:bg-muted"
							}`}
						>
							<div className="font-medium flex items-center justify-between">
								{role.name}
								<span className="text-xs text-muted-foreground flex items-center gap-1">
									<Users className="h-3 w-3" />{" "}
									{role.usersCount}
								</span>
							</div>
							<div className="text-xs text-muted-foreground mt-1 line-clamp-1">
								{role.description}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Main Content: Role Editor */}
			<div className="flex-1 pl-6 overflow-y-auto">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold">
								{selectedRole.name}
							</h2>
							<p className="text-muted-foreground">
								Configure access levels and permissions for this
								role.
							</p>
						</div>
						<div className="flex gap-2">
							<Button variant="outline">Duplicate Role</Button>
							<Button>Save Changes</Button>
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">
								Role Details
							</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<label className="text-sm font-medium">
									Role Name
								</label>
								<Input value={selectedRole.name} readOnly />
							</div>
							<div className="grid gap-2">
								<label className="text-sm font-medium">
									Description
								</label>
								<Input
									value={selectedRole.description}
									readOnly
								/>
							</div>
						</CardContent>
					</Card>

					<Separator />

					<div>
						<h3 className="text-lg font-medium mb-4 flex items-center gap-2">
							<Shield className="h-5 w-5" /> Access Permissions
						</h3>
						<PermissionMatrix />
					</div>
				</div>
			</div>
		</div>
	);
}
