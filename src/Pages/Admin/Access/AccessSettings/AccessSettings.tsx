import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AccessSettings() {
  return (
    <div className="space-y-4 pb-8">
      {/* General Settings Section */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-orange-500">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-access-events" />
            <Label htmlFor="enable-access-events">
              Enable saving of access events with no recorded entry
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-removal" />
            <Label htmlFor="enable-removal">
              Enable removal of a Multi-Visit Pass use when saving an access event with no recorded entry
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Access Profile Settings */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-orange-500">Access Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox id="grant-facility-access" />
            <Label htmlFor="grant-facility-access">
              Grant facility access automatically when a membership type or guest pass does not specify an access profile
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Forgot Access Media Settings */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-orange-500">Forgot Access Media Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="forgot-access-limit">Forgot Access Media Limit</Label>
            <Input 
              type="number" 
              id="forgot-access-limit"
              className="w-20"
              defaultValue="3"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="allow-facility-access" />
            <Label htmlFor="allow-facility-access">
              Allow facility access if member exceeds limit
            </Label>
          </div>
          <Button variant="outline">
            Reset All Forgotten Media Counts
          </Button>
        </CardContent>
      </Card>

      {/* Passback Settings */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-orange-500">Passback Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-passback" defaultChecked />
            <Label htmlFor="enable-passback">
              Enable passback warnings
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="warning-period">Warning period (in minutes)</Label>
            <Input 
              type="number" 
              id="warning-period"
              className="w-20"
              defaultValue="3"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="allow-facility-passback" />
            <Label htmlFor="allow-facility-passback">
              Allow facility access if passback is detected
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-passback-warnings" />
            <Label htmlFor="enable-passback-warnings">
              Enable passback warnings for Multi-Visit Passes
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Group Access */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-orange-500">Group Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-anonymous" />
            <Label htmlFor="enable-anonymous">
              Enable anonymous group access
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-organizations" defaultChecked />
            <Label htmlFor="enable-organizations">
              Enable group access for organizations
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-members" defaultChecked />
            <Label htmlFor="enable-members">
              Enable group access for members
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end max-w-3xl mx-auto">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}

