import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function SuspensionSettings() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Fusion Default Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-500">Fusion - Default Suspension Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="fusion-facility" defaultChecked />
            <Label htmlFor="fusion-facility">
              Suspend from Facility Access
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fusion-intramurals" />
            <Label htmlFor="fusion-intramurals">
              Suspend from Intramurals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fusion-programs" defaultChecked />
            <Label htmlFor="fusion-programs">
              Suspend from Programs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fusion-bookings" />
            <Label htmlFor="fusion-bookings">
              Suspend from Bookings
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Intramural Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-500">Intramural (FusionIM) - Default Suspension Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="im-facility" />
            <Label htmlFor="im-facility">
              Suspend from Facility Access
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-intramurals" />
            <Label htmlFor="im-intramurals">
              Suspend from Intramurals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-programs" />
            <Label htmlFor="im-programs">
              Suspend from Programs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-bookings" />
            <Label htmlFor="im-bookings">
              Suspend from Bookings
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}

