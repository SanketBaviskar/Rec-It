import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IdentificationType {
  name: string;
  type: string;
  status: "enabled" | "disabled";
}

const identificationTypes: IdentificationType[] = [
  { name: "CSN", type: "Proximity Card", status: "enabled" },
  { name: "Lynx Card Barcode Helper", type: "Barcode/General Meters", status: "enabled" },
  { name: "Lynx Helper (2)", type: "Barcode/General Meters", status: "enabled" },
  { name: "Lynx Helper 8 digit", type: "Barcode/General Meters", status: "enabled" },
  { name: "Non-University ID Card", type: "Barcode/General Meters", status: "enabled" },
  { name: "Prox Card Helper", type: "Proximity Card", status: "enabled" },
  { name: "Prox ID", type: "Proximity Card", status: "enabled" },
  { name: "Barcode Helper", type: "Barcode/General Meters", status: "disabled" },
  { name: "Prox ID (Not in Use)", type: "Proximity Card", status: "disabled" },
];

export function AccessIdentificationTypes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredTypes = identificationTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter text to search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTypes.map((type, index) => (
              <React.Fragment key={type.name}>
                {index === 0 || filteredTypes[index - 1].status !== type.status ? (
                  <TableRow>
                    <TableCell colSpan={2} className="bg-muted/50 font-medium">
                      Status: {type.status.charAt(0).toUpperCase() + type.status.slice(1)}
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedId(type.name);
                    setIsDialogOpen(true);
                  }}
                >
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type.type}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Prox Card Media Format</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input id="name" value={selectedId || ''} disabled />
              <Checkbox id="enabled" label="This format is enabled" />
            </div>
            <div className="space-y-2">
              <Label>ID Number</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Expected Bit Count</Label>
                  <Select defaultValue="32">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select bit count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="32">32</SelectItem>
                      <SelectItem value="26">26</SelectItem>
                      <SelectItem value="34">34</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Mask" />
                <div className="text-sm text-muted-foreground">(32 bits)</div>
                <div className="flex items-center gap-2">
                  <Label>Multiplier</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select multiplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="pad-length" className="flex items-center gap-2">
                  <span>Force Length</span>
                  <Checkbox id="pad-length" />
                </Label>
                <Label htmlFor="pad-length">Pad ID to specific length</Label>
                <Input type="number" className="w-20" defaultValue="0" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

