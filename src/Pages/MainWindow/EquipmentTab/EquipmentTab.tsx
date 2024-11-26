import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { User } from "lucide-react";
import EquipmentNavBar from "./EquipmentNavBar";
import MemberDetails from "./MemberDetails";

// Define TypeScript types for user objects
interface User {
  id: string;
  firstName: string;
  lastName: string;
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
      <div className="w-[25%] flex flex-col gap-4 py-4 pl-4">
        <SearchBar
          placeholder="Search members..."
          onSelect={(user) => handleUserSelect(user)}
          onClear={handleClearSelection}
          onResults={(results: User[]) => setSearchResults(results)}
          triggerSearchOnClick={false}
          variant="inline"
        />
        <ScrollArea className="flex-1 rounded-lg border bg-white">
          <div className="p-4 space-y-4">
            {searchResults.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No search results
              </div>
            ) : (
              searchResults.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={handleUserSelect}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Equipment Navbar */}
      <div className="w-[50%] border-l border-r">
        <EquipmentNavBar />
      </div>

      {/* Member Details */}
      <div className="w-[25%]">
        <MemberDetails userDetails={selectedCustomer} />
      </div>
    </div>
  );
}

// Extracted UserCard Component for modularity:- after seaarching the result is shown as a user card and this is the code to show that single user card
interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer"
      onClick={() => onClick(user)}
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
  );
}
