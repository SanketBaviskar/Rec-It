"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  // Separate form values for the two sections
  // RecIt - Default Suspension Settings
  suspendFromFacilityAccessRecIt: z.boolean().default(false),
  suspendFromIntramuralsRecIt: z.boolean().default(false),
  suspendFromProgramsRecIt: z.boolean().default(false),
  suspendFromBookingsRecIt: z.boolean().default(false),
  
  // Intramural (RecIt) - Default Suspension Settings
  suspendFromFacilityAccessIntramural: z.boolean().default(false),
  suspendFromIntramuralsIntramural: z.boolean().default(false),
  suspendFromProgramsIntramural: z.boolean().default(false),
  suspendFromBookingsIntramural: z.boolean().default(false),
});

interface SuspensionSettingsFormProps {
  onComplete: () => void; // Callback for when form is cancelled or completed
}

export default function SuspensionSettingsTab({ onComplete }: SuspensionSettingsFormProps) {
  const [isSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suspendFromFacilityAccessRecIt: false,
      suspendFromIntramuralsRecIt: false,
      suspendFromProgramsRecIt: false,
      suspendFromBookingsRecIt: false,
      suspendFromFacilityAccessIntramural: false,
      suspendFromIntramuralsIntramural: false,
      suspendFromProgramsIntramural: false,
      suspendFromBookingsIntramural: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onComplete(); // Call onComplete after submitting
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* RecIt - Default Suspension Settings */}
        <div className="space-y-4">
          <FormItem>
            <FormLabel>RecIt - Default Suspension Settings</FormLabel>
            <FormField
              control={form.control}
              name="suspendFromFacilityAccessRecIt"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Facility Access
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromIntramuralsRecIt"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Intramurals
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromProgramsRecIt"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Programs
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromBookingsRecIt"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Bookings
                  </FormLabel>
                </FormItem>
              )}
            />
          </FormItem>

          <Separator />

          {/* Intramural (RecIt) - Default Suspension Settings */}
          <FormItem>
            <FormLabel>Intramural (RecIt) - Default Suspension Settings</FormLabel>
            <FormField
              control={form.control}
              name="suspendFromFacilityAccessIntramural"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Facility Access
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromIntramuralsIntramural"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Intramurals
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromProgramsIntramural"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Programs
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendFromBookingsIntramural"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Suspend from Bookings
                  </FormLabel>
                </FormItem>
              )}
            />
          </FormItem>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" className="w-fit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
