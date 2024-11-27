import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AccessProfiles() {
  const profiles = [
    { name: "Adventure Bike Shop", code: "" },
    { name: "Climbing Wall", code: "" },
    { name: "Community", code: "" },
    { name: "Family Hours", code: "" },
    { name: "General Access", code: "" },
    { name: "LeadWELL", code: "" },
    { name: "PT Access 30 Minute", code: "" },
    { name: "PT Access 60 Minute", code: "" },
    { name: "PT Access Duo", code: "" },
    { name: "ROTC", code: "" },
    { name: "Swim Lesson 30 minute", code: "" },
    { name: "Swim Lesson 45 Minute", code: "" },
    { name: "Swim Lesson 60 minute", code: "" },
    { name: "USMS", code: "" },
    { name: "Wellness Events", code: "" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input className="w-1/3" placeholder="Enter text to search..." />
        <Button>Add New Profile</Button>
      </div>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.name}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.code}</TableCell>
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

