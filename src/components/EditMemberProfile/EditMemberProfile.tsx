"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  CreditCard,
  Dumbbell,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { PersonalInfo } from "./components/Personal-info";
import { Membership } from "./components/Membership";
import { Fitness } from "./components/Fitness";
import { Billing } from "./components/Billing";
import { Activity } from "./components/Activity";
import { Notes } from "./components/Notes";

export default function EditMemberProfile() {
  return (
    <div className="container mx-auto p-4 h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Member Profile</h1>
        <Avatar className="h-20 w-20">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        {/* Tab List */}
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

        {/* Tab Content */}
        <TabsContent value="personal">
          <PersonalInfo />
        </TabsContent>

        <TabsContent value="membership">
          <Membership />
        </TabsContent>

        <TabsContent value="fitness">
          <Fitness />
        </TabsContent>

        <TabsContent value="billing">
          <Billing />
        </TabsContent>

        <TabsContent value="activity">
          <Activity />
        </TabsContent>

        <TabsContent value="notes">
          <Notes />
        </TabsContent>
      </Tabs>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
