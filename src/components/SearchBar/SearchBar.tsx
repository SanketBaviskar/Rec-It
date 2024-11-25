import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X } from "lucide-react";
import data from "@/Data/UserData.json";
import { searchUsers } from "@/Services/Api/User/searchUser";

interface UserSearchProps {
  onSelect: (user: any) => void;
  onClear: () => void;
  onResults?: (results: any[]) => void;
  placeholder?: string;
  className?: string;
  variant?: "popup" | "inline";
  triggerSearchOnClick?: boolean;
}

export function SearchBar({
  onSelect,
  onClear,
  onResults,
  placeholder = "Search customers or orders...",
  className = "",
  variant = "popup",
}: UserSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
    if (query.trim().length > 1) {
      setLoading(true);
      setError(null);
      try {
        const users = await searchUsers(query);
        setResults(users);
        console.log(users)
        setIsOpen(true);
        if (onResults) {
          onResults(users);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      clearResults();
    }
  };

  const clearResults = () => {
    setResults([]);
    setIsOpen(false);
    if (onResults) {
      onResults([]);
    }
  };

  const handleSelect = (user: any) => {
    onSelect(user);
    setQuery(`${user.firstName} ${user.lastName}`);
    clearResults();
  };

  const handleClear = () => {
    setQuery("");
    onClear();
    clearResults();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") performSearch();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-grow">
          {/* Search Icon */}
          <Search
            aria-label="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-blue-500 transition-colors duration-200 ease-in-out"
            onClick={performSearch}
          />
          {/* Input Field */}
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-8"
            aria-label="Search Input"
          />
          {/* Clear Button */}
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3"
              onClick={handleClear}
              aria-label="Clear Search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Popup Results */}
      {variant === "popup" && isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-2 shadow-md">
          <ScrollArea>
            {loading ? (
              <div className="text-center text-muted-foreground py-2">
                Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-2">{error}</div>
            ) : results.length > 0 ? (
              results.map((user: any) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleSelect(user)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.phoneNumber}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.membershipType}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-2">
                No users found
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
