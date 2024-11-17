import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function PersonalInfo() {
  // const [dob, setDob] = useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" placeholder="M." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(123) 456-7890" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={setDob}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="Enter your address" />
        </div>
        <div className="space-y-2">
          <Label>Photo</Label>
          <div className="flex space-x-2">
            <Button variant="outline">Upload Photo</Button>
            <Button variant="outline">Take Photo</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input id="emergencyContact" placeholder="Name and phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" placeholder="Enter occupation" />
        </div>
        <div className="space-y-2">
          <Label>Preferred Language</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}