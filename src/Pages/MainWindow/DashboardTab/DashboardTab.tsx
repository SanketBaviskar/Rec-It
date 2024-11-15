'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, XCircle, StickyNote, PlusCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

// Mocked data
const activityData = [
  { name: 'Mon', users: 4000, avgTime: 2400 },
  { name: 'Tue', users: 3000, avgTime: 1398 },
  { name: 'Wed', users: 2000, avgTime: 9800 },
  { name: 'Thu', users: 2780, avgTime: 3908 },
  { name: 'Fri', users: 1890, avgTime: 4800 },
  { name: 'Sat', users: 2390, avgTime: 3800 },
  { name: 'Sun', users: 3490, avgTime: 4300 },
]

const initialActiveUsers = [
  { id: 1, name: "John Doe", membershipType: "Premium", lastActive: "2 hours ago", status: "active", note: "" },
  { id: 2, name: "Jane Smith", membershipType: "Basic", lastActive: "1 day ago", status: "inactive", note: "" },
  { id: 3, name: "Alice Johnson", membershipType: "Premium", lastActive: "5 minutes ago", status: "active", note: "VIP member" },
  { id: 4, name: "Bob Williams", membershipType: "Basic", lastActive: "3 days ago", status: "suspended", note: "" },
  { id: 5, name: "Charlie Brown", membershipType: "Premium", lastActive: "1 hour ago", status: "active", note: "" },
]

export default function DashboardTab() {
  
  const [gates, setGates] = useState([
    { isOpen: false, isLocked: false },
    { isOpen: false, isLocked: false },
    { isOpen: false, isLocked: false },
  ])
  const [activeUsers, setActiveUsers] = useState(initialActiveUsers)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<(typeof activeUsers)[0] | null>(null)
  const [newNote, setNewNote] = useState("")

  const handleGateClick = (index: number) => {
    if (gates[index].isLocked) return
    setGates(prev => {
      const newGates = [...prev]
      newGates[index] = { ...newGates[index], isOpen: true }
      setTimeout(() => {
        setGates(current => {
          const updated = [...current]
          updated[index] = { ...updated[index], isOpen: false }
          return updated
        })
      }, 5000)
      return newGates
    })
  }

  const handleSwitchChange = (index: number) => {
    setGates(prev => {
      const newGates = [...prev]
      newGates[index] = {
        ...newGates[index],
        isLocked: !newGates[index].isLocked,
        isOpen: false,
      }
      return newGates
    })
  }

  const handleNoteClick = (user: (typeof activeUsers)[0]) => {
    setCurrentUser(user)
    setNewNote(user.note)
    setNoteDialogOpen(true)
  }

  const handleNoteSave = () => {
    if (currentUser) {
      setActiveUsers(prev =>
        prev.map(user =>
          user.id === currentUser.id ? { ...user, note: newNote } : user
        )
      )
    }
    setNoteDialogOpen(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background p-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-full">
        {/* Active Users */}
        <Card className="col-span-1 md:col-span-2 h-full">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Active Users</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {activeUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{`${user.membershipType} - ${user.lastActive}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {user.status === "active" ? (
                      <CheckCircle className="text-green-500" />
                    ) : user.status === "suspended" ? (
                      <XCircle className="text-red-500" />
                    ) : (
                      <XCircle className="text-gray-300" />
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleNoteClick(user)}>
                            {user.note ? <StickyNote className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{user.note || "Add note"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-4">
          {/* User Activity */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">User Activity</h2>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" />
                    <Line type="monotone" dataKey="avgTime" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gate Controls */}
          <Card className="flex-grow">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Gate Controls</h2>
              <div className="space-y-4">
                {gates.map((gate, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`gate-${index}`}>Gate {index + 1}</Label>
                        <Switch
                          id={`gate-${index}`}
                          checked={gate.isLocked}
                          onCheckedChange={() => handleSwitchChange(index)}
                        />
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {gate.isOpen ? "Open" : "Closed"}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleGateClick(index)}
                          disabled={gate.isLocked}
                          variant={gate.isOpen ? "default" : "outline"}
                        >
                          {gate.isLocked
                            ? "Locked"
                            : gate.isOpen
                            ? "Opening..."
                            : "Open"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add/Edit Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <Input
                id="note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleNoteSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}