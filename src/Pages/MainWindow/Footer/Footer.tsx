'use client'

import { Button } from "@/components/ui/button"
import { Settings, HelpCircle, Wifi, User } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function RecCenterFooter() {
  // These would typically come from your app's state or context
  const computerName = "REC-CENTER-PC1"
  const loggedInUser = "John Doe"
  const appVersion = "v1.0.3"

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background h-8 px-1 text-[10px]">
      <div className="h-full mx-auto flex items-center justify-between">
        <div className="flex items-center ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 mr-2">
                  <Settings className="h-3 w-3" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <HelpCircle className="h-3 w-3" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Help</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mr-4">
          <span className="hidden lg:inline  mr-2">{computerName}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 mr-2">
                  <Wifi className="h-3 w-3" />
                  <span className="sr-only">Test Connection</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Test Connection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center gap-0.5">
            <User className="h-3 w-3" />
            <span className="hidden md:inline mr-2">{loggedInUser}</span>
          </div>
          <span className="hidden xl:inline">{appVersion}</span>
        </div>
      </div>
    </footer>
  )
}