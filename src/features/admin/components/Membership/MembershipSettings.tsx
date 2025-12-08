import type React from "react"
import { useState } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import * as z from "zod"
import AddMembershipTypeForm from "./AddMembershipTypeForm"

// Define form schema for type safety
export const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  introDate: z.string(),
  maxMembers: z.number().nullable(),
  categories: z.array(z.object({
    name: z.enum(["Student", "AHEC Affiliate", "GT34", "Senior", "Adult", "Youth"]),
    price: z.number()
  })).min(1)
});

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

export const allAccessCategories: AccessCategory[] = ["Student", "AHEC Affiliate", "GT34", "Senior", "Adult", "Youth"]

interface MembershipSettingsProps {
  onComplete: () => void;
}

const MembershipSettings = ({ onComplete }: MembershipSettingsProps) => {
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

  type FormValues = {
    name: string
    description: string
    introDate: string
    maxMembers: number | null
    categories: {
      name: AccessCategory
      price: number
    }[]
  }

  const handleFormSubmit = (values: FormValues) => {
    const newMembership: MembershipType = {
      id: editingMembership?.id || Date.now().toString(),
      name: values.name,
      accessCategories: values.categories.map((category: {name: AccessCategory}) => category.name),
      pricePerMonth: values.categories[0].price,
      introDate: values.introDate,
      maxMembers: values.maxMembers,
      description: values.description,
    };

    if (editingMembership) {
      setMembershipTypes(membershipTypes.map(m => m.id === editingMembership.id ? newMembership : m));
    } else {
      setMembershipTypes([...membershipTypes, newMembership]);
    }

    setIsDialogOpen(false);
    setEditingMembership(null);
    onComplete(); // Call onComplete after successful submission
  };

  const handleEdit = (membership: MembershipType) => {
    setEditingMembership(membership)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this membership type?")) {
      setMembershipTypes(membershipTypes.filter((m) => m.id !== id))
      onComplete(); // Call onComplete after successful deletion
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Membership Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="sm:w-auto w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Membership Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {editingMembership ? "Edit Membership" : "Create New Membership"}
              </DialogTitle>
            </DialogHeader>
            <AddMembershipTypeForm
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingMembership(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px]">Membership</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Since</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membershipTypes.map((membership) => (
              <TableRow key={membership.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{membership.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {membership.accessCategories.map((cat) => (
                      <span 
                        key={cat} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${membership.pricePerMonth.toFixed(2)}</TableCell>
                <TableCell>{new Date(membership.introDate).toLocaleDateString()}</TableCell>
                <TableCell>{membership.maxMembers || "∞"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(membership)}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(membership.id)}
                      className="hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MembershipSettings;

