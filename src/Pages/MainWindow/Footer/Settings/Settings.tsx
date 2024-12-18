import { Settings, User, Palette, Bell, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

export function SettingsMenu() {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Account Settings", icon: User, action: () => {} },
    {
      label: "Admin Dashboard",
      icon: Settings,
      action: () => navigate("/admin-dashboard"),
    },
    { label: "Appearance", icon: Palette, action: () => {} },
    { label: "Notifications", icon: Bell, action: () => {} },
    { label: "Security", icon: Shield, action: () => {} },
    { label: "About", icon: Info, action: () => {} },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 mr-2">
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
