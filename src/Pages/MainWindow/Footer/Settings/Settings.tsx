import {
	Settings,
	User,
	Palette,
	Bell,
	Shield,
	Info,
	Moon,
	Sun,
	Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

export function SettingsMenu() {
	const navigate = useNavigate();
	const { setTheme } = useTheme();

	const menuItems = [
		{ label: "Account Settings", icon: User, action: () => {} },
		{
			label: "Admin Dashboard",
			icon: Settings,
			action: () => navigate("/admin-dashboard"),
		},
		// Appearance is handled separately
		{ label: "Notifications", icon: Bell, action: () => {} },
		{ label: "Security", icon: Shield, action: () => {} },
		{ label: "About", icon: Info, action: () => {} },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 p-0 mr-2"
				>
					<Settings className="h-3 w-3" />
					<span className="sr-only">Settings</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56"
				align="start"
				side="top"
				sideOffset={10}
			>
				<DropdownMenuLabel>Settings</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* Appearance Submenu */}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Palette className="mr-2 h-4 w-4" />
						<span>Appearance</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setTheme("light");
							}}
						>
							<Sun className="mr-2 h-4 w-4" />
							<span>Light</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setTheme("dark");
							}}
						>
							<Moon className="mr-2 h-4 w-4" />
							<span>Dark</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setTheme("system");
							}}
						>
							<Laptop className="mr-2 h-4 w-4" />
							<span>System</span>
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				{menuItems.map((item, index) => (
					<DropdownMenuItem key={index} onClick={item.action}>
						{item.icon && <item.icon className="mr-2 h-4 w-4" />}
						{item.label}
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
