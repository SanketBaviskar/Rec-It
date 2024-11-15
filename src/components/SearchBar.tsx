'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface UserSearchProps {
  onSelect: (user: User) => void
  onClear: () => void
  placeholder?: string
  className?: string
}

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
]

export function SearchBar({ onSelect, onClear, placeholder = "Search users...", className = "" }: UserSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query.length > 1) {
      // In a real application, this would be an API call
      const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredUsers)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const handleSelect = (user: User) => {
    onSelect(user)
    setQuery('')
    setIsOpen(false)
  }

  const handleClear = () => {
    setQuery('')
    onClear()
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 pr-8"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {isOpen && results.length > 0 && (
        <ScrollArea className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-2 shadow-md">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              onClick={() => handleSelect(user)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  )
}