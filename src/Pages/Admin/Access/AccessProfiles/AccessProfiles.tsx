"use client"

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface AccessPoint {
  id: string
  name: string
  type: string
}

interface Facility {
  name: string
  accessPoints: AccessPoint[]
}

const facilities: Facility[] = [
  {
    name: "Climbing Wall",
    accessPoints: [
      { id: "DC-SD1XM54", name: "RFID Reader Device - Climbing Wall", type: "RFID Scanner" },
      { id: "WRS-CW1", name: "WRS - Climbing Wall", type: "Climbing Wall Reader" },
      { id: "WRS-CW2", name: "WRS - Climbing Wall (2)", type: "RFID Scanner" },
    ]
  },
  {
    name: "Lola & Rob Salazar Student Wellness Center",
    accessPoints: [
      { id: "DC-PP-SPEC2", name: "Wellness ID Reader", type: "Barcode Reader" },
      { id: "JN-NB1", name: "John's Notebook", type: "Wave ID" },
      { id: "KW-1", name: "Kyle-Work", type: "PT Access 30 Minute" },
      { id: "KW-2", name: "Kyle-Work", type: "PT Access 60 Minute" },
      { id: "TWEB-1", name: "TWEB-SURFACE", type: "Private Swim Lesson" },
      { id: "TWEB-2", name: "TWEB-SURFACE", type: "PT Access" },
      { id: "TWEB-3", name: "TWEB-SURFACE", type: "Welcome Desk" },
    ]
  },
  {
    name: "Member Services Desk",
    accessPoints: [
      { id: "DC-12T12T3", name: "Scott's RFID Wave Plus", type: "PT Access 30 Min" },
      { id: "DC-223FEV3", name: "PT Access 60 min", type: "PT Access" },
    ]
  }
]

const profiles = [
  { name: "Adventure Bike Shop", code: "" },
  { name: "Climbing Wall", code: "" },
  { name: "Community", code: "" },
  { name: "Family Hours", code: "" },
  { name: "General Access", code: "" },
  { name: "LeadWELL", code: "" },
  { name: "PT Access 30 Minute", code: "" },
  { name: "PT Access 60 Minute", code: "" },
  { name: "PT Access Duo", code: "" },
  { name: "ROTC", code: "" },
  { name: "Swim Lesson 30 minute", code: "" },
  { name: "Swim Lesson 45 Minute", code: "" },
  { name: "Swim Lesson 60 minute", code: "" },
  { name: "USMS", code: "" },
  { name: "Wellness Events", code: "" },
]

export function AccessProfiles() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAccessPoints, setSelectedAccessPoints] = useState<string[]>([])

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Enter text to search..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-4 text-left align-middle font-medium">Name</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile) => (
              <tr
                key={profile.name}
                className="border-b cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  setSelectedProfile(profile)
                  setIsDialogOpen(true)
                }}
              >
                <td className="p-4">{profile.name}</td>
                <td className="p-4">{profile.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Access Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="grid gap-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={selectedProfile?.name || ''} />
              </div>
              <div className="space-y-1">
                <Label>Code</Label>
                <Input value={selectedProfile?.code || ''} />
              </div>
            </div>

            <Tabs defaultValue="access-points" className="w-full">
              <TabsList className="w-full mb-2">
                <TabsTrigger value="access-points" className="flex-1">Access Points</TabsTrigger>
                <TabsTrigger value="times" className="flex-1">Times</TabsTrigger>
              </TabsList>
              <TabsContent value="access-points" className="border rounded-md p-2 mt-2 max-h-[40vh] overflow-y-auto">
                <div className="space-y-4">
                  {facilities.map((facility) => (
                    <div key={facility.name} className="space-y-1">
                      <div className="font-medium text-sm">{facility.name}</div>
                      <div className="ml-4 space-y-1">
                        {facility.accessPoints.map((point) => (
                          <div key={point.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={point.id}
                              checked={selectedAccessPoints.includes(point.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAccessPoints([...selectedAccessPoints, point.id])
                                } else {
                                  setSelectedAccessPoints(selectedAccessPoints.filter(id => id !== point.id))
                                }
                              }}
                            />
                            <div className="grid gap-0.5">
                              <Label htmlFor={point.id} className="text-sm">{point.name}</Label>
                              <span className="text-xs text-muted-foreground">{point.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="times">
                <div className="text-sm text-muted-foreground">
                  Time settings will be implemented here
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

