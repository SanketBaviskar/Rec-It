import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"

export default function KioskPage() {
  return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Kiosk Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Kiosk Settings</CardTitle>
            <CardDescription>
              Configure and manage self-service kiosks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kiosk-location">Kiosk Location</Label>
              <Input id="kiosk-location" placeholder="e.g., Main Entrance" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idle-timeout">Idle Timeout (seconds)</Label>
              <Input id="idle-timeout" type="number" placeholder="e.g., 300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Input id="welcome-message" placeholder="Enter welcome message" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="printer-status">Printer Status</Label>
              <Input id="printer-status" placeholder="e.g., Online" disabled />
            </div>
            <Button className="mt-4">Update Kiosk Settings</Button>
          </CardContent>
        </Card>
      </div>
  )
}
