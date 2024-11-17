import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function Activity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Recent Activity</Label>
          <div className="space-y-2">
            {['Gym session - 2 hours', 'Pool access - 1 hour', 'Group class - Yoga', 'Personal training session', 'Sauna use - 30 minutes'].map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                <span>{activity}</span>
                <Badge variant="secondary">{index === 0 ? 'Today' : `${index + 1} days ago`}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Upcoming Bookings</Label>
          <div className="space-y-2">
            {['Spin Class - Tomorrow, 10:00 AM', 'Personal Training - 06/20/2023, 2:00 PM', 'Yoga Class - 06/22/2023, 6:00 PM'].map((booking, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                <span>{booking}</span>
                <Button variant="outline" size="sm">Cancel</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Attendance Statistics</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-md text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Visits this month</div>
            </div>
            <div className="bg-muted p-4 rounded-md text-center">
              <div className="text-2xl font-bold">80%</div>
              <div className="text-sm text-muted-foreground">Attendance rate</div>
            </div>
            <div className="bg-muted p-4 rounded-md text-center">
              <div className="text-2xl font-bold">45 min</div>
              <div className="text-sm text-muted-foreground">Avg. session duration</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Achievements</Label>
          <div className="flex flex-wrap gap-2">
            <Badge>5 Day Streak</Badge>
            <Badge>10 Classes Completed</Badge>
            <Badge>Personal Best: Bench Press</Badge>
            <Badge>1000m Swim Challenge</Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="activityNotes">Activity Notes</Label>
          <Textarea id="activityNotes" placeholder="Add notes about member's activity or progress" />
        </div>
      </CardContent>
    </Card>
  )
}