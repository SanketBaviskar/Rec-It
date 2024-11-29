import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessIdentificationTypes } from './AccessIdentificationTypes/AccessIdentificationTypes';
import { AccessSettings } from './AccessSettings/AccessSettings';
import { AccessProfiles } from './AccessProfiles/AccessProfiles';
import { SuspensionSettings } from './AccessSuspensionSettings/AccessSuspensionSettings';

export function AccessTabs() {
  return (
    <Tabs defaultValue="access-settings" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-12 bg-background px-4 mb-4">
        <TabsTrigger value="access-settings">Access Settings</TabsTrigger>
        <TabsTrigger value="access-profiles">Access Profiles</TabsTrigger>
        <TabsTrigger value="identification-types">Identification Types</TabsTrigger>
        <TabsTrigger value="suspension-settings">Suspension Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="access-settings">
        <AccessSettings />
      </TabsContent>
      <TabsContent value="access-profiles">
        <AccessProfiles />
      </TabsContent>
      <TabsContent value="identification-types">
        <AccessIdentificationTypes />
      </TabsContent>
      <TabsContent value="suspension-settings">
        <SuspensionSettings />
      </TabsContent>
    </Tabs>
  );
}

