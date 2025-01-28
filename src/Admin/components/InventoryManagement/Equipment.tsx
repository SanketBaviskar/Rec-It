import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/hooks/use-toast";

const formSchema = z.object({
  equipmentName: z.string().min(2, { message: "Equipment name must be at least 2 characters." }),
  equipmentCode: z.string().min(1, { message: "Equipment code is required." }),
  equipmentImage: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.number().min(0, { message: "Price must be a positive value." }),
  replacementFees: z.number().min(0, { message: "Replacement fees must be a positive value." }),
  department: z.string().min(1, { message: "Department is required." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
});

interface EquipmentProps {
  equipment: z.infer<typeof formSchema>;
  onEdit: (equipment: z.infer<typeof formSchema>) => void;
  onDelete: (equipmentId: string) => void;
}

export default function Equipment({ equipment, onEdit, onDelete }: EquipmentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: equipment,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    setIsEditing(false);
    onEdit(values);
    toast({
      title: "Equipment Updated",
      description: "Equipment details have been successfully updated.",
    });
  };

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    setIsDeletePopupOpen(false);
    onDelete(equipment.equipmentCode);
    toast({
      title: "Equipment Deleted",
      description: "Equipment has been successfully deleted.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="equipmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter equipment name" {...field} disabled={!isEditing} />
                </FormControl>
                <FormDescription>
                  Name of the equipment within the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equipmentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter equipment code" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equipmentImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment Image</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" placeholder="Upload equipment image" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter quantity" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))} 
                    min={1} 
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    min={0}
                    step="0.01"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="replacementFees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Replacement Fees</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter replacement fees"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    min={0}
                    step="0.01"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the equipment" {...field} disabled={!isEditing} />
                </FormControl>
                <FormDescription>
                  Provide a brief description of the equipment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Enter department" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-4">
          {isEditing ? (
            <Button type="submit" disabled={!isEditing}>
              Save
            </Button>
          ) : (
            <Button type="button" onClick={handleEdit}>
              Edit
            </Button>
          )}
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>

      <Dialog open={isDeletePopupOpen} onOpenChange={setIsDeletePopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this equipment? This action cannot be undone.</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeletePopupOpen(false)}>
              No, Go Back
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}