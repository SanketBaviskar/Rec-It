import AdminLayout from "../AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function DocumentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Documents & Templates</h2>
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              Manage and access important documents and templates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Membership Agreement</TableCell>
                  <TableCell>Template</TableCell>
                  <TableCell>2023-10-15</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Waiver Form</TableCell>
                  <TableCell>Template</TableCell>
                  <TableCell>2023-09-28</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee Handbook</TableCell>
                  <TableCell>Document</TableCell>
                  <TableCell>2023-11-01</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className="mt-4">Add New Document</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
