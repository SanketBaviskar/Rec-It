import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function ParkingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Parking Permits</h2>
        <Card>
          <CardHeader>
            <CardTitle>Active Parking Permits</CardTitle>
            <CardDescription>
              Manage and track parking permits for your fitness center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permit ID</TableHead>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Vehicle Plate</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PP001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>ABC123</TableCell>
                  <TableCell>2023-01-01</TableCell>
                  <TableCell>2023-12-31</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PP002</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>XYZ789</TableCell>
                  <TableCell>2023-06-01</TableCell>
                  <TableCell>2023-11-30</TableCell>
                  <TableCell>Expiring Soon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PP003</TableCell>
                  <TableCell>Mike Johnson</TableCell>
                  <TableCell>DEF456</TableCell>
                  <TableCell>2023-03-15</TableCell>
                  <TableCell>2024-03-14</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Issue New Permit</Button>
              <Button variant="outline">View All Permits</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
