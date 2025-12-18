import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
	Plus,
	Shield,
	Users,
	Settings2,
	CheckCircle2,
	Search,
} from "lucide-react";
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
	{
		id: "facilities",
		name: "Facilities Manager",
		description: "Equipment and facility oversight.",
		usersCount: 3,
	},
];

export default function RoleManager() {
	const [roles, setRoles] = useState(INITIAL_ROLES);
	const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);

	return (
		<div className="flex h-[calc(100vh-100px)] gap-6">
			{/* Sidebar list of roles */}
			<div className="w-80 flex flex-col gap-4 border-r pr-6">
				<div className="flex items-center justify-between pb-2 border-b">
					<div className="flex items-center gap-2">
						<Shield className="h-5 w-5 text-primary" />
						<h3 className="font-semibold text-lg">Staff Roles</h3>
					</div>
					<Button size="sm" variant="outline" className="h-8 w-8 p-0">
						<Plus className="h-4 w-4" />
					</Button>
				</div>

				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search roles..." className="pl-9" />
				</div>

				<ScrollArea className="flex-1 -mr-4 pr-4">
					<div className="space-y-3">
						{roles.map((role) => (
							<button
								key={role.id}
								onClick={() => setSelectedRole(role)}
								className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md ${
									selectedRole.id === role.id
										? "bg-primary/5 border-primary shadow-sm"
										: "bg-card hover:bg-muted/50 border-transparent hover:border-border"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span
										className={`font-medium ${
											selectedRole.id === role.id
												? "text-primary"
												: ""
										}`}
									>
										{role.name}
									</span>
									{selectedRole.id === role.id && (
										<CheckCircle2 className="h-4 w-4 text-primary" />
									)}
								</div>
								<p className="text-xs text-muted-foreground line-clamp-2 mb-2">
									{role.description}
								</p>
								<div className="flex items-center gap-2">
									<Badge
										variant="secondary"
										className="text-[10px] h-5 px-1.5 font-normal"
									>
										<Users className="h-3 w-3 mr-1" />
										{role.usersCount} Users
									</Badge>
								</div>
							</button>
						))}
					</div>
				</ScrollArea>
			</div>

			{/* Main Content: Role Editor */}
			<div className="flex-1 h-full overflow-hidden flex flex-col">
				<div className="flex-1 overflow-y-auto pr-2">
					<div className="space-y-8 pb-10">
						<div className="flex items-center justify-between bg-card p-6 rounded-xl border shadow-sm">
							<div>
								<div className="flex items-center gap-3 mb-1">
									<h2 className="text-2xl font-bold tracking-tight">
										{selectedRole.name}
									</h2>
									<Badge
										variant="outline"
										className="text-xs uppercase tracking-wider"
									>
										active
									</Badge>
								</div>
								<p className="text-muted-foreground">
									Configure access levels and permissions for
									this role.
								</p>
							</div>
							<div className="flex gap-3">
								<Button variant="outline">Duplicate</Button>
								<Button>Save Changes</Button>
							</div>
						</div>

						<div className="grid gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base">
										<Settings2 className="h-4 w-4 text-muted-foreground" />
										Role Configuration
									</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-medium">
											Role Name
										</label>
										<Input
											value={selectedRole.name}
											readOnly
										/>
									</div>
									<div className="space-y-2">
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

							<div>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-medium flex items-center gap-2">
										<Shield className="h-5 w-5 text-primary" />
										Access Permissions
									</h3>
									<Button
										variant="ghost"
										size="sm"
										className="text-xs h-8"
									>
										Expand All
									</Button>
								</div>
								<PermissionMatrix />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
