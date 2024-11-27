"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccessSettings from "./AccessSetting"
import AccessProfiles from "./AccessProfile"
import IdentificationTypes from "./AccessIdentification"
import SuspensionSettings from "./AccessSuspension"

export default function AccessPage() {
  return (
    <div className="space-y-6 p-0">
      <Tabs defaultValue="access-settings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="access-settings">Access Settings</TabsTrigger>
          <TabsTrigger value="access-profiles">Access Profiles</TabsTrigger>
          <TabsTrigger value="identification-types">Identification Types</TabsTrigger>
          <TabsTrigger value="suspension-settings">Suspension Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="access-settings" className="space-y-4">
          <AccessSettings />
        </TabsContent>
        <TabsContent value="access-profiles" className="space-y-4">
          <AccessProfiles />
        </TabsContent>
        <TabsContent value="identification-types" className="space-y-4">
          <IdentificationTypes />
        </TabsContent>
        <TabsContent value="suspension-settings" className="space-y-4">
          <SuspensionSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

