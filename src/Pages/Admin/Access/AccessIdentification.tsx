import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function IdentificationTypes() {
  const identificationTypes = [
    { name: "CSN", type: "Proximity Card", status: "Enabled" },
    { name: "Lynx Card Barcode Helper", type: "Barcode/General Meters", status: "Enabled" },
    { name: "Lynx Helper (2)", type: "Barcode/General Meters", status: "Enabled" },
    { name: "Lynx Helper 8 digit", type: "Barcode/General Meters", status: "Enabled" },
    { name: "Non-University ID Card", type: "Barcode/General Meters", status: "Enabled" },
    { name: "Prox card Helper", type: "Proximity Card", status: "Enabled" },
    { name: "Prox ID", type: "Proximity Card", status: "Enabled" },
    { name: "Barcode Helper", type: "Barcode/General Meters", status: "Disabled" },
    { name: "Prox ID (Not In Use)", type: "Proximity Card", status: "Disabled" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input className="w-1/3" placeholder="Enter text to search..." />
        <Button>Add New Identification Type</Button>
      </div>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {identificationTypes.map((idType) => (
              <TableRow key={idType.name}>
                <TableCell>{idType.name}</TableCell>
                <TableCell>{idType.type}</TableCell>
                <TableCell>{idType.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

