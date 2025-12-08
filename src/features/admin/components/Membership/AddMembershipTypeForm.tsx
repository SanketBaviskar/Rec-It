import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const memberType = ["Student", "AHEC Affiliate", "GT34", "Senior", "Adult", "Youth"] as const;
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  introDate: z.string().date(),
  maxMembers: z.number().nullable(),
  categories: z.array(z.object({
    name: z.enum(memberType),
    price: z.number().min(0, "Price must be positive")
  })).nonempty("Select at least one category")
});

interface AddMembershipTypeFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export default function AddMembershipTypeForm({ initialData, onSubmit, onCancel }: AddMembershipTypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      introDate: new Date().toISOString().split('T')[0],
      maxMembers: null,
      categories: []
    }
  });

  const selectedCategories = form.watch("categories");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Membership Name</Label>
                <FormControl>
                  <Input {...field} placeholder="e.g., Premium Membership" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Introduction Date */}
          <FormField
            control={form.control}
            name="introDate"
            render={({ field }) => (
              <FormItem>
                <Label>Introduction Date</Label>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Members */}
          <FormField
            control={form.control}
            name="maxMembers"
            render={({ field }) => (
              <FormItem>
                <Label>Member Limit (Optional)</Label>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''} 
                    onChange={e => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    placeholder="Unlimited"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category Pricing */}
        <div className="space-y-4">
          <Label>Category Pricing *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memberType.map(category => (
              <div key={category} className="flex items-center gap-4 p-4 border rounded-lg">
                <Checkbox
                  checked={selectedCategories.some(c => c.name === category)}
                  onCheckedChange={checked => {
                    const currentCategories = form.getValues("categories");
                    if (checked) {
                      form.setValue("categories", [
                        ...currentCategories,
                        { name: category, price: 0 }
                      ]);
                    } else {
                      form.setValue("categories", 
                        currentCategories.filter(c => c.name !== category)
                      );
                    }
                  }}
                />
                <div className="flex-1">
                  <Label>{category}</Label>
                  {selectedCategories.some(c => c.name === category) && (
                    <FormField
                      control={form.control}
                      name={`categories.${selectedCategories.findIndex(c => c.name === category)}.price`}
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              placeholder="Enter price"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {form.formState.errors.categories && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.categories.message}
            </p>
          )}
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label>Description</Label>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[100px]"
                  placeholder="Describe the membership benefits and features"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Save Changes" : "Create Membership"}
          </Button>
        </div>
      </form>
    </Form>
  );
}