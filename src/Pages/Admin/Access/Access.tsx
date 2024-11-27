import AdminLayout from "../AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function AccessPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Access Control</h2>
        <Card>
          <CardHeader>
            <CardTitle>Access Logs</CardTitle>
            <CardDescription>
              Recent access events at your fitness center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-11-03</TableCell>
                  <TableCell>09:15 AM</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Entered Gym</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-11-03</TableCell>
                  <TableCell>10:30 AM</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Entered Pool Area</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-11-03</TableCell>
                  <TableCell>11:45 AM</TableCell>
                  <TableCell>Mike Johnson</TableCell>
                  <TableCell>Exited Gym</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className="mt-4">View All Logs</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

