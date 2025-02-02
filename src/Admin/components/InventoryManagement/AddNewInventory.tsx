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
import { addInventory } from "@/Services/Api/Admin/Inventory/addInventory";
import { InventoryData } from "@/Interface/inventoryData";

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
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // State for success popup
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      manager: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const inventoryData: InventoryData = {
        name: values.name,
        description: values.description,
        location: values.location,
        manager: values.manager,
        isInventory: true
      };

      const response = await addInventory(inventoryData);
      console.log(response);

      // Set the success message from the API response
      setSuccessMessage(response.message || "Inventory created successfully");

      // Open the success popup
      setIsSuccessPopupOpen(true);

      form.reset();

      if (onComplete) {
        onComplete(); // Call the onComplete callback
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast({
        title: "Error",
        description: "Failed to add inventory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    setIsCancelPopupOpen(false);
    toast({
      title: "Form Cancelled",
      description: "You have cancelled the form.",
    });

    if (onComplete) {
      onComplete(); // Call the onComplete callback
    }
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
          <Button type="submit" disabled={isSubmitting}>
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

      {/* Success Popup */}
      <Dialog open={isSuccessPopupOpen} onOpenChange={setIsSuccessPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <p>{successMessage}</p>
          <DialogFooter>
            <Button onClick={() => setIsSuccessPopupOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Popup for Cancellation */}
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