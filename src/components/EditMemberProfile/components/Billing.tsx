import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function Billing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="debit">Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Billing Cycle</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="biannually">Bi-annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="**** **** **** ****" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" placeholder="MM/YY" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="billingAddress">Billing Address</Label>
          <Textarea id="billingAddress" placeholder="Enter billing address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="outstandingBalance">Outstanding Balance</Label>
          <Input id="outstandingBalance" type="number" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <Label>Payment History</Label>
          <div className="bg-muted p-4 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <span>Last Payment</span>
              <Badge variant="outline">$49.99</Badge>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Date</span>
              <span>05/15/2023</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Communication Preferences</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="emailNotif" />
              <Label htmlFor="emailNotif">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="smsNotif" />
              <Label htmlFor="smsNotif">SMS Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="promotions" />
              <Label htmlFor="promotions">Promotional Offers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="paperless" />
              <Label htmlFor="paperless">Paperless Billing</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID (Optional)</Label>
          <Input id="taxId" placeholder="Enter Tax ID" />
        </div>
      </CardContent>
    </Card>
  )
}