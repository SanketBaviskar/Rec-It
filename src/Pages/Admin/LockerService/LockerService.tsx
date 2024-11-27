import AdminLayout from "../AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function LockerServicePage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Locker Service</h2>
        <Card>
          <CardHeader>
            <CardTitle>Locker Assignments</CardTitle>
            <CardDescription>
              Manage locker assignments and availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Locker Number</TableHead>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>A101</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2023-10-01</TableCell>
                  <TableCell>2023-12-31</TableCell>
                  <TableCell>Occupied</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>A102</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>A103</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2023-09-15</TableCell>
                  <TableCell>2023-12-15</TableCell>
                  <TableCell>Occupied</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Assign Locker</Button>
              <Button variant="outline">View All Lockers</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
