"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, CreditCard, Dumbbell, ClipboardList, MessageSquare, X } from 'lucide-react'
import { PersonalInfo } from "./components/Personal-Info"
import { Membership } from "./components/Membership"
import { Fitness } from "./components/Fitness"
import { Billing } from "./components/Billing"
import { Activity } from "./components/Activity"
import { Notes } from "./components/Notes"

export default function EditMemberProfile({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg w-[90vw] max-w-6xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 flex-none">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Edit Member Profile</h1>
            <Avatar className="h-20 w-20">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs defaultValue="personal" className="flex-1 flex flex-col min-h-0">
          <div className="px-6 flex-none">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal">
                <User className="h-5 w-5 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="membership">
                <CreditCard className="h-5 w-5 mr-2" />
                Membership
              </TabsTrigger>
              <TabsTrigger value="fitness">
                <Dumbbell className="h-5 w-5 mr-2" />
                Fitness
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="h-5 w-5 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="activity">
                <ClipboardList className="h-5 w-5 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="notes">
                <MessageSquare className="h-5 w-5 mr-2" />
                Notes
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden px-6">
            <div className="h-full overflow-y-auto">
              <TabsContent value="personal" className="mt-4 h-full">
                <PersonalInfo />
              </TabsContent>

              <TabsContent value="membership" className="mt-4 h-full">
                <Membership />
              </TabsContent>

              <TabsContent value="fitness" className="mt-4 h-full">
                <Fitness />
              </TabsContent>

              <TabsContent value="billing" className="mt-4 h-full">
                <Billing />
              </TabsContent>

              <TabsContent value="activity" className="mt-4 h-full">
                <Activity />
              </TabsContent>

              <TabsContent value="notes" className="mt-4 h-full">
                <Notes />
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <div className="p-6 flex-none border-t">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}