import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { User } from "lucide-react";
import EquipmentNavBar from "./EquipmentNavBar";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  membershipType: string;
}

export default function EquipmentTab() {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedCustomer(user);
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="flex h-[90vh] gap-4">
      {/* Left Side - Search Results */}
      <div className="w-1/4 flex flex-col gap-4 py-4 pl-4">
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


      <div className="w-3/5 border-l border-r">
        <EquipmentNavBar />
      </div>

      {/* members details */}
      <div className="w-3/20">
        <div
          className={`w-96 bg-white rounded-lg shadow p-4 ${
            isCartOpen ? "block" : "hidden"
          } lg:block`}
        >
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {selectedCustomer ? (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatarUrl}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedCustomer.membershipType}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                {selectedCustomer.phoneNumber}
              </div>
            </div>
          ) : (
            <p>No customer selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
