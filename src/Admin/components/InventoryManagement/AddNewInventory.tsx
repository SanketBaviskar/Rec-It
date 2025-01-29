"use client";
import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { fetchInventoryCategories } from "@/Services/Api/Equipment/inventorySidebar";
// Type for department from API
interface Department {
  id: number;
  name: string;
  departmentIcon: string;
  createdAt: string;
  updatedAt: string;
}
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Inventory name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  department: z.string({
    required_error: "Please select a department.",
  }),
  manager: z.string().min(2, {
    message: "Manager name must be at least 2 characters.",
  }),
});

interface AddInventoryFormProps {
  onComplete: () => void; // Callback for when form is cancelled or completed
}

export default function AddInventoryForm({
  onComplete,
}: AddInventoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
  const { toast } = useToast();

  // Fetch departments on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setIsLoadingDepartments(true);
        const response = await fetchInventoryCategories();
        if (response.status === "success" && response.data?.items) {
          setDepartments(response.data.items);
        } else {
          toast({
            title: "Error",
            description: "Failed to load departments",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to load departments",
          variant: "destructive",
        });
      } finally {
        setIsLoadingDepartments(false);
      }
    };
    loadDepartments();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      department: "",
      manager: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    console.log(values);

    // Add the new inventory to allCategories array
    createNewInventory(values);

    setIsSubmitting(false);
    toast({
      title: "Inventory Added",
      description: "New inventory has been successfully created.",
    });
    form.reset();
    onComplete();
  }

  const handleCancel = () => {
    form.reset();
    setIsCancelPopupOpen(false);
    toast({
      title: "Form Cancelled",
      description: "You have cancelled the form.",
    });
    onComplete();
  };

  // Create new inventory and add it to the allCategories array
  const createNewInventory = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Grid layout for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inventory Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter inventory name" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the new inventory category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the inventory category"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of this inventory category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormDescription>
                  Where is this inventory located within the rec center?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingDepartments}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingDepartments
                            ? "Loading departments..."
                            : "Select a department"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingDepartments ? (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the department this inventory belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Manager */}
          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <FormControl>
                  <Input placeholder="Enter manager's name" {...field} />
                </FormControl>
                <FormDescription>
                  Who is responsible for managing this inventory?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting || isLoadingDepartments}>
            {isSubmitting ? "Adding..." : "Add Inventory"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsCancelPopupOpen(true)}
          >
            Cancel
          </Button>
        </div>
      </form>
      {/* Confirmation Popup */}
      {isCancelPopupOpen && (
        <Dialog open={isCancelPopupOpen} onOpenChange={setIsCancelPopupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Cancellation</DialogTitle>
              <p>
                Are you sure you want to cancel this form? Unsaved changes will
                be lost.
              </p>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsCancelPopupOpen(false)}
              >
                No, Go Back
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Form>
  );
}
