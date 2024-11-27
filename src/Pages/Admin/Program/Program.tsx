import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function ProgramsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
        <Card>
          <CardHeader>
            <CardTitle>Fitness Programs</CardTitle>
            <CardDescription>
              Manage and track fitness programs offered at your center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>FP001</TableCell>
                  <TableCell>Yoga for Beginners</TableCell>
                  <TableCell>Jane Doe</TableCell>
                  <TableCell>Mon, Wed 6-7 PM</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>FP002</TableCell>
                  <TableCell>HIIT Workout</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>Tue, Thu 7-8 PM</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>FP003</TableCell>
                  <TableCell>Senior Fitness</TableCell>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell>Fri 10-11 AM</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Add New Program</Button>
              <Button variant="outline">View All Programs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
