import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {Equipment} from "./InventorymanagementIntetrface"
import { createEquipment } from "@/Services/Api/Admin/Equipment/createEquipment";
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
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  equipmentName: z
    .string()
    .min(2, { message: "Equipment name must be at least 2 characters." }),
  equipmentCode: z.string().min(1, { message: "Equipment code is required." }),
  equipmentImage: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.number().min(0, { message: "Price must be a positive value." }),
  replacementFees: z
    .number()
    .min(0, { message: "Replacement fees must be a positive value." }),
  department: z.string().min(1, { message: "Department is required." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
});

interface AddNewEquipmentFormProps {
  onComplete: () => void;
  categoryId: string;
  categoryName:string // Received from parent component
}

export default function AddNewEquipmentForm({
  onComplete,
  categoryId, categoryName
}: AddNewEquipmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    try {
      const EquipmentDetails: Equipment = {
        name: values.equipmentName,
        code: values.equipmentCode,
        image: values.equipmentImage,
        description: values.description,
        quantity: values.quantity,
        price: values.price,
        replacementFees: values.replacementFees,
        location: values.location,
      }
      const response = await createEquipment(categoryId, EquipmentDetails);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Adding to category:", categoryId, values);
      console.log(form);
      toast({
        title: "Equipment Added",
        description:
          "New equipment has been successfully added to the category.",
      });
      form.reset();
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add equipment",
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
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Input
                    id="picture"
                    type="file"
                    placeholder="Upload equipment image"
                    {...field}
                  />
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
                  <Textarea placeholder="Describe the equipment" {...field} />
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
            render={() => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input value={categoryName} disabled />
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
            {isSubmitting ? "Adding..." : "Add Equipment"}
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
      <Toaster />
      <Dialog open={isCancelPopupOpen} onOpenChange={setIsCancelPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <p>
              Are you sure you want to cancel this form? Unsaved changes will be
              lost.
            </p>
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
    </Form>
  );
}
