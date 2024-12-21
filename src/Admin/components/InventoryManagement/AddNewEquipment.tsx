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
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  equipmentName: z.string().min(2, { message: "Equipment name must be at least 2 characters." }),
  equipmentCode: z.string().min(1, { message: "Equipment code is required." }),
  equipmentImage: z.string().optional(), // assuming image URL after upload; might need custom handling
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.number().min(0, { message: "Price must be a positive value." }),
  replacementFees: z.number().min(0, { message: "Replacement fees must be a positive value." }),
  department: z.string().min(1, { message: "Department is required." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
});

export function AddNewEquipmentForm({ onComplete , categoryId } ) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      equipmentName: "",
      equipmentCode: "",
      equipmentImage: "",
      description: "",
      quantity: 1,
      price: 0,
      replacementFees: 0,
      department: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: "Category Added",
      description: "New category has been successfully created along with equipment details.",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the new category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="equipmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter equipment name" {...field} />
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
                  <Input placeholder="Enter equipment code" {...field} />
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
                  <Input id="picture" type="file" placeholder="Upload equipment image" {...field} />
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
                  <Input type="number" placeholder="Enter quantity" {...field} min={1} />
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
                  <Input type="number" placeholder="Enter price" {...field} min={0} step="0.01" />
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
                  <Input type="number" placeholder="Enter replacement fees" {...field} min={0} step="0.01" />
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
                  <Textarea placeholder="Describe the category and equipment" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a brief description of this category and the equipment included.
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
                  <Input placeholder="Enter department" {...field} />
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
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
          <Button type="button" variant="destructive" onClick={() => setIsCancelPopupOpen(true)}>
            Cancel
          </Button>
        </div>
      </form>
      {isCancelPopupOpen && (
        <Dialog open={isCancelPopupOpen} onOpenChange={setIsCancelPopupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Cancellation</DialogTitle>
              <p>Are you sure you want to cancel this form? Unsaved changes will be lost.</p>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsCancelPopupOpen(false)}>
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
