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
import { SearchBar } from "@/components/SearchBar";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Edit,
  FileText,
  History,
  User,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditMemberProfile from "@/components/EditMemberProfile/EditMemberProfile";

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
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Left Side - Search Results */}
      <div className="w-1/2 flex flex-col gap-4">
        <SearchBar
          placeholder="Search members..."
          onSelect={(user) => handleUserSelect(user)}
          onClear={handleClearSelection}
          onResults={(results) => setSearchResults(results)}
          triggerSearchOnClick={false}
          variant="inline"
        />
        <ScrollArea className="flex-1 rounded-lg border">
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
      <Card className="w-1/2">
        {selectedUser ? (
          <>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {selectedUser.avatarUrl ? (
                    <img
                      src={selectedUser.avatarUrl}
                      alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                    />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </Avatar>
                <div>
                  <CardTitle>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </CardTitle>
                  <CardDescription>
                    {selectedUser.membershipType} since Jan 2024
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Quick Checkout
                </Button>
                <Button variant="outline" size="sm">
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
                <Button variant="outline" size="sm" onClick={handleEditClick}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Advanced Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Visits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">
                          +4% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Spent
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$1,234</div>
                        <p className="text-xs text-muted-foreground">
                          +12% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              Gym Session Completed
                            </div>
                            <div className="text-xs text-muted-foreground">
                              2 hours ago
                            </div>
                          </div>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="activity">
                  {/* Activity Chart here */}
                </TabsContent>
                <TabsContent value="payments">
                  {/* Payments Info here */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </>
        ) : (
          <CardContent>
            <div className="text-center text-muted-foreground py-4">
              Select a member to see the details
            </div>
          </CardContent>
        )}
      </Card>
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
              onClick={handleCloseEditProfile}
              aria-label="Close"
            >
              <X className="h-6 w-6"  onClick={handleCloseEditProfile} />
            </button>
            <EditMemberProfile />
          </div>
        </div>
      )}
    </div>
  );
}
