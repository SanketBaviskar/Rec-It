"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/hooks/use-toast";


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
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
  cost: z.number().min(0, {
    message: "Cost must be a positive value.",
  }),
});

export function AddInventoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()

  const departmentOptions = [
    { value: "swimming", label: "Swimming" },
    { value: "rockClimbing", label: "Rock Climbing" },
    { value: "weightFloor", label: "Weight Floor" },
    { value: "cardioFloor", label: "Cardio Floor" },
    { value: "courts", label: "Courts" },
    { value: "general", label: "General" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      department: "",
      manager: "",
      quantity: 1,
      cost: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: "Inventory Added",
      description: "New inventory has been successfully created.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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

        {/* Quantity */}
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
                  min={1}
                />
              </FormControl>
              <FormDescription>
                Specify the initial stock quantity for this inventory item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cost */}
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter cost"
                  {...field}
                  min={0}
                  step={0.01}
                />
              </FormControl>
              <FormDescription>
                Specify the cost of this inventory item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit and Reset Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 01-8 8H0l4 4 4-4H4z"
                  ></path>
                </svg>
                Adding...
              </div>
            ) : (
              "Add Inventory"
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
