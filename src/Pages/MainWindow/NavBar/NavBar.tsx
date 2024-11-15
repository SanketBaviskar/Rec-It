'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Search, CalendarIcon, DollarSign, Wrench, Dumbbell, Bell, MessagesSquare, UserCircle, Settings, LogOut, MenuIcon } from 'lucide-react'

const tabs = [
  { name: 'dashboard', icon: LayoutDashboard, tooltip: 'View Dashboard' },
  { name: 'calendar', icon: CalendarIcon, tooltip: 'View Calendar' },
  { name: 'sale', icon: DollarSign, tooltip: 'View Sales' },
  { name: 'equipment', icon: Wrench, tooltip: 'Manage Equipment' },
  { name: 'search', icon: Search, tooltip: 'Search' },
]

export default function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2 mr-4">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Rec-It
          </span>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center space-x-2">
          {tabs.map(({ name, icon: Icon, tooltip }) => (
            <TooltipProvider key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === name ? "default" : "ghost"}
                    className={cn(
                      "px-3 py-1 text-sm capitalize transition-all duration-200 ease-in-out hover:-translate-y-0.5",
                      activeTab === name && "bg-primary text-primary-foreground hover:bg-primary/90"
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

        <div className="flex items-center space-x-2 ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                {tabs.map(({ name, icon: Icon }) => (
                  <Button
                    key={name}
                    variant={activeTab === name ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab(name)
                      setIsMobileMenuOpen(false)
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
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px]">
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
                <Button variant="ghost" size="icon">
                  <MessagesSquare className="h-5 w-5" />
                  <Badge variant="default" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px]">
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
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
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
  )
}