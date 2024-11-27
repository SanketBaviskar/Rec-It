import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../..//components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { toast } from "../../../hooks/use-toast"
import { Switch } from "../../..//components/ui/switch"
import { useState } from "react"


export default function FacilityPage() {
  const [isOpen, setIsOpen] = useState(true)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the data to your backend
    toast({
      title: "Facility information updated",
      description: "The changes have been saved successfully.",
    })
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Facility Management</h2>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isOpen}
              onCheckedChange={setIsOpen}
              aria-label="Toggle facility open status"
            />
            <Label htmlFor="airplane-mode" className="font-medium text-sm">
              Facility is {isOpen ? 'Open' : 'Closed'}
            </Label>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Facility Information</CardTitle>
            <CardDescription>
              Manage your fitness center's facility details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Total Capacity</Label>
                  <Input id="capacity" type="number" placeholder="Enter total capacity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Operating Hours</Label>
                  <Input id="hours" placeholder="e.g., Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities</Label>
                  <Textarea id="amenities" placeholder="e.g., Pool, Sauna, Basketball Court" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Next Maintenance Date</Label>
                  <Input id="maintenance" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaningSchedule">Cleaning Schedule</Label>
                  <Select>
                    <SelectTrigger id="cleaningSchedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" type="tel" placeholder="Enter emergency contact number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information about the facility" />
              </div>
              <Button type="submit" className="mt-4">Update Facility Information</Button>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
