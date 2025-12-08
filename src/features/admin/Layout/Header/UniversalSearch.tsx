import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function UniversalSearch() {
  return (
    <div className="flex relative w-[50%] ">
      <Search
        aria-label="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-blue-500 transition-colors duration-200 ease-in-out "
        // onClick={performSearch}
      />
      {/* Input Field */}
      <Input
        type="text"
        placeholder="Search settings "
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
        // onKeyDown={handleKeyDown}
        className="pl-10 pr-8"
        aria-label="Search Input"
      />
    </div>
  );
}
