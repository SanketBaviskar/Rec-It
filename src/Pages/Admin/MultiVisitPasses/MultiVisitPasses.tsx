import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function MultiVisitPassesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Multi-Visit Passes</h2>
        <Card>
          <CardHeader>
            <CardTitle>Active Multi-Visit Passes</CardTitle>
            <CardDescription>
              Manage and track multi-visit passes for your fitness center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pass ID</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Total Visits</TableHead>
                  <TableHead>Visits Used</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>MVP001</TableCell>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>2023-12-31</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MVP002</TableCell>
                  <TableCell>Bob Smith</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>2023-11-30</TableCell>
                  <TableCell>Expiring Soon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MVP003</TableCell>
                  <TableCell>Charlie Brown</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>2023-10-31</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Issue New Pass</Button>
              <Button variant="outline">View All Passes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
