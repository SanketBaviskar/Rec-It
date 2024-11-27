import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AccessSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">General Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="save-access-events" />
            <Label htmlFor="save-access-events">Enable saving of access events with no recorded entry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remove-multi-visit" />
            <Label htmlFor="remove-multi-visit">Enable removal of a Multi-Visit Pass use when saving an access event with no recorded entry</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Access Profile Settings</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="auto-grant-access" />
          <Label htmlFor="auto-grant-access">Grant facility access automatically when a membership type or guest pass does not specify an access profile</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Forgot Access Media Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-access-limit">Forgot Access Media Limit</Label>
            <Select>
              <SelectTrigger id="forgot-access-limit">
                <SelectValue placeholder="Select limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="allow-facility-access">Allow Facility Access</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="allow-facility-access" />
              <Label htmlFor="allow-facility-access">If member exceeds limit</Label>
            </div>
          </div>
        </div>
        <Button variant="secondary">Reset All Forgotten Media Counts</Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Passback Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-passback" defaultChecked />
            <Label htmlFor="enable-passback">Enable passback warnings</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="warning-period">Warning period (in minutes)</Label>
              <Input type="number" id="warning-period" placeholder="3" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="allow-facility-access-passback" />
            <Label htmlFor="allow-facility-access-passback">Allow facility access if passback is detected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-passback-multi-visit" />
            <Label htmlFor="enable-passback-multi-visit">Enable passback warnings for Multi-Visit Passes</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Group Access</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-anonymous-group" />
            <Label htmlFor="enable-anonymous-group">Enable anonymous group access</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-group-organizations" defaultChecked />
            <Label htmlFor="enable-group-organizations">Enable group access for organizations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-group-members" defaultChecked />
            <Label htmlFor="enable-group-members">Enable group access for members</Label>
          </div>
        </div>
      </div>
      
      <Button>Save Settings</Button>
    </div>
  )
}

