import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export function Membership() {
  const [membershipType, setMembershipType] = useState("standard")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership & Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accessId">Access ID</Label>
            <Input id="accessId" placeholder="Enter access ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input id="joinDate" type="date" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Membership Type</Label>
          <RadioGroup defaultValue={membershipType} onValueChange={setMembershipType} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="premium" id="premium" />
              <Label htmlFor="premium">Premium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vip" id="vip" />
              <Label htmlFor="vip">VIP</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Facility Access</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="gym" />
              <Label htmlFor="gym">Gym</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pool" />
              <Label htmlFor="pool">Pool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sauna" />
              <Label htmlFor="sauna">Sauna</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="classes" />
              <Label htmlFor="classes">Group Classes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="personalTraining" />
              <Label htmlFor="personalTraining">Personal Training</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="spa" />
              <Label htmlFor="spa">Spa</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Access Schedule</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select access schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24/7">24/7 Access</SelectItem>
              <SelectItem value="weekday">Weekdays Only</SelectItem>
              <SelectItem value="weekend">Weekends Only</SelectItem>
              <SelectItem value="custom">Custom Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Membership Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="membershipHold" />
          <Label htmlFor="membershipHold">Place Membership on Hold</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="holdReason">Hold Reason</Label>
          <Textarea id="holdReason" placeholder="Reason for placing membership on hold" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractLength">Contract Length (months)</Label>
          <Input id="contractLength" type="number" min="1" max="60" />
        </div>
      </CardContent>
    </Card>
  )
}