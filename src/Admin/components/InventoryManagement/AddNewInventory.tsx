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
import { Toaster } from "@/components/ui/toaster";


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

// Get all icon names from Lucide


interface AddInventoryFormProps {
  onComplete: () => void; // Callback for when form is cancelled or completed
}

export default function AddInventoryForm({
  onComplete,
}: AddInventoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
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
    // Set submitting state
    setIsSubmitting(true);

    try {
      // Prepare inventory data
      const inventoryData: InventoryData = {
        name: values.name,
        description: values.description,
        location: values.location,
        manager: values.manager,
      };

      // Call API to add inventory
      const response = await addInventory(inventoryData);
      console.log(response);
      if (response?.status === "success") {
        // Show success toast message
        toast({
          title: "Inventory Added Successfully",
          description: `New inventory named "${values.name}" has been added successfully.`,
          variant: "default",
        });
        form.reset();
        // onComplete();
      } else {
        throw new Error("Failed to add inventory"); // Handle failure if response status is not success
      }
    } catch (error) {
      console.error("Error adding inventory:", error);

      // Show error toast message
      toast({
        title: "Error",
        description: "Failed to add inventory. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Reset submitting state
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
    <>
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
          {/* This is new form field which is Icon */}
          {/* <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {iconNames.map((iconName) => {
                      const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
                      return (
                        <SelectItem 
                          key={iconName} 
                          value={iconName}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-2">
                            {typeof IconComponent === 'function' && <IconComponent className="h-4 w-4" />}
                            <span>{iconName}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose an icon for this inventory category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
    <Toaster />
    </>
  );
}
