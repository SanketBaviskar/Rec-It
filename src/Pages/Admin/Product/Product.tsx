import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function ProductsPage() {
  return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Products & Equipment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>
              Manage products and equipment inventory for your fitness center.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Last Restocked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>P001</TableCell>
                  <TableCell>Yoga Mat</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$29.99</TableCell>
                  <TableCell>2023-10-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>P002</TableCell>
                  <TableCell>Protein Powder</TableCell>
                  <TableCell>Supplements</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>$39.99</TableCell>
                  <TableCell>2023-11-01</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>P003</TableCell>
                  <TableCell>Resistance Bands</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>$19.99</TableCell>
                  <TableCell>2023-09-30</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button>Add New Product</Button>
              <Button variant="outline">View All Products</Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
