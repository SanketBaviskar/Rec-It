"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps<T> {
  placeholder: string;
  data: T[];
  filterFn: (data: T, query: string) => boolean;
  onSelect: (result: T) => void;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Order {
  id: string;
  customerName: string;
  total: number;
}

type SearchResult = Customer | Order;

export default function SearchBar<T extends SearchResult>({
  placeholder,
  data,
  filterFn,
  onSelect,
}: SearchBarProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const results = data.filter((item) => filterFn(item, searchQuery));
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, data, filterFn]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (result: T) => {
    onSelect(result);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Type guards to check if result is of type Customer
  const isCustomer = (result: SearchResult): result is Customer => {
    return "name" in result && "email" in result;
  };

  return (
    <div className="relative">
      <input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 border rounded-md bg-white"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {showSearchResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(result)}
            >
              {isCustomer(result) ? (
                <div className="flex items-center">
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-500">{result.email}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">Order {result.id}</div>
                  <div className="text-sm text-gray-500">
                    {result.customerName} - ${result.total}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
