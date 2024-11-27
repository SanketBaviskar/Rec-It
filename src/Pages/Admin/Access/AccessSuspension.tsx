import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SuspensionSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">RecIt - Default Suspension Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="suspend-facility-access" defaultChecked />
            <Label htmlFor="suspend-facility-access">Suspend from Facility Access</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="suspend-intramurals" />
            <Label htmlFor="suspend-intramurals">Suspend from Intramurals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="suspend-programs" defaultChecked />
            <Label htmlFor="suspend-programs">Suspend from Programs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="suspend-bookings" />
            <Label htmlFor="suspend-bookings">Suspend from Bookings</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Intramural (RecItIM) - Default Suspension Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="im-suspend-facility-access" />
            <Label htmlFor="im-suspend-facility-access">Suspend from Facility Access</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-suspend-intramurals" />
            <Label htmlFor="im-suspend-intramurals">Suspend from Intramurals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-suspend-programs" />
            <Label htmlFor="im-suspend-programs">Suspend from Programs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="im-suspend-bookings" />
            <Label htmlFor="im-suspend-bookings">Suspend from Bookings</Label>
          </div>
        </div>
      </div>
      
      <Button>Save Settings</Button>
    </div>
  )
}

