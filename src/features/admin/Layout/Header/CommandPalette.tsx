import * as React from "react";
import {
	Calculator,
	CreditCard,
	Settings,
	Smile,
	User,
	Zap,
	LayoutDashboard,
	Users,
	Building2,
	Shield,
	ShoppingBag,
} from "lucide-react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export function CommandPalette() {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<div
				onClick={() => setOpen(true)}
				className="text-sm text-muted-foreground border px-4 py-2 rounded-md hidden lg:flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors w-64 bg-background"
			>
				<span>Search...</span>
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-auto">
					<span className="text-xs">⌘</span>K
				</kbd>
			</div>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>

					<CommandGroup heading="Navigation">
						<CommandItem
							onSelect={() =>
								runCommand(() => navigate("/admin-dashboard."))
							}
						>
							<LayoutDashboard className="mr-2 h-4 w-4" />
							<span>Dashboard</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									navigate("/admin-dashboard/access")
								)
							}
						>
							<Zap className="mr-2 h-4 w-4" />
							<span>Access Control</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									navigate("/admin-dashboard/member-settings")
								)
							}
						>
							<Users className="mr-2 h-4 w-4" />
							<span>Members & Users</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									navigate("/admin-dashboard/facilities")
								)
							}
						>
							<Building2 className="mr-2 h-4 w-4" />
							<span>Facilities</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									navigate("/admin-dashboard/inventory")
								)
							}
						>
							<ShoppingBag className="mr-2 h-4 w-4" />
							<span>Inventory</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									navigate(
										"/admin-dashboard/general-settings"
									)
								)
							}
						>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</CommandItem>
					</CommandGroup>

					<CommandSeparator />

					<CommandGroup heading="Quick Actions">
						<CommandItem
							onSelect={() =>
								runCommand(() => console.log("New Transaction"))
							}
						>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>New POS Transaction</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() => console.log("Check-in"))
							}
						>
							<User className="mr-2 h-4 w-4" />
							<span>Member Check-In</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() => console.log("Incident"))
							}
						>
							<Shield className="mr-2 h-4 w-4" />
							<span>Log Incident</span>
						</CommandItem>
					</CommandGroup>

					<CommandSeparator />

					<CommandGroup heading="Search">
						<CommandItem
							onSelect={() =>
								runCommand(() => console.log("Search Member"))
							}
						>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Member...</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() => console.log("Search Asset"))
							}
						>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Search Asset...</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
