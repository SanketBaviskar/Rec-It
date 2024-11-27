import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function AccountingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Accounting</h2>
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              Recent financial transactions and summary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-11-01</TableCell>
                  <TableCell>Monthly Membership Fee</TableCell>
                  <TableCell>$50.00</TableCell>
                  <TableCell>Income</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-11-02</TableCell>
                  <TableCell>Equipment Purchase</TableCell>
                  <TableCell>$500.00</TableCell>
                  <TableCell>Expense</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-11-03</TableCell>
                  <TableCell>Personal Training Session</TableCell>
                  <TableCell>$75.00</TableCell>
                  <TableCell>Income</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Generate Report</Button>
              <Button variant="outline">Export to CSV</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

