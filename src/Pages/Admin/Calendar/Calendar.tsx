import AdminLayout from "../AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Calendar } from "../../../components/ui/calendar"
import { Button } from "../../../components/ui/button"

export default function CalendarsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Calendars</h2>
        <Card>
          <CardHeader>
            <CardTitle>Facility Schedule</CardTitle>
            <CardDescription>
              Manage and view the fitness center's schedule.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar />
            </div>
            <div className="mt-4 flex justify-between">
              <Button>Add Event</Button>
              <Button variant="outline">View All Events</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

