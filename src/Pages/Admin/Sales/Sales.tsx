import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function SalesPage() {
  return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              View and manage recent sales transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>T001</TableCell>
                  <TableCell>2023-11-01</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Monthly Membership</TableCell>
                  <TableCell>$50.00</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>T002</TableCell>
                  <TableCell>2023-11-02</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Personal Training Session</TableCell>
                  <TableCell>$75.00</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>T003</TableCell>
                  <TableCell>2023-11-03</TableCell>
                  <TableCell>Mike Johnson</TableCell>
                  <TableCell>Protein Shake</TableCell>
                  <TableCell>$5.99</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>New Sale</Button>
              <Button variant="outline">View All Sales</Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
