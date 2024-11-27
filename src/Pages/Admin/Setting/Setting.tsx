import AdminLayout from "../AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">General Settings</h2>
        <Card>
          <CardHeader>
            <CardTitle>Facility Information</CardTitle>
            <CardDescription>
              Manage your fitness center's basic information and settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Facility Name</Label>
              <Input id="name" placeholder="Enter facility name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter facility address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <Button className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

