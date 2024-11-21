"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Edit,
  FileText,
  History,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EquipmentNavBar from "./EquipmentNavBar"
interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  membershipType: string;
}

export default function Component() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
  };

  const handleEditClick = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  return (
    <div className="flex h-[90vh] gap-4 p-4 bg-gray-100">
      {/* Left Side - Search Results */}
      <div className="w-1/4 flex flex-col gap-4">
        <SearchBar
          placeholder="Search members..."
          onSelect={(user) => handleUserSelect(user)}
          onClear={handleClearSelection}
          onResults={(results) => setSearchResults(results)}
          triggerSearchOnClick={false}
          variant="inline"
        />
        <ScrollArea className="flex-1 rounded-lg border bg-white">
          {/* Search Results */}
          <div className="p-4 space-y-4">
            {searchResults.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                No search results
              </div>
            )}
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                <Avatar>
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.membershipType}
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side - Member Details */}
      <Card className="w-3/5 rounded-lg border">
        <EquipmentNavBar></EquipmentNavBar>
      </Card>

      <Card className="w-3/20">

      </Card>
      
    </div>
  );
}
