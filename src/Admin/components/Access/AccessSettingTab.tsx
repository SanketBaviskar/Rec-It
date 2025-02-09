"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  enableAccessEvents: z.boolean().default(true),
  enableMultiVisitPassRemoval: z.boolean().default(true),
  grantFacilityAccess: z.boolean().default(true),
  forgotAccessMediaLimit: z.string().default("3"),
  allowFacilityAccessExceedLimit: z.boolean().default(false),
  enablePassbackWarnings: z.boolean().default(true),
  warningPeriod: z.string().default("3"),
  allowFacilityAccessPassback: z.boolean().default(false),
  enablePassbackWarningsMultiVisit: z.boolean().default(false),
  enableAnonymousGroupAccess: z.boolean().default(false),
  enableGroupAccessOrganizations: z.boolean().default(true),
  enableGroupAccessMembers: z.boolean().default(true),
});

export default function AccessSettingsTab() {
  const [isSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableAccessEvents: true,
      enableMultiVisitPassRemoval: true,
      grantFacilityAccess: true,
      forgotAccessMediaLimit: "3",
      allowFacilityAccessExceedLimit: false,
      enablePassbackWarnings: true,
      warningPeriod: "3",
      allowFacilityAccessPassback: false,
      enablePassbackWarningsMultiVisit: false,
      enableAnonymousGroupAccess: false,
      enableGroupAccessOrganizations: true,
      enableGroupAccessMembers: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Grid layout for form fields */}
        <div className="space-y-4">
          {/* General Settings */}
          <FormField
            control={form.control}
            name="enableAccessEvents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Settings</FormLabel>
                <FormField
                  control={form.control}
                  name="enableAccessEvents"
                  render={() => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Enable saving of access events with no recorded entry
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableMultiVisitPassRemoval"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Enable removal of a Multi-Visit Pass use when saving an
                        access event with no recorded entry
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </FormItem>
            )}
          />

          <Separator />

          {/* Access Profile Settings */}
          <FormItem>
            <FormLabel>Access Profile Settings</FormLabel>
            <FormField
              control={form.control}
              name="grantFacilityAccess"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Grant facility access automatically when a membership type
                    or guest pass does not specify an access profile
                  </FormLabel>
                </FormItem>
              )}
            />
          </FormItem>

          <Separator />

          {/* Forgot Access Media Settings */}
          <FormField
            control={form.control}
            name="forgotAccessMediaLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forgot Access Media Settings</FormLabel>

                {/* Forgot Access Media Limit */}
                <div>
                  <FormLabel className="text-sm">
                    Forgot Access Media Limit
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="forgotAccessMediaLimit"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input {...field} className="w-20" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Allow Facility Access Exceed Limit */}
                <FormField
                  control={form.control}
                  name="allowFacilityAccessExceedLimit"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Allow facility access if member exceeds limit
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Reset Button */}
                <Button variant="outline" type="button" className="w-fit">
                  Reset All Forgotten Media Counts
                </Button>
              </FormItem>
            )}
          />

          <Separator />

          {/* Group Access Settings */}
          <FormItem>
            <FormLabel>Group Access</FormLabel>

            {/* Enable Anonymous Group Access */}
            <FormField
              control={form.control}
              name="enableAnonymousGroupAccess"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Enable anonymous group access
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Enable Group Access for Organizations */}
            <FormField
              control={form.control}
              name="enableGroupAccessOrganizations"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Enable group access for organizations
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Enable Group Access for Members */}
            <FormField
              control={form.control}
              name="enableGroupAccessMembers"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal leading-tight">
                    Enable group access for members
                  </FormLabel>
                </FormItem>
              )}
            />
          </FormItem>

          <Separator />

          {/* Passback Settings */}
          <FormField
            control={form.control}
            name="passbackSettings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passback Settings</FormLabel>

                {/* Enable Passback Warnings */}
                <FormField
                  control={form.control}
                  name="enablePassbackWarnings"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Enable passback warnings
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Warning Period Input */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-sm">
                    Warning period (in minutes)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="warningPeriod"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input {...field} className="w-20" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Allow Facility Access If Passback Detected */}
                <FormField
                  control={form.control}
                  name="allowFacilityAccessPassback"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Allow facility access if passback is detected
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable Passback Warnings for Multi-Visit Passes */}
                <FormField
                  control={form.control}
                  name="enablePassbackWarningsMultiVisit"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-tight">
                        Enable passback warnings for Multi-Visit Passes
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </FormItem>
            )}
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
