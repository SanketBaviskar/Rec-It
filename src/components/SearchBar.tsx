import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X } from "lucide-react";
import data from '@/data/UserData.json';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  membershipType: string;
}

interface UserSearchProps {
  onSelect: (user: User) => void;
  onClear: () => void;
  onResults?: (results: User[]) => void; // New prop to send results back to the parent
  placeholder?: string;
  className?: string;
  variant?: "popup" | "inline"; // Removed "custom" as results will be handled in SearchTab
  triggerSearchOnClick?: boolean; // New prop to trigger search on button click
}

export function SearchBar({
  onSelect,
  onClear,
  onResults,
  placeholder = "Search customers or orders...",
  className = "",
  variant = "popup", // Default layout
  triggerSearchOnClick = false, // Default: live search
}: UserSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const performSearch = () => {
    if (query.length > 1) {
      const filteredUsers = data.filter((user: any) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        user.emailAddress.toLowerCase().includes(query.toLowerCase())
      ).map((user: any) => ({
        id: user.accessId,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        avatarUrl: user.photo,
        membershipType: user.membershipType
      }));
      setResults(filteredUsers);
      setIsOpen(true);
      if (onResults) {
        onResults(filteredUsers);
      }
    } else {
      setResults([]);
      setIsOpen(false);
      if (onResults) {
        onResults([]);
      }
    }
  };

  const handleSelect = (user: User) => {
    onSelect(user);
    setQuery(`${user.firstName} ${user.lastName}`); // Update search query with the selected user's name
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
    setResults([]);
    setIsOpen(false);
    if (onResults) {
      onResults([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-grow">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-blue-500 transition-colors duration-200 ease-in-out"
            onClick={performSearch} 
          />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-8"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Popup Results Layout */}
      {variant === "popup" && isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-2 shadow-md">
          <ScrollArea>
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleSelect(user)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-medium">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-muted-foreground">{user.phoneNumber}</div>
                  <div className="text-xs text-muted-foreground">{user.membershipType}</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
