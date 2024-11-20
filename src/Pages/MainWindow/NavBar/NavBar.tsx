"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  CalendarIcon,
  DollarSign,
  Wrench,
  Dumbbell,
  Bell,
  MessagesSquare,
  UserCircle,
  Settings,
  LogOut,
  MenuIcon,
} from "lucide-react";

const tabs = [
  { name: "dashboard", icon: LayoutDashboard, tooltip: "View Dashboard" },
  { name: "calendar", icon: CalendarIcon, tooltip: "View Calendar" },
  { name: "sale", icon: DollarSign, tooltip: "View Sales" },
  { name: "equipment", icon: Wrench, tooltip: "Manage Equipment" },
  { name: "search", icon: Search, tooltip: "Search" },
];

export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b w-100 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="items-center px-4 flex h-14 border-b">
        {" "}
        {/* Added padding */}
        <div className="flex items-center space-x-2 mr-4 md:space-x-4 w-1/5 pr-4">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-foreground bg-clip-text">
            Rec-It
          </span>
        </div>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4 w-3/5 ">
          {" "}
          {/* Increased space-x to 4 */}
          {tabs.map(({ name, icon: Icon, tooltip }) => (
            <TooltipProvider key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === name ? "default" : "ghost"}
                    className={cn(
                      "px-3 py-1 text-sm capitalize transition-all duration-200 ease-in-out hover:-translate-y-0.5",
                      activeTab === name &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => setActiveTab(name)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        <div className="flex items-center space-x-4 ml-auto justify-end w-1/5 pr-4">
          {" "}
          {/* Adjusted space-x for right-aligned items */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              {" "}
              {/* Added padding for mobile menu */}
              <nav className="flex flex-col space-y-4">
                {tabs.map(({ name, icon: Icon }) => (
                  <Button
                    key={name}
                    variant={activeTab === name ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab(name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px]"
                  >
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MessagesSquare className="h-5 w-5" />
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px]"
                  >
                    1
                  </Badge>
                  <span className="sr-only">Messages</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Messages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


//navbar-height 3.5rem