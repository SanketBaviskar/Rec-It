import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function GuestPassesPage() {
  return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Guest Passes</h2>
        <Card>
          <CardHeader>
            <CardTitle>Active Guest Passes</CardTitle>
            <CardDescription>
              Manage and track guest passes for your fitness center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pass ID</TableHead>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>GP001</TableCell>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2023-11-10</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GP002</TableCell>
                  <TableCell>Bob Smith</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2023-11-15</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GP003</TableCell>
                  <TableCell>Charlie Brown</TableCell>
                  <TableCell>Mike Johnson</TableCell>
                  <TableCell>2023-11-08</TableCell>
                  <TableCell>Expired</TableCell>
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
  )
}
