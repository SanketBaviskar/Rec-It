import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Switch } from "../../../components/ui/switch"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"

export default function IntegrationPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <Card>
          <CardHeader>
            <CardTitle>Connected Services</CardTitle>
            <CardDescription>
              Manage integrations with external services and APIs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-gateway">Payment Gateway</Label>
              <Switch id="payment-gateway" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="crm">CRM System</Label>
              <Switch id="crm" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-marketing">Email Marketing</Label>
              <Switch id="email-marketing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="booking-system">Class Booking System</Label>
              <Switch id="booking-system" />
            </div>
            <Button className="mt-4">Add New Integration</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
