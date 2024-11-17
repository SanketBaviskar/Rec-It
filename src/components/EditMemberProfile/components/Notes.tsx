import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react'

export function Notes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes & Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="staffNotes">Staff Notes</Label>
          <Textarea id="staffNotes" placeholder="Add any additional notes here" rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="memberFeedback">Member Feedback</Label>
          <Textarea id="memberFeedback" placeholder="Record any feedback from the member" rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Special Considerations</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="vip" />
              <Label htmlFor="vip">VIP Treatment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="specialNeeds" />
              <Label htmlFor="specialNeeds">Special Needs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="corporateMember" />
              <Label htmlFor="corporateMember">Corporate Member</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="influencer" />
              <Label htmlFor="influencer">Influencer/Celebrity</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Alerts</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="paymentAlert" />
              <Label htmlFor="paymentAlert">Payment Overdue</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medicalAlert" />
              <Label htmlFor="medicalAlert">Medical Condition Alert</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="anniversaryAlert" />
              <Label htmlFor="anniversaryAlert">Membership Anniversary</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customFields">Custom Fields</Label>
          <Textarea id="customFields" placeholder="Add any custom information here" rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Document Uploads</Label>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
            <Button variant="outline">View Uploaded Documents</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}