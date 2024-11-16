"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
// import { Calendar } from "@/components/ui/calendar"
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  User,
  CreditCard,
  Dumbbell,
  ClipboardList,
  MessageSquare,
  Bell,
} from "lucide-react";

export default function AdvancedMemberEdit() {
  const [membershipType, setMembershipType] = useState("standard");
  // const [dob, setDob] = useState<Date>();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Member Profile</h1>
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Member" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="personal">
            <User className="h-5 w-5 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="membership">
            <CreditCard className="h-5 w-5 mr-2" />
            Membership
          </TabsTrigger>
          <TabsTrigger value="fitness">
            <Dumbbell className="h-5 w-5 mr-2" />
            Fitness
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-5 w-5 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="activity">
            <ClipboardList className="h-5 w-5 mr-2" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquare className="h-5 w-5 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input id="middleName" placeholder="M." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      {/* <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dob && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                      </Button> */}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        initialFocus
                      /> */}
                      {/* <DayPicker
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        footer={
                          selected
                            ? `Selected: ${selected.toLocaleDateString()}`
                            : "Pick a day."
                        }
                      /> */}
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter your address" />
              </div>
              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="flex space-x-2">
                  <Button variant="outline">Upload Photo</Button>
                  <Button variant="outline">Take Photo</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Name and phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" placeholder="Enter occupation" />
              </div>
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>Membership & Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accessId">Access ID</Label>
                  <Input id="accessId" placeholder="Enter access ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Membership Type</Label>
                <RadioGroup
                  defaultValue={membershipType}
                  onValueChange={setMembershipType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium">Premium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vip" id="vip" />
                    <Label htmlFor="vip">VIP</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Facility Access</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gym" />
                    <Label htmlFor="gym">Gym</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pool" />
                    <Label htmlFor="pool">Pool</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sauna" />
                    <Label htmlFor="sauna">Sauna</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="classes" />
                    <Label htmlFor="classes">Group Classes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="personalTraining" />
                    <Label htmlFor="personalTraining">Personal Training</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spa" />
                    <Label htmlFor="spa">Spa</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Access Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24/7">24/7 Access</SelectItem>
                    <SelectItem value="weekday">Weekdays Only</SelectItem>
                    <SelectItem value="weekend">Weekends Only</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Membership Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="membershipHold" />
                <Label htmlFor="membershipHold">Place Membership on Hold</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="holdReason">Hold Reason</Label>
                <Textarea
                  id="holdReason"
                  placeholder="Reason for placing membership on hold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractLength">Contract Length (months)</Label>
                <Input id="contractLength" type="number" min="1" max="60" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fitness">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" placeholder="175" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" placeholder="70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI</Label>
                  <Input id="bmi" type="number" placeholder="22.9" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fitness Level</Label>
                <Slider
                  defaultValue={[5]}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fitness Goals</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weightLoss" />
                    <Label htmlFor="weightLoss">Weight Loss</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="muscleGain" />
                    <Label htmlFor="muscleGain">Muscle Gain</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="endurance" />
                    <Label htmlFor="endurance">Endurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flexibility" />
                    <Label htmlFor="flexibility">Flexibility</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="strength" />
                    <Label htmlFor="strength">Strength</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="toning" />
                    <Label htmlFor="toning">Toning</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  placeholder="List any relevant medical conditions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTrainer">Preferred Trainer</Label>
                <Select>
                  <SelectTrigger id="preferredTrainer">
                    <SelectValue placeholder="Select preferred trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="jane-doe">Jane Doe</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Workout Preferences</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cardio" />
                    <Label htmlFor="cardio">Cardio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weightTraining" />
                    <Label htmlFor="weightTraining">Weight Training</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="yoga" />
                    <Label htmlFor="yoga">Yoga</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pilates" />
                    <Label htmlFor="pilates">Pilates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="groupClasses" />
                    <Label htmlFor="groupClasses">Group Classes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="swimming" />
                    <Label htmlFor="swimming">Swimming</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fitnessNotes">Fitness Notes</Label>
                <Textarea
                  id="fitnessNotes"
                  placeholder="Additional notes about fitness goals or preferences"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
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
                <Textarea
                  id="billingAddress"
                  placeholder="Enter billing address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outstandingBalance">Outstanding Balance</Label>
                <Input
                  id="outstandingBalance"
                  type="number"
                  placeholder="0.00"
                />
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
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Recent Activity</Label>
                <div className="space-y-2">
                  {[
                    "Gym session - 2 hours",
                    "Pool access - 1 hour",
                    "Group class - Yoga",
                    "Personal training session",
                    "Sauna use - 30 minutes",
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-muted rounded-md"
                    >
                      <span>{activity}</span>
                      <Badge variant="secondary">
                        {index === 0 ? "Today" : `${index + 1} days ago`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upcoming Bookings</Label>
                <div className="space-y-2">
                  {[
                    "Spin Class - Tomorrow, 10:00 AM",
                    "Personal Training - 06/20/2023, 2:00 PM",
                    "Yoga Class - 06/22/2023, 6:00 PM",
                  ].map((booking, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-muted rounded-md"
                    >
                      <span>{booking}</span>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Attendance Statistics</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">
                      Visits this month
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">80%</div>
                    <div className="text-sm text-muted-foreground">
                      Attendance rate
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">45 min</div>
                    <div className="text-sm text-muted-foreground">
                      Avg. session duration
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Achievements</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge>5 Day Streak</Badge>
                  <Badge>10 Classes Completed</Badge>
                  <Badge>Personal Best: Bench Press</Badge>
                  <Badge>1000m Swim Challenge</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityNotes">Activity Notes</Label>
                <Textarea
                  id="activityNotes"
                  placeholder="Add notes about member's activity or progress"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes & Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffNotes">Staff Notes</Label>
                <Textarea
                  id="staffNotes"
                  placeholder="Add any additional notes here"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberFeedback">Member Feedback</Label>
                <Textarea
                  id="memberFeedback"
                  placeholder="Record any feedback from the member"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Special Considerations</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vip" />
                    <Label htmlFor="vip">VIP Treatment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="specialNeeds" />
                    <Label htmlFor="specialNeeds">Special Needs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="corporateMember" />
                    <Label htmlFor="corporateMember">Corporate Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="influencer" />
                    <Label htmlFor="influencer">Influencer/Celebrity</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alerts</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="paymentAlert" />
                    <Label htmlFor="paymentAlert">Payment Overdue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="medicalAlert" />
                    <Label htmlFor="medicalAlert">
                      Medical Condition Alert
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anniversaryAlert" />
                    <Label htmlFor="anniversaryAlert">
                      Membership Anniversary
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customFields">Custom Fields</Label>
                <Textarea
                  id="customFields"
                  placeholder="Add any custom information here"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Document Uploads</Label>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button variant="outline">View Uploaded Documents</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
