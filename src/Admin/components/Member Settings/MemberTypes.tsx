import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MemberTypeForm from "./MemberTypeForm";

export type MemberType = {
  id: string;
  name: string;
  description: string;
  accessLevel: "Basic" | "Standard" | "Premium";
  dateCreated: string;
};

const initialMemberTypes: MemberType[] = [
  {
    id: "1",
    name: "Student",
    description: "Full-time enrolled students",
    accessLevel: "Standard",
    dateCreated: "2023-01-01"
  },
  {
    id: "2",
    name: "Faculty",
    description: "University staff and professors",
    accessLevel: "Premium",
    dateCreated: "2023-03-15"
  },
  {
    id: "3",
    name: "Employee",
    description: "Corporate partnership employees",
    accessLevel: "Basic",
    dateCreated: "2023-05-20"
  }
];

interface MemberTypesProps {
  onComplete: () => void;
}

export default function MemberTypes({ onComplete }: MemberTypesProps) {
  const [memberTypes, setMemberTypes] = useState<MemberType[]>(initialMemberTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMemberType, setEditingMemberType] = useState<MemberType | null>(null);
  
  const handleFormSubmit = (values: MemberType) => {
    if (editingMemberType) {
      setMemberTypes(memberTypes.map(mt => mt.id === editingMemberType.id ? values : mt));
    } else {
      setMemberTypes([...memberTypes, { ...values, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
    setEditingMemberType(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this member type?")) {
      setMemberTypes(memberTypes.filter(mt => mt.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Member Type Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="sm:w-auto w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Member Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {editingMemberType ? "Edit Member Type" : "Create New Member Type"}
              </DialogTitle>
            </DialogHeader>
            <MemberTypeForm
              initialData={editingMemberType}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingMemberType(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px]">Member Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberTypes.map((memberType) => (
              <TableRow key={memberType.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{memberType.name}</TableCell>
                <TableCell>{memberType.description}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    memberType.accessLevel === "Premium" ? "bg-purple-100 text-purple-800" :
                    memberType.accessLevel === "Standard" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {memberType.accessLevel}
                  </span>
                </TableCell>
                <TableCell>{new Date(memberType.dateCreated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setEditingMemberType(memberType);
                        setIsDialogOpen(true);
                      }}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(memberType.id)}
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
  );
}