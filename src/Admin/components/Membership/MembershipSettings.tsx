import type React from "react"
import { useState } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

type AccessCategory = "Student" | "AHEC Affiliate" | "GT34" | "Senior" | "Adult" | "Youth"

type MembershipType = {
  id: string
  name: string
  accessCategories: AccessCategory[]
  pricePerMonth: number
  introDate: string
  maxMembers: number | null
  description: string
}

const allAccessCategories: AccessCategory[] = ["Student", "AHEC Affiliate", "GT34", "Senior", "Adult", "Youth"]

const MembershipSettings = () => {
  const [membershipTypes, setMembershipTypes] = useState<MembershipType[]>([
    {
      id: "1",
      name: "Basic Monthly",
      accessCategories: ["Adult", "Senior"],
      pricePerMonth: 29.99,
      introDate: "2023-01-01",
      maxMembers: null,
      description: "Access to basic facilities",
    },
    {
      id: "2",
      name: "Student Semester",
      accessCategories: ["Student"],
      pricePerMonth: 24.99,
      introDate: "2023-08-15",
      maxMembers: 1000,
      description: "Discounted rate for students",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMembership, setEditingMembership] = useState<MembershipType | null>(null)

  const handleAddOrUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newMembership: MembershipType = {
      id: editingMembership?.id || Date.now().toString(),
      name: formData.get("name") as string,
      accessCategories: allAccessCategories.filter((cat) => formData.get(cat) === "on"),
      pricePerMonth: Number.parseFloat(formData.get("pricePerMonth") as string),
      introDate: formData.get("introDate") as string,
      maxMembers: formData.get("maxMembers") ? Number.parseInt(formData.get("maxMembers") as string) : null,
      description: formData.get("description") as string,
    }

    if (editingMembership) {
      setMembershipTypes(membershipTypes.map((m) => (m.id === editingMembership.id ? newMembership : m)))
    } else {
      setMembershipTypes([...membershipTypes, newMembership])
    }

    setEditingMembership(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (membership: MembershipType) => {
    setEditingMembership(membership)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this membership type?")) {
      setMembershipTypes(membershipTypes.filter((m) => m.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Membership Types</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMembership(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Membership Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingMembership ? "Edit Membership Type" : "Add New Membership Type"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editingMembership?.name} required />
              </div>
              <div>
                <Label>Access Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {allAccessCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        name={category}
                        defaultChecked={editingMembership?.accessCategories.includes(category)}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="pricePerMonth">Price per Month</Label>
                <Input
                  id="pricePerMonth"
                  name="pricePerMonth"
                  type="number"
                  step="0.01"
                  defaultValue={editingMembership?.pricePerMonth}
                  required
                />
              </div>
              <div>
                <Label htmlFor="introDate">Intro Date</Label>
                <Input
                  id="introDate"
                  name="introDate"
                  type="date"
                  defaultValue={editingMembership?.introDate}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxMembers">Max Members (optional)</Label>
                <Input
                  id="maxMembers"
                  name="maxMembers"
                  type="number"
                  defaultValue={editingMembership?.maxMembers || ""}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingMembership?.description} required />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingMembership ? "Update" : "Add"} Membership Type</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Access Categories</TableHead>
            <TableHead>Price/Month</TableHead>
            <TableHead>Intro Date</TableHead>
            <TableHead>Max Members</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membershipTypes.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell>{membership.name}</TableCell>
              <TableCell>{membership.accessCategories.join(", ")}</TableCell>
              <TableCell>${membership.pricePerMonth.toFixed(2)}</TableCell>
              <TableCell>{membership.introDate}</TableCell>
              <TableCell>{membership.maxMembers || "Unlimited"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(membership)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(membership.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MembershipSettings;

