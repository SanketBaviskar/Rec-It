'use client'

import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 mr-2">
          <Settings className="h-3 w-3" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" side="top" sideOffset={10}>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          Admin Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem>
          Appearance
        </DropdownMenuItem>
        <DropdownMenuItem>
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          Security
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          About
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

